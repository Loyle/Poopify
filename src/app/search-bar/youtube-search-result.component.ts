import { Component, OnInit, Input, HostBinding, EventEmitter, Output} from '@angular/core';
import { DatePipe } from '@angular/common';
import { YouTubeSearchResult } from './youtube-search-result';

@Component({
  selector: 'app-youtube-search-result',
  styleUrls: ['./youtube-search-result.component.css'],
  template: `
    <div class="d-sm-flex d-none align-items-center justify-content-center">
      <img class="minia rounded-lg img-fluid shadow-lg" src="https://img.youtube.com/vi/{{result.id}}/0.jpg"/>
    </div>
    <div class="caption d-flex align-items-center w-100 pl-sm-3 py-sm-0 py-2">
    <div class="row w-100">
      <div class="col-md-6 col-7 pl-4 d-flex align-items-center justify-content-sm-start justify-content-center">
        <h3 class="d-lg-block d-none m-0">{{ result.title }}</h3>
        <h5 class="d-lg-none d-block m-0">{{ result.title }}</h5>
      </div>
      <div class="col-md-6 col-5 p-0 d-flex align-items-center justify-content-end">
        <div class="m-md-3 m-1">
          <svg class="bi bi-play" width="5vh" height="5vh" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" (click)="playSong()">
            <path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 010 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="m-md-3 m-1">
          <ng-template *ngIf="playlistAdded ; then added else notadded"></ng-template>
          <ng-template #added>
            <svg class="bi bi-folder-check" width="5vh" height="5vh" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M15.854 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 01.708-.708l1.146 1.147 2.646-2.647a.5.5 0 01.708 0z" clip-rule="evenodd"/>
              </svg>
          </ng-template>
          <ng-template #notadded>
            <svg class="bi bi-folder-plus" width="5vh" height="5vh" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" (mouseenter)="playlistChoice=true" (mouseleave)="playlistChoice=false">
              <path fill-rule="evenodd" d="M9.828 4H2.19a1 1 0 00-.996 1.09l.637 7a1 1 0 00.995.91H9v1H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3h3.982a2 2 0 011.992 2.181L15.546 8H14.54l.265-2.91A1 1 0 0013.81 4H9.828zm-2.95-1.707L7.587 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 011-.98h3.672a1 1 0 01.707.293z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M13.5 10a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13v-1.5a.5.5 0 01.5-.5z" clip-rule="evenodd"/>
              <path fill-rule="evenodd" d="M13 12.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z" clip-rule="evenodd"/>
            </svg>
            <div class="choice rounded" [ngClass]="playlistChoice ? 'd-block' : 'd-none'" (mouseenter)="playlistChoice=true"(mouseleave)="playlistChoice=false">
              <div *ngFor="let playlist of playlists; index as i" class="text-center py-2 playlistBtn" (click)="addToPlaylist(playlist.id)">{{playlist.name}}</div>
            </div>
          </ng-template>
        </div>
        <div class="m-md-3 m-1">
          <ng-template *ngIf="songliked ; then liked else notliked"></ng-template>
          <ng-template #liked>
            <svg class="bi bi-heart-fill" width="5vh" height="5vh" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" (click)="switchLike(result)">
              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" clip-rule="evenodd"/>
            </svg>
          </ng-template>
          <ng-template #notliked>
            <svg class="bi bi-heart" width="5vh" height="5vh" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" (click)="switchLike(result)">
              <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>
            </svg>
          </ng-template>
        </div>
        <div class="m-md-3 m-1">
          <svg class="bi bi-plus" width="6vh" height="6vh" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" (click)="addToQueue()">
            <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"/>
            <path fill-rule="evenodd" d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"/>
          </svg>
        </div>
      </div>
    </div>
  `
})
export class YouTubeSearchResultComponent implements OnInit {

  playlistAdded = false;
  playlistChoice = false;
  songliked = false;
  playlists : Array<{name : string, id : number}> = [];

  @Input() result: YouTubeSearchResult;
  @Input() accountid;
  @HostBinding('attr.class') cssClass = 'thumbnail ml-sm-5 my-sm-5 my-3 rounded-lg';
  @Output() played = new EventEmitter<YouTubeSearchResult>();
  @Output() queue = new EventEmitter<YouTubeSearchResult>();

  constructor() { }


  ngOnInit() {
    this.checkIfLiked();
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'getPlaylistByUser');
    params.append('user', this.accountid);

    // Pour pouvoir acceder au this dans la sous function
    var target = this;
    target.playlists = [];
    // On connecte
    http.open("POST","https://poopify.fr/api/api.php",true);

    // Lorsque l'execution est terminé
    http.onload = function(){
        // On parse les résultats du Json (On peut utiliser comme ceci : data.id, data.email, data.password etc...)
        var data = JSON.parse(http.response);
        // On regarde si il y a un résultat
        if(Object.keys(data).length > 0) {
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              target.playlists.push({name : element.name, id : element.id});
            }
        }
    }
    http.send(params); }

  checkIfLiked(){
    var http = new XMLHttpRequest();
    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'getLiked');
    params.append('account_id', this.accountid);
    // Pour pouvoir acceder au this dans la sous function
    var target = this;
    // On connecte
    http.open("POST","https://poopify.fr/api/api.php",true);
    // Lorsque l'execution est terminé
    http.onload = function(){
        // On parse les résultats du Json (On peut utiliser comme ceci : data.id, data.email, data.password etc...)
        var data = JSON.parse(http.response);
        // On regarde si il y a un résultat
        if(Object.keys(data).length > 0) {
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              if(target.result.id === element.video_id){
                target.songliked = true;
              }
            }
        }
    }
    http.send(params);
  }

  playSong(id){
    var pl : string[] = [];
    this.played.emit(this.result);
  }

  addToQueue(){
    this.queue.emit(this.result);
  }

  addToPlaylist(index){
    var pipe = new DatePipe('fr-FR');
    this.playlistAdded = true;
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'addMusicPlaylist');
    params.append('name',this.result.title);
    params.append('playlist_id', index);
    params.append('video_id', this.result.id);
    params.append('duration','100');
    params.append('add_date', pipe.transform(new Date(), 'yyyy-MM-dd'));
    // On connecte
    http.open("POST","https://poopify.fr/api/api.php",true);
    http.onload = function() {
      console.log(http.response);
    }
    http.send(params);
  }

  switchLike(music){
    if(this.songliked == false){
      var pipe = new DatePipe('fr-FR');
      this.songliked = true;
      var http = new XMLHttpRequest();

      // On crée les params post que l'on va envoyer
      var params = new FormData();
      params.append('function', 'addLiked');
      params.append('name',music.title);
      params.append('account_id', this.accountid);
      params.append('video_id', music.id);
      params.append('duration','100');
      params.append('add_date', pipe.transform(new Date(), 'yyyy-MM-dd'));
      // On connecte
      http.open("POST","https://poopify.fr/api/api.php",true);
      http.onload = function() {
        console.log(http.response);
      }
      http.send(params);
    }else{
      this.songliked = false;
      var http = new XMLHttpRequest();

      // On crée les params post que l'on va envoyer
      var params = new FormData();
      params.append('function', 'removeLiked');
      params.append('account_id', this.accountid);
      params.append('video_id', music.id);
      // On connecte
      http.open("POST","https://poopify.fr/api/api.php",true);
      http.onload = function() {
      }
      http.send(params);
    }
  }
}
