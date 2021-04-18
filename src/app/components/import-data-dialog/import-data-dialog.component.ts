import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BasicDialogDataModel } from '../../interfaces/basic-dialog-data.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DataPersistenceService } from '../../services/data-persistence.service';
import { DoubleEntry } from '../../models/double-entry';
import { ConfigService } from '../../services/config.service';
import { ToggleVariationConfigService } from '../../services/toggle-variation-config.service';
import { BooleanDialogComponent } from '../boolean-dialog/boolean-dialog.component';

@Component({
    selector: 'app-import-data-dialog',
    templateUrl: './import-data-dialog.component.html',
    styleUrls: ['./import-data-dialog.component.scss']
})
export class ImportDataDialogComponent {
    private doubleEntries?: DoubleEntry;

    form = new FormGroup({
        file: new FormControl(),
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: BasicDialogDataModel,
        private dataPersistenceService: DataPersistenceService,
        private matDialogRef: MatDialogRef<ImportDataDialogComponent>,
        private matDialog: MatDialog,
        private configService: ConfigService,
        private toggleVariationConfigService: ToggleVariationConfigService
    ) {
    }

    import(): void {
        this.matDialog.open(BooleanDialogComponent, {
            data: {
                message: 'Attenzione: il progetto corrente sarà sovrascritto. Sei sicuro di voler procedere?'
            },
        }).afterClosed().subscribe(response => {
            if (!response) {
                return;
            }

            this.dataPersistenceService.set(this.doubleEntries as DoubleEntry);
            this.handleVariationsConfigAfterImport();
            this.matDialogRef.close(true);
        });
    }

    private handleVariationsConfigAfterImport(): void {
        const data = this.dataPersistenceService.get();
        const config = this.configService.get();

        // If the config is different from the variation setting of the imported rows
        if (!data[0].variation === !config.variations) {
            return;
        }

        this.toggleVariationConfigService.toggle(config, this.dataPersistenceService.get(), false);
        this.configService.set(config);
        location.reload();
    }

    onFileSelect(input: any): void {
        if (!input) {
            return;
        }

        const file = input.files[0];
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            if (!event || !event.target) {
                return;
            }

            const fileContent = event.target.result as string;

            this.doubleEntries = JSON.parse(fileContent);
        };

        fileReader.readAsText(file, 'UTF-8');
    }
}
