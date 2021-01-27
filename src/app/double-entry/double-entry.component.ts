import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DoubleEntryRow } from '../interfaces/double-entry-row';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-double-entry',
    templateUrl: './double-entry.component.html',
    styleUrls: ['./double-entry.component.scss']
})
export class DoubleEntryComponent {
    dataSource: MatTableDataSource<DoubleEntryRow>;
    rowData: DoubleEntryRow;
    dataset: DoubleEntryRow[] = [
        {
            id: uuidv4(),
            code: '2',
            date: new Date(),
            name: '5',
            description: '4',
            give: 6,
            take: 6,
        },
        {
            id: uuidv4(),
            code: '2',
            date: new Date(),
            name: '5',
            description: '4',
            give: 6,
            take: 6,
        },
        {
            id: uuidv4(),
            code: '2',
            date: new Date(),
            name: '5',
            description: '4',
            give: 6,
            take: 6,
        },
        {
            id: uuidv4(),
            code: '2',
            date: new Date(),
            name: '5',
            description: '4',
            give: 6,
            take: 6,
        },
        {
            id: uuidv4(),
            code: '2',
            date: new Date(),
            name: '5',
            description: '4',
            give: 6,
            take: 6,
        },
        {
            id: uuidv4(),
            code: '2',
            date: new Date(),
            name: '5',
            description: '4',
            give: 6,
            take: 6,
        },
        {
            id: uuidv4(),
            code: '2',
            date: new Date(),
            name: '5',
            description: '4',
            give: 5,
            take: 6,
        },
    ];

    constructor(
        private matSnackBar: MatSnackBar,
    ) {
        this.rowData = {
            id: uuidv4(),
            code: null,
            date: null,
            name: null,
            description: null,
            give: null,
            take: null,
        };

        this.dataset.push(this.rowData);

        this.dataSource = new MatTableDataSource<DoubleEntryRow>(this.dataset);
    }

    editRow(row: DoubleEntryRow): void {
        this.rowData = this.dataset[this.dataset.indexOf(row)];
    }

    deleteRow(row: DoubleEntryRow): void {
        this.dataset.splice(this.dataset.indexOf(row), 1);

        // This needs to stay. Don't know why.
        this.dataSource.filter = '';
    }

    confirm(row: DoubleEntryRow): void {
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

        console.log(total);

        if (total === 0) {
            this.matSnackBar.open('Done');
            return;
        }

        this.matSnackBar.open('Doe');
    }

    confirmRow(): void {
        this.rowData = {
            id: uuidv4(),
            code: null,
            date: null,
            name: null,
            description: null,
            give: null,
            take: null,
        };
        this.dataset.push(this.rowData);

        // This needs to stay. Don't know why.
        this.dataSource.filter = '';
    }
}