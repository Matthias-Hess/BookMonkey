import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'bm-form-messages',
  templateUrl: './form-messages.component.html',
  styleUrls: ['./form-messages.component.css']
})
export class FormMessagesComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() controlName: string;

  private allMessages = {
    title: {
      required: 'Ein Buchtitel ist obligatorisch.'
    },
    isbn: {
      required: 'EIne ISBN muss angegeben werden.',
      isbnFormat: 'Die ISBN muss 10 oder 13 Zeichen haben.',
      isbnExists: 'Die ISBN existiert bereits.'
    },
    published: {
      required: 'Ein Erscheinungsdatum ist obligatorisch.'
    },
    authors: {
      atLeastOneAuthor: 'Ein Autor ist obligatorisch.'
    }
  };

  errorsForControl(): string[] {
    const messages = this.allMessages[this.controlName];

    if(!this.control || !this.control.errors || !messages || !this.control.dirty) {
      return null;
    }

    return Object.keys(this.control.errors).map(err => messages[err]);
  }

  constructor() { }

  ngOnInit() {
  }

}
