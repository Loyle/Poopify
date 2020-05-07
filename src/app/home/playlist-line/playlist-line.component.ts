import { Component, OnInit } from '@angular/core';
import {getWindowSizes} from "ngx-bootstrap/positioning/utils";
import {element} from "protractor";

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
    this.nbSong = 12;
  }
  ngOnInit(): void {
  }
}
