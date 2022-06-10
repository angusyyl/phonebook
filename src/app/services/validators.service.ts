import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService extends Validators {

  static nameValidator(fg: AbstractControl): ValidationErrors | null {
    const firstName = fg.get('firstName');
    const middleName = fg.get('middleName');
    const lastName = fg.get('lastName');
    if ((firstName?.value == null || firstName?.value == '') && (middleName?.value == null || middleName?.value == '') && (lastName?.value == null || lastName?.value == '')) {
      return { nameIsEmpty: true };
    }
    return null;
  }
}
