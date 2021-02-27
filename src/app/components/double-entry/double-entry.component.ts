import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DoubleEntryRow } from '../../interfaces/double-entry-row';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataPersistenceService } from '../../services/data-persistence.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BooleanDialogComponent } from '../boolean-dialog/boolean-dialog.component';
import { ImportDataDialogComponent } from '../import-data-dialog/import-data-dialog.component';
import { exactlyOneFilledFieldValidator } from '../../validators/exactly-one-filled-field.validator';

@Component({
    selector: 'app-double-entry',
    templateUrl: './double-entry.component.html',
    styleUrls: ['./double-entry.component.scss']
})
export class DoubleEntryComponent {
    dataSource!: MatTableDataSource<DoubleEntryRow>;
    doubleEntryRows!: DoubleEntryRow[];
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
        this.initData();
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

    private initData(): void {
        this.doubleEntryRows = this.dataPersistenceService.get();
        this.doubleEntryRows.push(this.doubleEntryForm.value);
        this.dataSource = new MatTableDataSource<DoubleEntryRow>(this.doubleEntryRows);
    }

    private getValidRows(): DoubleEntryRow[] {
        return this.doubleEntryRows.filter(row => !row.id);
    }

    editRow(row: DoubleEntryRow, doubleEntryForm: FormGroup): void {
        DoubleEntryComponent.setFormValue(doubleEntryForm, row);
    }

    discardEditRow(row: DoubleEntryRow, doubleEntryForm: FormGroup): void {
        DoubleEntryComponent.setFormValue(doubleEntryForm);
    }

    deleteRow(row: DoubleEntryRow): void {
        this.doubleEntryRows.splice(this.doubleEntryRows.indexOf(row), 1);
        this.dataSource.filter = '';
        this.matSnackBar.open('La riga è stata cancellata con successo.');
    }

    checkGroup(row: DoubleEntryRow): void {
        let total = 0;

        for (const data of this.doubleEntryRows) {
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
            this.doubleEntryRows[this.doubleEntryRows.indexOf(row)].hasBeenBalanced = true;
            this.dataSource.filter = '';
            return;
        }

        this.doubleEntryRows[this.doubleEntryRows.indexOf(row)].hasBeenBalanced = false;
        this.matSnackBar.open('Non bilanciate');
    }

    confirmRow(doubleEntryForm: FormGroup): void {
        // Ensure the form is valid
        if (!doubleEntryForm.valid) {
            return;
        }

        // Look for the current row in the array
        let doubleEntryRow;
        for (const row of this.doubleEntryRows) {
            if (row.id !== doubleEntryForm.get('id')?.value) {
                continue;
            }

            doubleEntryRow = row;
            break;
        }

        // Apply the new values
        doubleEntryRow = Object.assign(doubleEntryRow, doubleEntryForm.value);
        doubleEntryRow.id = uuidv4();

        // If the row was balanced recompute data
        if (doubleEntryRow.hasBeenBalanced) {
            this.checkGroup(doubleEntryRow);
        }

        // Reset form
        DoubleEntryComponent.setFormValue(doubleEntryForm);

        // Save data and create a new line
        this.persistData();
        this.initData();
    }

    persistData(): void {
        this.dataPersistenceService.set(this.getValidRows());
    }

    downloadData(): void {
        const anchor = document.getElementById('downloadAnchorElem');
        if (!anchor) {
            return;
        }

        anchor.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.getValidRows())));
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
}
