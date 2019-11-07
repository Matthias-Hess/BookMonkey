import { Component, OnInit} from '@angular/core';
import {Book} from '../shared/book';
import {ActivatedRoute, Router} from '@angular/router';
import {BookStoreService} from '../shared/book-store.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book$: Observable<Book>;
  constructor(
    private bs: BookStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.book$ = this.bs.getSingle(params.get('isbn'));
  }

  getRating(num: number) {
    return new Array(num);
  }

  removeBook() {
    if (confirm("Buch wirklich löschen?")) {
      this.book$.subscribe(
        book => this.bs.remove(book.isbn).subscribe(res => this.router.navigate(['../'], {relativeTo: this.route}))
      );
    }
  }
}


