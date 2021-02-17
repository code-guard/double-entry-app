import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { DoubleEntryRow } from '../interfaces/double-entry-row';

@Injectable({
    providedIn: 'root'
})
export class DataPersistenceService {
    constructor(
        private localStorageService: LocalStorageService
    ) {
    }

    KEY = 'doubleEntries';
    value: DoubleEntryRow[] | null = null;

    set(value: DoubleEntryRow[], expired: number = 0): void {
        this.localStorageService.set(this.KEY, value, expired, 's');
        // this.value = value;
    }

    remove(): void {
        this.localStorageService.remove(this.KEY);
    }

    get(): DoubleEntryRow[] | null {
        /*if (this.value) {
            return this.value;
        }*/

        // this.value = this.localStorageService.get(this.KEY);
        // return this.value;
        return this.localStorageService.get(this.KEY);
    }

    clear(): void {
        this.localStorageService.clear();
    }
}
