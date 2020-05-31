import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output} from '@angular/core';
import {isNumeric} from 'rxjs/internal-compatibility';


@Component({
  selector: 'app-playlist-line',
  templateUrl: './playlist-line.component.html',
  styleUrls: ['./playlist-line.component.css']
})
export class PlaylistLineComponent implements  OnInit {
  @Input() playlistName: string;
  @Input() id: string;
  nbActive: number;
  content: any[];


  @Input()
  accountid;

  @Output()
  path = new EventEmitter();


  @Output()
  played = new EventEmitter<any>();

  sounds: any[];


  getPlaylistContent(){
    var http = new XMLHttpRequest();
    var params = new FormData();
    if(this.id == 'Favorite'){
      params.append('function', 'getLiked');
      params.append('account_id', this.accountid);
    }else{

      params.append('function', 'getPlaylistById');
      params.append('pl', this.id);
      params.append('user', this.accountid);
    }
    var target = this;
    target.sounds = [];
    // On connecte
    http.open('POST', 'https://poopify.fr/api/api.php', true);
    // Lorsque l'execution est terminé
    http.onload = function(){
      // On parse les résultats du Json
      var data = JSON.parse(http.response);
      // On regarde si il y a un résultat
      if (Object.keys(data).length > 0) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          target.sounds.push({bddId: element.id, songName : element.name, description: element.name,
            duration : element.duration, id : element.video_id , addDate : element.add_date, isPlay: false});
        }
      }
    };
    http.send(params);
  }
  computeNbActive(){
    let width: number;

    if (document.body)
    {
      width = (document.body.clientWidth);
    }

    if (width >= 960){
      this.nbActive = Math.trunc(width / 200 ) - 1 ;
    }else if (width > 481) {
      this.nbActive = Math.trunc(width / 200 ) ;
    }else{
      this.nbActive = Math.trunc(width / 75) - 2;
    }
  }
  songInArray(){

    this.content = [];
    let j = -1;
    for ( let i = 0; i < this.sounds.length; i++){
      if (i % this.nbActive === 0) {
        j++;
        this.content[j] = [];
        this.content[j].push(this.sounds[i]);
      }
      else {
        this.content[j].push(this.sounds[i]);
      }
    }
  }

  playSong(id){
    this.played.emit(id);
  }
   constructor() {
     this.computeNbActive();
  }

  ngOnInit(): void {
    this.getPlaylistContent();
    this.songInArray();
    }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.computeNbActive();
    this.songInArray();
  }


  goPage(path){
    if (isNumeric(path)){
      this.path.emit(Number(path));
    }else{
      this.path.emit(path);
    }

  }

}
