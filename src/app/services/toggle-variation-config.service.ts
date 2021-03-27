import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';
import { DataPersistenceService } from './data-persistence.service';
import { DoubleEntry } from '../models/double-entry';

@Injectable({
    providedIn: 'root'
})
export class ToggleVariationConfigService {
    constructor(
        private dataPersistenceService: DataPersistenceService,
    ) {
    }

    toggle(config: Config, doubleEntry: DoubleEntry, configIsAlreadyToggled?: boolean ): void {
        if (configIsAlreadyToggled === false) {
            config.variations = !config.variations;
        }

        if (config.variations) {
            doubleEntry.applyDefaultVariation();
        } else {
            doubleEntry.removeVariations();
        }

        this.dataPersistenceService.set(doubleEntry);
    }
}
