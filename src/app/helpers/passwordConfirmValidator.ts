import { AbstractControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl | UntypedFormGroup): ValidationErrors | null => {

        const group = (formGroup as UntypedFormGroup);
        const control = group.controls[controlName];
        const matchingControl = group.controls[matchingControlName];

        if (control.value == null && matchingControl.value == null) {
            matchingControl.setErrors(null);
            return null;
        }

        if (control.value?.length == 0 && matchingControl.value?.length == 0) {
            matchingControl.setErrors(null);
            return null;
        }

        if (control.value != matchingControl.value) {
            matchingControl.setErrors({ passwordMismatch: true });
        } else {
            matchingControl.setErrors(null);
        }

        return null;
    }
}