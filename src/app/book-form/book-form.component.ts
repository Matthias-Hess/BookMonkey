import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { BookFactory } from '../shared/book-factory';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BookValidators } from '../shared/book-validators';
import { BookExistsValidatorService } from '../shared/book-exists-validator.service';

import { Book, Thumbnail } from '../shared/book';


@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit, OnChanges {

  bookForm: FormGroup;
  constructor(private fb: FormBuilder, private bookExistsValidator: BookExistsValidatorService) { }

  @Input() book: Book;

  @Input() editing = false;

  @Output() submitBook = new EventEmitter<Book>();
  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(): void {
    this.initForm();
    this.setFormValues(this.book);
  }

  initForm() {
    if (this.bookForm) {
      return;
    }

    this.bookForm = this.fb.group ({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: [{value: '', disabled: this.editing}, [
        Validators.required,
        BookValidators.isbnFormat
      ],
      this.editing ? null : [this.bookExistsValidator]],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([{title: '', url: ''}]),
      published: []
    })
  }

  private buildAuthorsArray(values: string[]): FormArray {
    return this.fb.array(values, BookValidators.atLeastOneAuthor);
  }

  get authors(): FormArray {
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }

  private buildThumbnailsArray(values: Thumbnail[]): FormArray {
    return this.fb.array (
      values.map(t => this.fb.group(t))
    );
  }

  addAuthorControl() {
    this.authors.push(this.fb.control(''));
  }

  addThumbnailControl() {
    this.thumbnails.push(this.fb.group({url: '', title: ''}));
  }

  setFormValues(book: Book) {
    this.bookForm.patchValue(book);
    this.bookForm.setControl('autors', this.buildAuthorsArray(book.authors));
    this.bookForm.setControl('thumbnails', this.buildThumbnailsArray(book.thumbnails));
  }

  submitForm() {
    const formValue = this.bookForm.value;
    const authors = formValue.authors.filter(a => a);
    const thumbnails = formValue.thumbnails.filter(a => a);
    const isbn = this.editing ? this.book.isbn : formValue.isbn;
    const newBook = {...formValue, isbn, authors, thumbnails};
    console.log(newBook);
    this.submitBook.emit(newBook);
    this.bookForm.reset();
  }

}
