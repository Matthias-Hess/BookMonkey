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
      minlength: 'Die ISBN muss mindestens 10 Zeichen haben.',
      maxlength: 'Die ISBN darf höchstens 13 Zeichen haben.'
    },
    published: {
      required: 'Ein Erscheinungsdatum ist obligatorisch.'
    },
    authors: {
      required: 'Ein Autor ist obligatorisch.'
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
