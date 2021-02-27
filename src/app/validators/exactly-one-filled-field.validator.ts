import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function exactlyOneFilledFieldValidator(fields: string[]): ValidatorFn {
    return (mainControl: AbstractControl): ValidationErrors | null => {
        const controls: AbstractControl[] = [];
        let controlsWithValue = 0;

        fields.forEach(field => {
            const control = mainControl.get(field) as AbstractControl;
            controls.push(control);
            if (control?.value) {
                controlsWithValue++;
            }
        });

        const errors = controlsWithValue !== 1 ? { atLeastGiveOrTake: true } : null;

        controls.forEach(control => {
            control.setErrors(errors);
        });

        return errors;
    };
}
