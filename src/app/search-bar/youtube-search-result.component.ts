import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { YouTubeSearchResult } from './youtube-search-result';

@Component({
  selector: 'app-youtube-search-result',
  styleUrls: ['./youtube-search-result.component.css'],
  template: `
    <div class="d-flex align-items-center justify-content-center">
      <img class="minia rounded-circle img-fluid shadow-lg" src="{{ result.thumbnailUrl }}"/>
    </div>
    <div class="caption d-flex align-items-center w-100 pl-3">
    <div class="row w-100">
      <div class="col-6 d-flex align-items-center">
        <h3>{{ result.title }}</h3>
      </div>
      <div class="col-6 d-flex align-items-center justify-content-end">
        <div class="m-3">
          <svg class="bi bi-play" width="3em" height="3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" (click)="playSong()">
            <path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="m-3">
          <ng-template *ngIf="playlistAdded ; then added else notadded"></ng-template>
          <ng-template #added>
            <svg class="bi bi-folder-check" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708l1.146 1.147 2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
              </svg>
          </ng-template>
          <ng-template #notadded>
            <svg class="bi bi-folder-plus" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" (click)="playlistAdded=true">
              <path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M13.5 10a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13v-1.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M13 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>
            </svg>
          </ng-template>
        </div>
        <div class="m-3">
          <ng-template *ngIf="songliked ; then liked else notliked"></ng-template>
          <ng-template #liked>
            <svg class="bi bi-heart-fill" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" (click)="songliked=false">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>
            </svg>
          </ng-template>
          <ng-template #notliked>
            <svg class="bi bi-heart" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" (click)="songliked=true">
              <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>
            </svg>
          </ng-template>
        </div>
      </div>
    </div>
  `
})
export class YouTubeSearchResultComponent implements OnInit {

  playlistAdded = false;
  songliked = false;
  @Input() result: YouTubeSearchResult;
  @HostBinding('attr.class') cssClass = 'thumbnail';
  @Output() played = new EventEmitter<YouTubeSearchResult>();

  constructor() { }
  ngOnInit() { }

  playSong(){
    this.played.emit(this.result);
  }
}
