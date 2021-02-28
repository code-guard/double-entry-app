import { DoubleEntryRow } from './double-entry-row.model';
import { DoubleEntryRowNotFoundError } from '../errors/double-entry-row-not-found.error';

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
        return DoubleEntry.create(Object.values(localStorageValue).filter(row => typeof row === 'object').map(row => {
            return DoubleEntryRow.createFromLocalStorage(row as DoubleEntryRow);
        }));
    }

    getIndexOfDoubleEntryRow(doubleEntryRow: DoubleEntryRow): number {
        for (let i = 0; i < this.length; i++) {
            if (this[i].id !== doubleEntryRow.id) {
                continue;
            }

            return i;
        }

        throw new DoubleEntryRowNotFoundError();
    }
}
