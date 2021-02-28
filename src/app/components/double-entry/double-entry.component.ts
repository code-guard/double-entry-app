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
            'Crediti verso banca ': true,
            'Cassa ': true,
        };

        this.doubleEntry.forEach(row => {
            // @ts-ignore
            names[row.name] = true;
        });

        this.names = Object.keys(names);
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
        this.dataPersistenceService.set(this.doubleEntry);
    }

    deleteRow(row: DoubleEntryRow): void {
        this.doubleEntry.splice(this.doubleEntry.indexOf(row), 1);
        this.dataPersistenceService.set(this.doubleEntry);
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

        this.rebalanceAll();

        // Reset form
        this.doubleEntryFormHelperService.applyFormValue(doubleEntryForm);

        // Save data and create a new line
        this.dataPersistenceService.set(this.doubleEntry);
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
            console.log(balanced);
            // @ts-ignore
            balanced += row.take;
            // @ts-ignore
            balanced -= row.give;

            if (row.hasBeenBalanced === null) {
                return;
            }

            row.hasBeenBalanced = balanced === 0;
            balanced = 0;
        });
    }

    checkGroup(row: DoubleEntryRow): void {
        row.hasBeenBalanced = row.hasBeenBalanced === null ? false : null;
        this.rebalanceAll();
        this.dataPersistenceService.set(this.doubleEntry);
    }
}
