import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  playlists = [
    {
      playlistName: 'Récemment écoutées',
      id: 'Rec'
    },
    {
      playlistName: 'Favoris',
      id: 'fav'
    },
    {
      playlistName: 'Playlist 1',
      id: 'pl1'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
