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


    var pipe = new DatePipe('fr-FR');
    var http = new XMLHttpRequest();

    var params = new FormData();
    params.append('function', 'addRecent');
    params.append('name', 'Salut');
    params.append('account_id', '6');
    params.append('video_id', 'TT_RzDY_yZM');
    params.append('duration', '100');
    params.append('add_date', pipe.transform(new Date(), 'yyyy-MM-dd'));

    http.open('POST', 'https://poopify.fr/api/api.php', true);
    http.onload = function () {
      console.log(http.response);
    };
    http.send(params);
    alert(this.songName + " " + this.accountid +" "+ this.songCode);
    this.isPlay = !this.isPlay;

  }
}
