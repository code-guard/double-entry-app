import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasicDialogDataModel } from '../../interfaces/basic-dialog-data.model';
import { FormControl, FormGroup } from '@angular/forms';
import { DataPersistenceService } from '../../services/data-persistence.service';
import { DoubleEntryRow } from '../../interfaces/double-entry-row';
import { DoubleEntry } from '../../models/double-entry';

@Component({
    selector: 'app-import-data-dialog',
    templateUrl: './import-data-dialog.component.html',
    styleUrls: ['./import-data-dialog.component.scss']
})
export class ImportDataDialogComponent {
    private doubleEntries?: DoubleEntryRow[];

    form = new FormGroup({
        file: new FormControl(),
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: BasicDialogDataModel,
        private dataPersistenceService: DataPersistenceService,
        private matDialogRef: MatDialogRef<ImportDataDialogComponent>,
    ) {
    }

    import(): void {
        this.dataPersistenceService.set(this.doubleEntries as DoubleEntry);
        this.matDialogRef.close(true);
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
