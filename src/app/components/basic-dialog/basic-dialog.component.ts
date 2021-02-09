import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BasicDialogDataModel } from '../../interfaces/basic-dialog-data.model';

@Component({
    selector: 'app-basic-dialog',
    templateUrl: './basic-dialog.component.html',
    styleUrls: ['./basic-dialog.component.scss']
})
export class BasicDialogComponent implements OnInit {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: BasicDialogDataModel,
        private changeDetetionRef: ChangeDetectorRef
    ) {
    }

    ngOnInit(): void {
        // We should at least one button to avoid confusion for the user using the platform
        if (this.data.actions === undefined) {
            this.data.actions = [{
                actionName: '',
                text: $localize`Ok`
            }];
        }

        this.changeDetetionRef.detectChanges();
    }
}
