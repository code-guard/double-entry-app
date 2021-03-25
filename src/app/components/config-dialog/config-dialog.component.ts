import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigService } from '../../services/config.service';

@Component({
    selector: 'app-config-dialog',
    templateUrl: './config-dialog.component.html',
    styleUrls: ['./config-dialog.component.scss']
})
export class ConfigDialogComponent implements OnInit {
    form = new FormGroup({
        variations: new FormControl(true),
    });

    constructor(
        private matDialogRef: MatDialogRef<ConfigDialogComponent>,
        private configService: ConfigService,
    ) {
    }

    ngOnInit(): void {
        this.form.patchValue(this.configService.get());
    }

    closeDialog(save: boolean): void {
        if (save) {
            this.configService.set(this.form.value);
        }

        this.matDialogRef.close();
    }
}
