import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, fromEvent, Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contact.service';
import { DEBOUNCE_TIME } from 'src/app/shared/constant';

@Component({
  selector: 'app-search-contact',
  templateUrl: './search-contact.component.html',
  styleUrls: ['./search-contact.component.css']
})
export class SearchContactComponent implements OnInit {

  faDeleteLeft = faDeleteLeft;

  searchKeywordsSub = new Subscription();

  searchForm = new FormGroup({
    'searchKeyword': new FormControl('')
  })

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.searchKeywordsSub = this.searchForm.get('searchKeyword')!.valueChanges.pipe(distinctUntilChanged(), debounceTime(DEBOUNCE_TIME)).subscribe(val => {
      this.contactService.searchContactSubj.next(val);
    });
  }

  onClearSearch(): void {
    this.searchForm.get('searchKeyword')?.setValue('');
    // this.searchForm.reset();
  }

  ngOnDestroy(): void {
    this.searchKeywordsSub.unsubscribe();
  }
}
