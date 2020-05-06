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
      nbSong: 12
    },
    {
      playlistName: 'Favoris',
      nbSong: 10
    },
    {
      playlistName: 'Playlist 1',
      nbSong: 2
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
