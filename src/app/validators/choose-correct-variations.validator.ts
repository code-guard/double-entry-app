import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function chooseCorrectVariationsValidator(variationsField: string, giveField: string, takeFiled: string): ValidatorFn {
    return (mainControl: AbstractControl): ValidationErrors | null => {
        let hasError = false;

        if (mainControl.get(giveField)?.value) {
            hasError = ['VEN', 'VFP'].indexOf(mainControl.get(variationsField)?.value) === -1;
        }

        if (mainControl.get(takeFiled)?.value) {
            hasError = ['VEP', 'VFN'].indexOf(mainControl.get(variationsField)?.value) === -1;
        }

        const errors = hasError ? { inconsistentVariationAndMove: true } : null;

        mainControl.get(variationsField)?.setErrors(errors);

        return errors;
    };
}
