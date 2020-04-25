import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  songName : string;
  description:string;
  imgURL : string
  songCode: string;
  constructor() {
    this.songName = 'a song';
    this.description = ' this is the song description';
    this.imgURL = 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg'
    this.songCode = null;
  }

  ngOnInit(): void {
  }

}
