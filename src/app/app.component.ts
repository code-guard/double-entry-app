import { Component } from '@angular/core';
import {InfoDialogComponent} from './components/info-dialog/info-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'double-entry';

    constructor(
        private matDialog: MatDialog
    ) {
    }

    openInfoDialog(): void {
        this.matDialog.open(InfoDialogComponent);
    }
}
