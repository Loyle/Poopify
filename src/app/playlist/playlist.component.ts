import { Component, OnChanges, OnInit,Output,EventEmitter,Input,SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnChanges {
  songliked = false;
  sounds : Array<{name : string, duration : number, id : string , addDate : Date}> = [];
  times = Array(24);
  playlistName;
  test;
  i = 0;

  @Input()
  accountid;

  @Output()
  played = new EventEmitter<any>();

  @Input()
  playlistId! :number;

  constructor() {}

  OnInit(){}

  run(){
    if(this.sounds.length != 0){
      if(this.i > this.sounds.length-1){
        this.i=0;
        this.test = this.sounds[this.i].id;
        ++this.i;
      }else{
        this.test = this.sounds[this.i].id;
        ++this.i;
      }
    }else{
      this.test = '';
    }
  }

  playSong(id){
    this.played.emit(id);
  }

  ngOnChanges(value : SimpleChanges){
    this.getPlaylistName();
    var http = new XMLHttpRequest();
    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'getPlaylistById');
    params.append('pl', value.playlistId.currentValue);
    params.append('user', this.accountid);
    console.log(value.playlistId.currentValue);
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
              target.sounds.push({name : element.name, duration : element.duration, id : element.video_id , addDate : element.add_date});
            }
        }
    }
    http.send(params);
  }

  getPlaylistName(){
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'getPlaylistByUser');
    params.append('user', this.accountid);

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
            if(data[index].id == target.playlistId){
              target.playlistName = data[index].name;
            }
          }
        }
    }
    http.send(params);
  }
}