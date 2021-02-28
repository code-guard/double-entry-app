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
    doubleEntry: DoubleEntry;
    doubleEntryForm: FormGroup;

    constructor(
        private matSnackBar: MatSnackBar,
        private dataPersistenceService: DataPersistenceService,
        private matDialog: MatDialog,
        private doubleEntryFormHelperService: DoubleEntryFormHelperService
    ) {
        this.doubleEntryForm = doubleEntryFormHelperService.getDoubleEntryForm();
        this.doubleEntry = this.dataPersistenceService.get();
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

        // @TODO Review this
        // If the row was balanced recompute data
        if (doubleEntryRow.hasBeenBalanced) {
            this.checkGroup(doubleEntryRow);
        }

        // Reset form
        this.doubleEntryFormHelperService.applyFormValue(doubleEntryForm);

        // Save data and create a new line
        this.dataPersistenceService.set(this.doubleEntry);
        this.doubleEntry = this.dataPersistenceService.get();
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
                this.doubleEntry = this.dataPersistenceService.get();
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
            this.doubleEntry = this.dataPersistenceService.get();
        });
    }


    // @TODO Review the following methods

    checkGroup(row: DoubleEntryRow): void {
        let total = 0;

        for (const data of this.doubleEntry) {
            // @ts-ignore
            total += data.give;
            // @ts-ignore
            total -= data.take;

            if (data === row) {
                break;
            }
        }

        if (total === 0) {
            this.matSnackBar.open('Bilanciate');
            // row.hasBeenBalances = true;
            this.doubleEntry[this.doubleEntry.indexOf(row)].hasBeenBalanced = true;
            return;
        }

        this.doubleEntry[this.doubleEntry.indexOf(row)].hasBeenBalanced = false;
        this.matSnackBar.open('Non bilanciate');
    }
}
