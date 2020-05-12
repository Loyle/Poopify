import {Component, Input, OnInit} from '@angular/core';
import {getWindowSizes} from "ngx-bootstrap/positioning/utils";
import {element} from "protractor";

@Component({
  selector: 'app-playlist-line',
  templateUrl: './playlist-line.component.html',
  styleUrls: ['./playlist-line.component.css']
})
export class PlaylistLineComponent implements OnInit {
  @Input() playlistName: string;
  @Input() nbSong: number;


  songs=[
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
      songName : 'Yolo',
      description : null,
      imgURL : 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg',
      songCode : null,
      isPlay : false,
    }

  ]

   constructor() {
  }
  ngOnInit(): void {
  }
}
