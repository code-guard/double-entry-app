import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from '../../services/config.service';
import { DataPersistenceService } from '../../services/data-persistence.service';
import { Config } from '../../models/config.model';
import { DoubleEntry } from '../../models/double-entry';
import { ToggleVariationConfigService } from '../../services/toggle-variation-config.service';

@Component({
    selector: 'app-config-dialog',
    templateUrl: './config-dialog.component.html',
    styleUrls: ['./config-dialog.component.scss']
})
export class ConfigDialogComponent implements OnInit {
    doubleEntry: DoubleEntry;
    config: Config;

    form = new FormGroup({
        variations: new FormControl(true),
    });

    constructor(
        private matDialogRef: MatDialogRef<ConfigDialogComponent>,
        private configService: ConfigService,
        private dataPersistenceService: DataPersistenceService,
        private toggleVariationConfigService: ToggleVariationConfigService
    ) {
        this.doubleEntry = this.dataPersistenceService.get();
        this.config = this.configService.get();
    }

    ngOnInit(): void {
        this.form.patchValue(this.configService.get());
    }

    closeDialog(save: boolean): void {
        if (save) {
            this.configService.set(this.form.value);
            this.toggleVariationConfigService.toggle(this.form.value, this.doubleEntry);
        }

        this.matDialogRef.close();
        location.reload();
    }
}
