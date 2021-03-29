import { Component, OnInit } from '@angular/core';
import { TAccount } from '../../interfaces/t-account';
import { v4 as uuidv4 } from 'uuid';
import { DataPersistenceService } from '../../services/data-persistence.service';
import { DoubleEntry } from '../../models/double-entry';
import { Config } from '../../models/config.model';
import { ConfigService } from '../../services/config.service';

@Component({
    selector: 'app-t-account',
    templateUrl: './t-account.component.html',
    styleUrls: ['./t-account.component.scss']
})
export class TAccountComponent implements OnInit {
    doubleEntryRows!: DoubleEntry;
    tAccounts: TAccount[] = [];
    config: Config;

    constructor(
        private dataPersistenceService: DataPersistenceService,
        private configService: ConfigService
    ) {
        this.config = this.configService.get();
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
                variation: doubleEntryRow.variation,
            });
        });

        this.tAccounts = Object.values(tAccounts);
    }
}
