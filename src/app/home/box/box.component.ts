import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @Input() songName: string;
  @Input() description: string;
  @Input() imgURL: string;
  @Input() songCode: string;
  @Input() isPlay: boolean;


  constructor() {
    this.songName = 'Name';
    this.description = ' this is the song description, with title, author, mzoihdfozsiehdfmqoidhfoidhfomishdofhisefifezmf zeo zefzh zeçueofoe zejrjr zizezh djd )àefee  z popfes ';
    this.imgURL = 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg';
    this.songCode = null;
    this.isPlay = false;
  }

  ngOnInit(): void {
  }

  onPlayPause(){
    this.isPlay = !this.isPlay;
  }


}