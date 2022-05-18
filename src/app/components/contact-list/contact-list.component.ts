import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from '../../models/contact.model'
import { ContactService } from 'src/app/services/contact.service';
import { Subscription } from 'rxjs';


export interface ContactVO {
  contact: Contact;
  hidden: boolean;
};

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: ContactVO[] = [];
  private addContactSub = new Subscription();
  private delContactSub = new Subscription();
  private searchContactSub = new Subscription();

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe((contacts: Contact[]) => {
      contacts.map(c => this.contacts.push({ contact: c, hidden: false }));
      this.contacts.sort((a, b) => (a.contact.firstName! + a.contact.middleName! + a.contact.lastName!) > (b.contact.firstName! + b.contact.middleName! + b.contact.lastName!) ? 1 : -1);
    });

    this.addContactSub = this.contactService.addContactSubj.subscribe(contact => {
      this.contacts.push({ contact: contact, hidden: false });
      this.contacts.sort((a, b) => (a.contact.firstName! + a.contact.middleName! + a.contact.lastName!) > (b.contact.firstName! + b.contact.middleName! + b.contact.lastName!) ? 1 : -1);
    });

    this.delContactSub = this.contactService.delContactSubj.subscribe(id => {
      this.contacts = this.contacts.filter(c => c.contact.id !== id);
    })

    this.searchContactSub = this.contactService.searchContactSubj.subscribe(keyword => {
      if (keyword === '') {
        this.contacts.map(c => c.hidden = false);
      } else {
        this.contacts.map(c =>
          (c.contact.firstName?.concat(c.contact.middleName || '', c.contact.lastName || '').includes(keyword))
            || (c.contact.mobile?.includes(keyword)) ? c.hidden = false : c.hidden = true);
      }
    })
  }

  ngOnDestroy(): void {
    this.addContactSub.unsubscribe();
    this.delContactSub.unsubscribe();
    this.searchContactSub.unsubscribe();
  }

}
