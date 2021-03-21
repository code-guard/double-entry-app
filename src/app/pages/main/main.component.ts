import { Component } from '@angular/core';
import { DoubleEntryRow } from '../../interfaces/double-entry-row';
import { MatDialog } from '@angular/material/dialog';
import { ConfigDialogComponent } from '../../components/config-dialog/config-dialog.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    doubleEntryRows: DoubleEntryRow[] = [];
    showTAccount = false;

    constructor(
        private matDialog: MatDialog,
    ) {
    }

    openConfigDialog(): void {
        this.matDialog.open(ConfigDialogComponent);
    }
}
