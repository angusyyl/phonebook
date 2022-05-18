import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactsURI = 'http://localhost:5000/contacts';

  public addContactSubj = new Subject<Contact>();
  public delContactSubj = new Subject<string>();
  public searchContactSubj = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.contactsURI);
  }

  addContact(body: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.contactsURI, body);
  }

  delContact(id: string): Observable<Contact> {
    return this.http.delete<Contact>(`${this.contactsURI}/${id}`);
  }
}
