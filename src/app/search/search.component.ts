import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {filter, debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {BookStoreService} from '../shared/book-store.service'
import {Book} from '../shared/book';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isLoading = false;
  foundBooks: Book[] = [];
  constructor(private bs: BookStoreService) { }
  keyUp$ = new Subject<string>();
  ngOnInit() {
    this.keyUp$.pipe(
      filter(term => term.length > 3),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(term => this.bs.getAllSearch(term)),
      tap(() => this.isLoading = false)
    )
    .subscribe(books => {
      this.foundBooks = books;
      console.log(this.foundBooks.length)
    });
  }

}
