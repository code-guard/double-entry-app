import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataPersistenceService } from '../../services/data-persistence.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BooleanDialogComponent } from '../boolean-dialog/boolean-dialog.component';
import { ImportDataDialogComponent } from '../import-data-dialog/import-data-dialog.component';
import { exactlyOneFilledFieldValidator } from '../../validators/exactly-one-filled-field.validator';
import { DoubleEntryRow } from '../../models/double-entry-row.model';
import { DoubleEntry } from '../../models/double-entry';

@Component({
    selector: 'app-double-entry',
    templateUrl: './double-entry.component.html',
    styleUrls: ['./double-entry.component.scss']
})
export class DoubleEntryComponent {
    doubleEntry: DoubleEntry;
    doubleEntryForm = new FormGroup({
        code:        new FormControl(null, Validators.pattern('^[0-9]*$')),
        date:        new FormControl(null, Validators.required),
        name:        new FormControl(null, Validators.required),
        description: new FormControl(null),
        give:        new FormControl(null, Validators.min(1)),
        take:        new FormControl(null, Validators.min(1)),

        id: new FormControl(),
    }, {
        validators: exactlyOneFilledFieldValidator(['give', 'take']),
    });

    constructor(
        private matSnackBar: MatSnackBar,
        private dataPersistenceService: DataPersistenceService,
        private matDialog: MatDialog,
    ) {
        DoubleEntryComponent.setFormValue(this.doubleEntryForm);
        this.doubleEntry = this.dataPersistenceService.get();
    }

    // Fill or reset form data based on input
    private static setFormValue(doubleEntryForm: FormGroup, value?: DoubleEntryRow): void {
        if (!value) {
            doubleEntryForm.setValue({
                code: '',
                date: new Date(),
                name: '',
                description: '',
                give: null,
                take: null,
                id: null,
            });
        } else {
            doubleEntryForm.setValue(value);
        }

        doubleEntryForm?.markAsPristine();
        doubleEntryForm?.markAsUntouched();
    }

    editRow(row: DoubleEntryRow, doubleEntryForm: FormGroup): void {
        DoubleEntryComponent.setFormValue(doubleEntryForm, row);
    }

    discardEditRow(row: DoubleEntryRow, doubleEntryForm: FormGroup): void {
        DoubleEntryComponent.setFormValue(doubleEntryForm);
    }

    deleteRow(row: DoubleEntryRow): void {
        this.doubleEntry.splice(this.doubleEntry.indexOf(row), 1);
        this.matSnackBar.open('La riga è stata cancellata con successo.');
        this.persistData();
    }

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
            for (let i = 0; i < this.doubleEntry.length; i++) {
                if (this.doubleEntry[i].id !== formRowId) {
                    continue;
                }

                this.doubleEntry[i] = doubleEntryRow;
                break;
            }
        }

        // If the row was balanced recompute data
        if (doubleEntryRow.hasBeenBalanced) {
            this.checkGroup(doubleEntryRow);
        }

        // Reset form
        DoubleEntryComponent.setFormValue(doubleEntryForm);

        // Save data and create a new line
        this.persistData();
        this.doubleEntry = this.dataPersistenceService.get();
    }

    persistData(): void {
        this.dataPersistenceService.set(this.doubleEntry);
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
}
