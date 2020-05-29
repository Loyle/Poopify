import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  songliked = false;
  sounds : Array<{bddId : string,name : string, duration : number, id : string , addDate : Date}> = [];
  playlistName;
  test;
  i = 0;

  @Input()
  accountid;

  @Input()
  sound;

  @Output()
  played = new EventEmitter<any>();

  @Input()
  playlistId! :number;

  constructor() {}

  ngOnInit(): void{}


  playSong(id){
    this.played.emit(id);
  }

  updateMusic(val){
    var http = new XMLHttpRequest();
    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'getPlaylistById');
    params.append('pl', val);
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
              const element = data[index];
              target.sounds.push({bddId: element.id,name : element.name, duration : element.duration, id : element.video_id , addDate : element.add_date});
            }
        }
    }
    http.send(params);
  }

  removeMusic(sound){
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'deleteMusicFromPlaylist');
    params.append('id', sound.bddId);
    // On connecte
    http.open("POST","https://poopify.fr/api/api.php",true);
    http.onload = function() {
    }
    http.send(params);
  }
}
