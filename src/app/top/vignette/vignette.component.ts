import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vignette',
  templateUrl: './vignette.component.html',
  styleUrls: ['./vignette.component.css']
})
export class VignetteComponent implements OnInit {

  playlistAdded = false;
  playlistChoice = false;
  songliked = false;
  playlists : Array<{name : string, id : number}> = [];

  @Input() accountid;
  @Input() sound;
  @Output() played = new EventEmitter<any>();
  @Output() queue = new EventEmitter<any>();

  constructor() { }


  ngOnInit() {
    this.getPlaylist();
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
              if(target.sound.id === element.video_id){
                target.songliked = true;
              }
            }
        }
    }
    http.send(params);
  }

  playSong(sound){
    this.played.emit(sound);
  }

  addToQueue(sound){
    this.queue.emit(sound);
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
      params.append('name',music.name);
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
