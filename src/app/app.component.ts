import { Component } from '@angular/core';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

type ViewState = 'list' | 'details';


@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
