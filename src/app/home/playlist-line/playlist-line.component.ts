import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playlist-line',
  templateUrl: './playlist-line.component.html',
  styleUrls: ['./playlist-line.component.css']
})
export class PlaylistLineComponent implements OnInit {
  playlistName: string;
  nbSong: number;

  constructor() {
    this.playlistName = "Playlist Name";
  }
  ngOnInit(): void {
  }

}
