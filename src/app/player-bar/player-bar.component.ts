import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-bar',
  templateUrl: './player-bar.component.html',
  styleUrls: ['./player-bar.component.css']
})
export class PlayerBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  previousMusic() : void {
  	alert("Previous");
  }
  playPauseMusic() : void {
  	alert("Play pause");
  }
  nextMusic() : void {
  	alert("Next");
  }

}
