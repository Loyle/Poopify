import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNumber} from "@ng-bootstrap/ng-bootstrap/util/util";
import {isNumeric} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input()
  accountid;

  @Output()
  path = new EventEmitter();

  @Output()
  played = new EventEmitter<any>();

  playlists: Array<{id: string, playlistName }> = [];
  constructor() {  }

  ngOnInit(): void {
    this.getPlaylist();
  }
  getPlaylist(){
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'getPlaylistByUser');
    params.append('user', this.accountid);

    var target = this;
    target.playlists = [];
    http.open("POST","https://poopify.fr/api/api.php",true);
    http.onload =function(){
      var data = JSON.parse(http.response);
      if (Object.keys(data).length > 0){
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          target.playlists.push({id: element.id, playlistName: element.name});
        }
      }
    };
    http.send(params);
  }

  playSong(id){
    this.played.emit(id);
  }

  goPage(path){
    if(isNumeric(path)){
      this.path.emit(Number(path));
    }else{
      this.path.emit(path);

    }
  }
}
