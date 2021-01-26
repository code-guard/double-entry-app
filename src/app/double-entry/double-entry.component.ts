import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DoubleEntryRow } from '../interfaces/double-entry-row';

@Component({
    selector: 'app-double-entry',
    templateUrl: './double-entry.component.html',
    styleUrls: ['./double-entry.component.scss']
})
export class DoubleEntryComponent {
    dataSource: MatTableDataSource<DoubleEntryRow>;

    constructor() {
        this.dataSource = new MatTableDataSource<DoubleEntryRow>([{
            code: null,
            date: null,
            name: null,
            description: null,
            give: null,
            take: null,
        }]);
    }

    editRow(): void {

    }

    deleteRow(): void {

    }

    confirm(): void {

    }


    addRow(): void {
        // this.dataSource.data.push();

        // This needs to stay. Don't know why.
        this.dataSource.filter = '';
    }
}
