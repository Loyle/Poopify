import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { YouTubeSearchResult } from '../search-bar/youtube-search-result';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  times = Array(10);
  playlistAdded = false;
  playlistChoice = false;
  songliked = false;
  playlists : Array<{name : string, id : number}> = [];
  sounds : Array<{bddId : string,name : string, duration : number, id : string}> = [];

  @Input() accountid;
  @Output() played = new EventEmitter<any>();

  constructor() { }


  ngOnInit() {
    this.getTop();
    this.getPlaylist();
  }

  playSong(sound){
    this.played.emit(sound);
  }

  getTop(){
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'getTop');
    // Pour pouvoir acceder au this dans la sous function
    var target = this;
    target.sounds = [];
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
              target.sounds.push({bddId: element.id,name : element.name, id : element.video_id, duration : element.duration});
            }
        }
    }
    http.send(params);
  }

  getPlaylist(){
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
    http.send(params);
  }

  addToPlaylist(index,music){
    var pipe = new DatePipe('fr-FR');
    this.playlistAdded = true;
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'addMusicPlaylist');
    params.append('name',music.name);
    params.append('playlist_id', index);
    params.append('video_id', music.id);
    params.append('duration','100');
    params.append('add_date', pipe.transform(new Date(), 'yyyy-MM-dd'));
    // On connecte
    http.open("POST","https://poopify.fr/api/api.php",true);
    http.onload = function() {
      console.log(http.response);
    }
    http.send(params);
  }

}
