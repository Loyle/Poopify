import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {$} from 'jquery';


@Component({
  selector: 'app-playlist-line',
  templateUrl: './playlist-line.component.html',
  styleUrls: ['./playlist-line.component.css']
})
export class PlaylistLineComponent implements OnInit, OnChanges {
  @Input() playlistName: string;
  @Input() id: string;
  nbActive: number;
  content: any[];

  @Input()
  accountid;

  sounds: Array<{bddId: string, songName: string, description: string, duration: number, id: string , addDate: Date , isPlay: false}>;

  ngOnChanges(value: SimpleChanges) {
    this.getPlaylistContent(value.playlistId.currentValue);
  }

  getPlaylistContent(val){
    var http = new XMLHttpRequest();
    var params = new FormData();
    params.append('function', 'getPlaylistById');
    params.append('pl', val);
    params.append('user', this.accountid);
    var target = this;
    target.sounds = [];
    // On connecte
    http.open('POST', 'https://poopify.fr/api/api.php', true);
    // Lorsque l'execution est terminé
    http.onload = function(){
      // On parse les résultats du Json (On peut utiliser comme ceci : data.id, data.email, data.password etc...)
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
    this.content.push({
      songName : 'La dance des canards',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    });
  }
   constructor() {
    this.getPlaylistContent(this.id);
    this.computeNbActive();
    this.songInArray();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
   this.computeNbActive();
   this.songInArray();
  }
  ngOnInit(): void {
  }
}
