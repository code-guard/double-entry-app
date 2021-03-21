import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';
import { Config } from '../models/config.model';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    KEY = 'config';

    constructor(
        private localStorageService: LocalStorageService
    ) {
    }

    set(value: Config, expired: number = 0): void {
        this.localStorageService.set(this.KEY, value, expired, 's');
    }

    remove(): void {
        this.localStorageService.remove(this.KEY);
    }

    get(): Config {
        const localStorageValues = this.localStorageService.get(this.KEY) || {};
        return Config.createFromLocalStorage(localStorageValues);
    }

    clear(): void {
        this.localStorageService.clear();
    }
}
