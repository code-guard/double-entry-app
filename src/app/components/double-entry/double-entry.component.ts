import { Component, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DoubleEntryRow } from '../../interfaces/double-entry-row';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataPersistenceService } from '../../services/data-persistence.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-double-entry',
    templateUrl: './double-entry.component.html',
    styleUrls: ['./double-entry.component.scss']
})
export class DoubleEntryComponent {
    dataSource: MatTableDataSource<DoubleEntryRow>;
    // @ts-ignore
    rowData: DoubleEntryRow;
    doubleEntryRows: DoubleEntryRow[];
    doubleEntryForm = new FormGroup({
        code: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        give: new FormControl(),
        take: new FormControl(),
    });

    names = [
        'pippo',
        'pluto',
        'paperino',
    ];

    // @ts-ignore
    lastBalancedRow: DoubleEntryRow | null;

    constructor(
        private matSnackBar: MatSnackBar,
        private dataPersistenceService: DataPersistenceService,
    ) {
        this.doubleEntryRows = this.dataPersistenceService.get() || [];
        this.dataSource = new MatTableDataSource<DoubleEntryRow>(this.doubleEntryRows);
        this.confirmRow();
    }

    editRow(row: DoubleEntryRow): void {
        if (this.rowData.isNew) {
            this.doubleEntryRows.splice(this.doubleEntryRows.length - 1, 1);
        }

        this.rowData = this.doubleEntryRows[this.doubleEntryRows.indexOf(row)];
        this.dataSource.filter = '';
    }

    discardEditRow(): void {
        /** @TODO Implement me after local storage */
    }

    deleteRow(row: DoubleEntryRow): void {
        this.doubleEntryRows.splice(this.doubleEntryRows.indexOf(row), 1);

        // This needs to stay. Don't know why.
        this.dataSource.filter = '';

        this.matSnackBar.open('La riga è stata cancellata con successo.');
    }

    confirm(row: DoubleEntryRow): void {
        this.lastBalancedRow = row;

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
            this.matSnackBar.open('Done');
            return;
        }

        this.matSnackBar.open('Doe');
    }

    confirmRow(): void {
        if (this.rowData) {
            this.rowData.isNew = false;
        }

        this.rowData = {
            id: uuidv4(),
            code: null,
            date: new Date(),
            name: null,
            description: null,
            give: null,
            take: null,
            isNew: true,
        };
        this.doubleEntryRows.push(this.rowData);

        // This needs to stay. Don't know why.
        this.dataSource.filter = '';
    }

    persistData(doubleEntryRows: DoubleEntryRow[]): void {
        this.dataPersistenceService.set(doubleEntryRows.filter(row => !row.isNew));
    }

    downloadData(doubleEntryRows: DoubleEntryRow[]): void {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(doubleEntryRows));
        const dlAnchorElem = document.getElementById('downloadAnchorElem');
        // @ts-ignore
        dlAnchorElem.setAttribute('href', dataStr);
        // @ts-ignore
        dlAnchorElem.setAttribute('download', 'partita-doppia-export.json');
        // @ts-ignore
        dlAnchorElem.click();
    }
}
