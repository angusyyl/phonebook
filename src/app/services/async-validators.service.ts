import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map, take } from 'rxjs/operators';
import { DEBOUNCE_TIME } from '../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorsService {

  constructor() { }

  static mobileAsyncValidator(afdb: AngularFireDatabase): AsyncValidatorFn {
    return (ctrl: AbstractControl): Observable<ValidationErrors | null> => {
      // this is not working: ref.child('mobile').equalTo(ctrl.value)
      return afdb.list('/contacts', ref => ref.orderByChild('mobile').equalTo(ctrl.value))
        .valueChanges()
        .pipe(debounceTime(DEBOUNCE_TIME),
          take(1),
          map(arr => arr.length ? { 'mobileAlreadyExists': true } : null)
        )
    }
  }
}
