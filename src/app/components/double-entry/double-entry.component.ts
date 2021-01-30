import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DoubleEntryRow } from '../../interfaces/double-entry-row';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataPersistenceService } from '../../services/data-persistence.service';
import { TAccount } from '../../interfaces/t-account';

@Component({
    selector: 'app-double-entry',
    templateUrl: './double-entry.component.html',
    styleUrls: ['./double-entry.component.scss']
})
export class DoubleEntryComponent {
    dataSource: MatTableDataSource<DoubleEntryRow>;
    // @ts-ignore
    rowData: DoubleEntryRow;
    dataset: DoubleEntryRow[];

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
        this.dataset = this.dataPersistenceService.get() || [];
        this.dataSource = new MatTableDataSource<DoubleEntryRow>(this.dataset);
        this.confirmRow();
    }

    editRow(row: DoubleEntryRow): void {
        if (this.rowData.isNew) {
            this.dataset.splice(this.dataset.length - 1, 1);
        }

        this.rowData = this.dataset[this.dataset.indexOf(row)];
        this.dataSource.filter = '';
    }

    discardEditRow(): void {
        /** @TODO Implement me after local storage */
    }

    deleteRow(row: DoubleEntryRow): void {
        this.dataset.splice(this.dataset.indexOf(row), 1);

        // This needs to stay. Don't know why.
        this.dataSource.filter = '';

        this.matSnackBar.open('La riga è stata cancellata con successo.');
    }

    confirm(row: DoubleEntryRow): void {
        this.lastBalancedRow = row;

        let total = 0;

        for (const data of this.dataset) {
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
        this.dataset.push(this.rowData);

        // This needs to stay. Don't know why.
        this.dataSource.filter = '';
    }

    persistData(dataset: DoubleEntryRow[]): void {
        this.dataPersistenceService.set(dataset.filter(row => !row.isNew));
    }

    downloadData(dataset: DoubleEntryRow[]): void {
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataset));
        const dlAnchorElem = document.getElementById('downloadAnchorElem');
        // @ts-ignore
        dlAnchorElem.setAttribute('href', dataStr);
        // @ts-ignore
        dlAnchorElem.setAttribute('download', 'partita-doppia-export.json');
        // @ts-ignore
        dlAnchorElem.click();
    }

    computeTAccount(dataset: DoubleEntryRow[]): TAccount[] {
        const tAccounts = {};

        dataset.forEach(row => {
            if (row.isNew) {
                return;
            }

            // @ts-ignore
            if (!tAccounts[row.name]) {
                // @ts-ignore
                tAccounts[row.name] = {
                    id: uuidv4(),
                    account: row.name,
                    tAccountRows: [],
                };
            }

            // @ts-ignore
            tAccounts[row.name].tAccountRows.push({
                id: uuidv4(),
                doubleEntryRowId: row.id,
                date: row.date,
                give: row.give,
                take: row.take,
            });
        });

        console.log(tAccounts);

        return Object.values(tAccounts);
    }
}
