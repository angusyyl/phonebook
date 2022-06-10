import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable, Subject } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // private contactsURI = 'http://localhost:5000/contacts';

  contactsRef: AngularFireList<Contact>;
  contacts: Observable<Contact[]>;

  searchContactSubj = new Subject<string>();

  constructor(private http: HttpClient, private afdb: AngularFireDatabase) {
    this.contactsRef = this.afdb.list<Contact>('/contacts');
    this.contacts = this.contactsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }) as Contact)
      )
    );
  }

  getContacts(): Observable<Contact[]> {
    return this.contacts;
    // return this.db.list<Contact>('/contacts').valueChanges();
    // return this.http.get<Contact[]>(this.contactsURI);
  }

  addContact(body: any) {
    // this.contactsRef = this.db.list<Contact>('/contacts');
    console.debug(`adding contact ${JSON.stringify(body)}`);
    return this.contactsRef.push(body);
    // return this.http.post<Contact>(this.contactsURI, body);
  }

  delContact(id: string): void {
    this.contactsRef.remove(id);
    // return this.http.delete<Contact>(`${this.contactsURI}/${id}`);
  }
}
