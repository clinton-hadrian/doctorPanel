import { FormArray, FormControl, FormGroup } from "@angular/forms";

export default class formHelper {
    static markFormGroupTouched(fg: FormGroup | FormArray) {
        Object.keys(fg.controls).forEach((field) => {
            const control = fg.get(field);
            if (control instanceof FormGroup || control instanceof FormArray) {
                this.markFormGroupTouched(control);
            } else if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            }
        });
    }
}