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

  @Output()
  update = new EventEmitter<any>();

  @Input()
  playlistId :number;

  constructor() {}

  ngOnInit(): void{}


  playSong(id){
    this.played.emit(id);
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
    console.log(this.playlistId);
    this.update.emit(this.playlistId);
  }
}
