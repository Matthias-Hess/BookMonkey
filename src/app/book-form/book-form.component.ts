import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { BookFactory } from '../shared/book-factory';
import { NgForm } from '@angular/forms';

import { Book } from '../shared/book';


@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book = BookFactory.empty();
  constructor() { }

  @Output() submitBook = new EventEmitter<Book>();
  @ViewChild ('bookForm', {static: false}) bookForm: NgForm;
  ngOnInit() {
  }

  submitForm() {
    this.submitBook.emit(this.book);
    this.book = BookFactory.empty();
    this.bookForm.reset();
  }

}
