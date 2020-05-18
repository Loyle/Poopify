import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  playlists =[
    {
      playlistName: 'Récemment écoutées',
      nbSong: 12,
      id: 'Rec'
    },
    {
      playlistName: 'Favoris',
      nbSong: 10,
      id: 'fav'
    },
    {
      playlistName: 'Playlist 1',
      nbSong: 2,
      id: 'pl1'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
