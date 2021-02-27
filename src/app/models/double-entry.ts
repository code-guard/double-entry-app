import { DoubleEntryRow } from './double-entry-row.model';

export class DoubleEntry extends Array<DoubleEntryRow> {
    private constructor(items?: DoubleEntryRow[]) {
        // @ts-ignore
        super(...items);
    }

    static create(doubleEntryRows?: DoubleEntryRow[]): DoubleEntry {
        const doubleEntry = Object.create(DoubleEntry.prototype);

        if (doubleEntryRows) {
            doubleEntryRows.forEach(doubleEntryRow => {
                doubleEntry.push(doubleEntryRow);
            });
        }

        return doubleEntry;
    }

    static createFromLocalStorage(localStorageValue: object[]): DoubleEntry {
        return DoubleEntry.create(localStorageValue.map(row => {
            return DoubleEntryRow.createFromLocalStorage(row as DoubleEntryRow);
        }));
    }
}
