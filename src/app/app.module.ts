import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { HeaderComponent } from './components/header/header.component';
import { AddContactComponent } from './components/header/add-contact/add-contact.component';
import { SearchContactComponent } from './components/header/search-contact/search-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    ContactListComponent,
    HeaderComponent,
    AddContactComponent,
    SearchContactComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
