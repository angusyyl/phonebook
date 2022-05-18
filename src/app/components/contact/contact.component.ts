import { Component, Input, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from '../../models/contact.model'
import { faUser, faMobile, faEnvelope, faBriefcase, faClipboard, faCakeCandles } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  faUser = faUser;
  faMobile = faMobile;
  faEnvelope = faEnvelope
  faBriefcase = faBriefcase;
  faClipboard = faClipboard;
  faCakeCandles = faCakeCandles;

  @Input() contact: Contact | undefined;
  contactVO: {
    contact: Contact | undefined;
    showDetail: boolean;
  } | undefined;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactVO = {
      contact: this.contact,
      showDetail: false
    };
  }

  onToggleDetail(): void {
    if (this.contactVO !== undefined) {
      this.contactVO.showDetail = !this.contactVO?.showDetail;
    }
  }

  onDelete(id: string): void {
    this.contactService.delContact(id).subscribe(() => this.contactService.delContactSubj.next(id));
  }

}
