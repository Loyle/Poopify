import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {$} from 'jquery';


@Component({
  selector: 'app-playlist-line',
  templateUrl: './playlist-line.component.html',
  styleUrls: ['./playlist-line.component.css']
})
export class PlaylistLineComponent implements OnInit {
  @Input() playlistName: string;
  @Input() id: string;
  nbActive: number;
  content: any[];

  active = '';
  @Output()
  path = new EventEmitter();

  songs = [
    {
      songName : 'Name',
      description : ' this is the song description, with title, author, mzoihdfozsiehdfmqoidhfoidhfomishdofhisefifezmf zeo zefzh zeçueofoe zejrjr zizezh djd )àefee  z popfes ',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 'La dance des canards',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 'Yolo yolo yolo yolo yolo yolo yolo yolo',
      description : null,
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 'La dance des canards',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 's1',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 's2',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 's3',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 's4',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 'La dance des canards',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 'La dance des canards',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 'La dance des canards',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 'La dance des canards',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 'La dance des canards',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 'La dance des canards',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },
    {
      songName : 'La dance des canards',
      description : ' Coin coin',
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    },

  ];
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
    for ( let i = 0; i < this.songs.length; i++){
      if (i % this.nbActive === 0) {
        j++;
        this.content[j] = [];
        this.content[j].push(this.songs[i]);
      }
      else {
        this.content[j].push(this.songs[i]);
      }
    }
  }
   constructor() {
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
