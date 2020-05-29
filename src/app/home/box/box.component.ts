import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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

  @Output()
  played = new EventEmitter<any>();

  @Input()
  sound;

  constructor() {
  }

  ngOnInit(): void {
    this.imgURL = 'https://scx1.b-cdn.net/csz/news/800/2016/578650fe544c4.jpg';
  }


  playSong(id){

    this.played.emit(id);
    this.isPlay = !this.isPlay;

  }
}
