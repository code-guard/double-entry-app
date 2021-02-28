import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataPersistenceService } from '../../services/data-persistence.service';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BooleanDialogComponent } from '../boolean-dialog/boolean-dialog.component';
import { ImportDataDialogComponent } from '../import-data-dialog/import-data-dialog.component';
import { DoubleEntryRow } from '../../models/double-entry-row.model';
import { DoubleEntry } from '../../models/double-entry';
import { DoubleEntryFormHelperService } from '../../services/double-entry-form-helper.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';

@Component({
    selector: 'app-double-entry',
    templateUrl: './double-entry.component.html',
    styleUrls: ['./double-entry.component.scss']
})
export class DoubleEntryComponent {
    doubleEntry!: DoubleEntry;
    doubleEntryForm: FormGroup;
    names!: string[];

    constructor(
        private matSnackBar: MatSnackBar,
        private dataPersistenceService: DataPersistenceService,
        private matDialog: MatDialog,
        private doubleEntryFormHelperService: DoubleEntryFormHelperService
    ) {
        this.doubleEntryForm = doubleEntryFormHelperService.getDoubleEntryForm();
        this.initData();
    }

    private initData(): void {
        this.doubleEntry = this.dataPersistenceService.get();
        const names = {
            test: true,
            test2: true,
        };

        this.doubleEntry.forEach(row => {
            // @ts-ignore
            names[row.name] = true;
        });

        this.names = Object.keys(names);
    }

    // Rebalance rows and save data on DoubleEntry change
    private onDataChange(): void {
        this.rebalanceAll();
        this.dataPersistenceService.set(this.doubleEntry);
    }

    // When in editing mode a escape press in the keyboard cancel the changes
    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
        if (this.doubleEntryForm.get('id')?.value !== null) {
            this.toggleEditMode(this.doubleEntryForm);
        }
    }

    // Applies the form values to the provided row or restore previous values
    toggleEditMode(doubleEntryForm: FormGroup, row?: DoubleEntryRow): void {
        this.doubleEntryFormHelperService.applyFormValue(doubleEntryForm, row);
        this.onDataChange();
    }

    deleteRow(row: DoubleEntryRow): void {
        this.doubleEntry.splice(this.doubleEntry.indexOf(row), 1);
        this.onDataChange();
    }

    confirmRow(doubleEntryForm: FormGroup): void {
        // Ensure the form is valid
        doubleEntryForm.markAllAsTouched();
        if (!doubleEntryForm.valid) {
            return;
        }

        const doubleEntryRow = DoubleEntryRow.createFromForm(doubleEntryForm);
        const formRowId = doubleEntryForm.get('id')?.value;
        if (formRowId === null) {
            this.doubleEntry.push(doubleEntryRow);
        } else {
            const index = this.doubleEntry.getIndexOfDoubleEntryRow(doubleEntryRow);
            this.doubleEntry[index] = doubleEntryRow;
        }

        // Reset form
        this.doubleEntryFormHelperService.applyFormValue(doubleEntryForm);

        // Save data and create a new line
        this.onDataChange();
        this.initData();
    }

    downloadData(): void {
        const anchor = document.getElementById('downloadAnchorElem');
        if (!anchor) {
            return;
        }

        anchor.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.doubleEntry)));
        anchor.setAttribute('download', 'partita-doppia-export.json');
        anchor.click();
    }

    importData(): void {
        this.matDialog.open(ImportDataDialogComponent).afterClosed().subscribe(result => {
            if (result) {
                this.initData();
            }
        });
    }

    reset(): void {
        this.matDialog.open(BooleanDialogComponent, {
            data: {
                title: 'Sei sicuro di voler eliminare tutto il progetto?',
                message: 'Non sarà possibile recuperarlo successivamente.',
            }
        }).afterClosed().subscribe(result => {
            if (!result) {
                return;
            }

            this.dataPersistenceService.clear();
            this.initData();
        });
    }

    rebalanceAll(): void {
        let balanced = 0;
        this.doubleEntry.forEach(row => {
            balanced += row.take ? row.take : 0;
            balanced -= row.give ? row.give : 0;

            if (row.hasBeenBalanced === null) {
                return;
            }

            row.hasBeenBalanced = balanced === 0;
            balanced = 0;
        });
    }

    checkGroup(row: DoubleEntryRow): void {
        row.hasBeenBalanced = row.hasBeenBalanced === null ? false : null;
        this.onDataChange();
    }

    onDrop(event: CdkDragDrop<DoubleEntryRow>): void {
        const row = this.doubleEntry[event.previousIndex];

        this.doubleEntry.splice(event.previousIndex, 1);
        this.doubleEntry.splice(event.currentIndex, 0, row);

        this.onDataChange();
    }
}
