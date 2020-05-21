import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-playlist-line',
  templateUrl: './playlist-line.component.html',
  styleUrls: ['./playlist-line.component.css']
})
export class PlaylistLineComponent implements OnInit {
  @Input() playlistName: string;
  @Input() id: string;
  nbActive: number;


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

   constructor() {
     let width: number;

     if (document.body)
     {
       width = (document.body.clientWidth);
     }

     if (width >= 960){
        this.nbActive = Math.trunc(width / 200 )  ;
     }else if (width <= 959){
       this.nbActive = width / 100;
     }
  }

  ngOnInit(): void {
  }
}
