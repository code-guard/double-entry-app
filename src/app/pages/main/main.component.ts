import { Component, OnInit } from '@angular/core';
import { DoubleEntryRow } from '../../interfaces/double-entry-row';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent {
    doubleEntryRows: DoubleEntryRow[] = [];
    showTAccount = false;
}
