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

    constructor(private matDialog: MatDialog) {
    }

    openFacebook(): void{
        window.open('https://www.facebook.com/paritadoppiaapp', '_blank');
    }

    openInstagram(): void{
        window.open('https://www.instagram.com/partitadoppia.app/', '_blank');
    }

    openInfoDialog(): void {
        this.matDialog.open(InfoDialogComponent, {
            data: {
                title: 'Sei sicuro di voler eliminare tutto il progetto?',
                message: 'Non sarà possibile recuperarlo successivamente.',
            },
            width: '40%',
        });
    }
}
