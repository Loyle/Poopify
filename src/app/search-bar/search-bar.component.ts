import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
}
from '@angular/core';

import { YouTubeSearchResult } from './youtube-search-result';
import { YouTubeSearchService } from './youtube-search.service';

import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  clicked = false;
  search = '';
  resultats: YouTubeSearchResult[];

    @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() results: EventEmitter<YouTubeSearchResult[]> = new EventEmitter<YouTubeSearchResult[]>();
    @Output() error: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() closePlayerEvent = new EventEmitter();

    constructor(
      private youtube: YouTubeSearchService,
      private el: ElementRef
    ) {}

    ngOnInit():void{
      /*Observable.fromEvent(document.getElementById('input'), 'keyup')
        // extract the value of input
        .map((e: any) => e.target.value)
        // filter out if empty
        .filter((text: string) => text.length > 1)
        // discard events that take less than 250ms
        //.debounceTime(250)
        // enable loading
        .do(() => this.loading.emit(true))
        // search
        .map((query: string) => this.youtube.search(query))
        // discarding old events if new input comes in
        .switch()
        // acts on returned search results
        .subscribe(
          // on success
          (results: YouTubeSearchResult[]) => {
            this.loading.emit(false);
            this.error.emit(false);
            this.results.emit(results);
          },
          // on error
          (err: any) => {
            this.error.emit(true);
            this.loading.emit(false);
          },
          // on completion
          () => {
            this.error.emit(false);
            this.loading.emit(false);
          }
        );*/
    }


    searchYT(data){
      Observable.fromEvent(document.getElementById('input'), 'keyup')
        // extract the value of input
        .map((e: any) => e.target.value)
        // filter out if empty
        .filter((text: string) => text.length > 1)
        // discard events that take less than 250ms
        //.debounceTime(250)
        // enable loading
        .do(() => this.loading.emit(true))
        // search
        .map((query: string) => this.youtube.search(query))
        // discarding old events if new input comes in
        .switch()
        // acts on returned search results
        .subscribe(
          // on success
          (results: YouTubeSearchResult[]) => {
            this.loading.emit(false);
            this.error.emit(false);
            this.results.emit(results);
          },
          // on error
          (err: any) => {
            this.error.emit(true);
            this.loading.emit(false);
          },
          // on completion
          () => {
            this.error.emit(false);
            this.loading.emit(false);
          }
        );
    }

    closePlayer() : void {
      this.closePlayerEvent.emit();
    }
}
