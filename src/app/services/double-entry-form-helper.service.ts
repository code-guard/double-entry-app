import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { exactlyOneFilledFieldValidator } from '../validators/exactly-one-filled-field.validator';
import { DoubleEntryRow } from '../models/double-entry-row.model';

@Injectable({
    providedIn: 'root'
})
export class DoubleEntryFormHelperService {
    // Create and returns a standard formGroup with correct values and validations
    getDoubleEntryForm(): FormGroup {
        const formGroup = new FormGroup({
            code: new FormControl(null, Validators.pattern('^[0-9]*$')),
            date: new FormControl(null, Validators.required),
            variation: new FormControl(null, Validators.required),
            name: new FormControl(null, Validators.required),
            description: new FormControl(null),
            give: new FormControl(null, Validators.min(1)),
            take: new FormControl(null, Validators.min(1)),

            id: new FormControl(),
            hasBeenBalanced: new FormControl(),
        }, {
            validators: exactlyOneFilledFieldValidator(['give', 'take']),
        });

        this.applyFormValue(formGroup);

        return formGroup;
    }

    // Apply to the provided form the values in input or default, also restore the form in healty state
    applyFormValue(doubleEntryForm: FormGroup, value?: DoubleEntryRow): void {
        doubleEntryForm?.markAsPristine();
        doubleEntryForm?.markAsUntouched();

        if (!value) {
            doubleEntryForm.setValue({
                code: '',
                date: new Date(),
                name: null,
                variation: null,
                description: '',
                give: null,
                take: null,
                id: null,
                hasBeenBalanced: null,
            });

            return;
        }

        doubleEntryForm.patchValue(value);
    }
}
