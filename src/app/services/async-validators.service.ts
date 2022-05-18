import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorsService {

  constructor() { }

  static mobileAsyncValidator(contactService: ContactService): AsyncValidatorFn {
    return (ctrl: AbstractControl): Observable<ValidationErrors | null> => {
      return contactService.getContacts().pipe(
        map((contacts: Contact[]) => contacts.some(contact => contact.mobile === ctrl.value && ctrl.value !== '') ? { 'mobileAlreadyExists': true } : null)
      );
    }
  }
}
