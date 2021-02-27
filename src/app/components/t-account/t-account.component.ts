import { Component, OnInit } from '@angular/core';
import { DoubleEntryRow } from '../../interfaces/double-entry-row';
import { TAccount } from '../../interfaces/t-account';
import { v4 as uuidv4 } from 'uuid';
import { DataPersistenceService } from '../../services/data-persistence.service';

@Component({
    selector: 'app-t-account',
    templateUrl: './t-account.component.html',
    styleUrls: ['./t-account.component.scss']
})
export class TAccountComponent implements OnInit {
    doubleEntryRows: DoubleEntryRow[] = [];
    tAccounts: TAccount[] = [];

    constructor(
        private dataPersistenceService: DataPersistenceService,
    ) {
    }

    ngOnInit(): void {
        this.doubleEntryRows = this.dataPersistenceService.get() || [];
        this.computeTAccount();
    }

    computeTAccount(): void {
        const tAccounts = {};

        this.doubleEntryRows.forEach(doubleEntryRow => {
            if (!doubleEntryRow.id) {
                return;
            }

            // @ts-ignore
            if (!tAccounts[doubleEntryRow.name]) {
                // @ts-ignore
                tAccounts[doubleEntryRow.name] = {
                    id: uuidv4(),
                    account: doubleEntryRow.name,
                    tAccountRows: [],
                };
            }

            // @ts-ignore
            tAccounts[doubleEntryRow.name].tAccountRows.push({
                id: uuidv4(),
                doubleEntryRowId: doubleEntryRow.id,
                date: doubleEntryRow.date,
                give: doubleEntryRow.give,
                take: doubleEntryRow.take,
            });
        });

        this.tAccounts = Object.values(tAccounts);
    }
}
