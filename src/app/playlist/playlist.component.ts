import { Component, OnChanges, OnInit,Input,SimpleChanges } from '@angular/core';

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

  @Input()
  accountid;

  @Input()
  playlistId! :number;

  constructor() {}

  OnInit(){}

  ngOnChanges(value : SimpleChanges){
    console.log("in");
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
        console.log(data);
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
          target.playlistName = data[target.playlistId-1].name;
        }
    }
    http.send(params);
  }
}
