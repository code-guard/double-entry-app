import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { DoubleEntry } from '../models/double-entry';

@Injectable({
    providedIn: 'root'
})
export class DataPersistenceService {
    constructor(
        private localStorageService: LocalStorageService
    ) {
    }

    KEY = 'doubleEntries';
    value: DoubleEntry | null = null;

    set(value: DoubleEntry, expired: number = 0): void {
        this.localStorageService.set(this.KEY, value, expired, 's');
        // this.value = value;
    }

    remove(): void {
        this.localStorageService.remove(this.KEY);
    }

    get(): DoubleEntry {
        /*if (this.value) {
            return this.value;
        }*/

        // this.value = this.localStorageService.get(this.KEY);
        // return this.value;
        const localStorageValues = this.localStorageService.get(this.KEY) || [];

        return DoubleEntry.createFromLocalStorage(localStorageValues);
    }

    clear(): void {
        this.localStorageService.clear();
    }
}
