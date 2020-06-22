import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  @Input() songName: string;
  @Input() description: string;
  @Input() songCode: string;
  @Input() accountid: string;
  @Input() isPlay: boolean;

  @Output()
  played = new EventEmitter<any>();

  @Input()
  sound;

  constructor() {
  }

  ngOnInit(): void {

  }


  playSong(id){

    this.played.emit(id);


    this.isPlay = !this.isPlay;

  }


}
