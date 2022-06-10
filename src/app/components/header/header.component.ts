import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  faMagnifyingGlass = faMagnifyingGlass;

  showAddContact = false;
  showSearchContact = false;

  numOfContacts = 0;
  contactsSub = new Subscription();

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactsSub = this.contactService.getContacts().subscribe(contacts => {
      this.numOfContacts = contacts.length
    });
  }

  onToggleAddContact(): void {
    this.showAddContact = !this.showAddContact;
    this.showSearchContact = false;
  }

  onToggleSearchContact(): void {
    this.showSearchContact = !this.showSearchContact;
    this.showAddContact = false;
  }

  ngOnDestroy(): void {
    this.contactsSub.unsubscribe();
  }
}
