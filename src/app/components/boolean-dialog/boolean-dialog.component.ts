import { Component, OnInit } from '@angular/core';
import { BasicDialogComponent } from '../basic-dialog/basic-dialog.component';

@Component({
    selector: 'app-boolean-dialog',
    templateUrl: '../basic-dialog/basic-dialog.component.html',
    styleUrls: ['../basic-dialog/basic-dialog.component.scss']
})
export class BooleanDialogComponent extends BasicDialogComponent implements OnInit {
    actionsTemplate = [
        {
            actionName: false,
            text: $localize`No`,
        },
        {
            actionName: true,
            text: $localize`Sì`,
        }
    ];

    ngOnInit(): void {
        super.ngOnInit();

        // If the only action available is the one added by the parent
        if (
            this.data.actions &&
            this.data.actions.length === 1 &&
            this.data.actions[0].actionName === '' &&
            this.data.actions[0].text === $localize`Ok`
        ) {
            if (this.data.reverseButtons === true) {
                this.data.actions = this.actionsTemplate.reverse();
                return;
            }

            this.data.actions = this.actionsTemplate;
        }
    }
}
