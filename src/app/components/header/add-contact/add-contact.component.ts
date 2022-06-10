import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { v4 as uuidv4 } from 'uuid';
import { faUser, faMobile, faEnvelope, faBriefcase, faClipboard, faCakeCandles } from '@fortawesome/free-solid-svg-icons';
import { AsyncValidatorsService } from 'src/app/services/async-validators.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  faUser = faUser;
  faMobile = faMobile;
  faEnvelope = faEnvelope
  faBriefcase = faBriefcase;
  faClipboard = faClipboard;
  faCakeCandles = faCakeCandles;

  clickedSubmit = false;

  addForm = new FormGroup({
    firstName: new FormControl(null),
    middleName: new FormControl(null),
    lastName: new FormControl(null),
    mobile: new FormControl(null, Validators.required, AsyncValidatorsService.mobileAsyncValidator(this.afdb)),
    email: new FormControl(null, Validators.email),
    work: new FormControl(null),
    remarks: new FormControl(null),
    dob: new FormControl(null)
  }, [ValidatorsService.nameValidator]);

  constructor(private contactService: ContactService, private afdb: AngularFireDatabase) { }

  ngOnInit(): void {

  }

  onSubmitForm(): void {
    this.clickedSubmit = true;

    console.debug(this.addForm);
    if (this.addForm.valid) {
      const reqBody = {
        firstName: this.addForm.value.firstName,
        middleName: this.addForm.value.middleName,
        lastName: this.addForm.value.lastName,
        mobile: this.addForm.value.mobile,
        email: this.addForm.value.email,
        work: this.addForm.value.work,
        remarks: this.addForm.value.remarks,
        dob: this.addForm.value.dob
      };
      this.contactService.addContact(reqBody)
        .then(_ => console.debug('Added contact.'))
        .catch(err => console.error(err.message, 'Failed to add contact.'))
        .finally(() => {
          console.debug(this.addForm);
          this.resetForm();
        });
    }
  }

  resetForm(): void {
    console.debug('Form has been reset.');
    this.addForm.reset();
    this.clickedSubmit = false;
  }
}
