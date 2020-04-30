import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      const windowScroll = window.pageYOffset;
      if(windowScroll >= document.getElementsByClassName('title').offsetTop()){
        alert('stick');
      } else {
        alert('notstick');
      }
    }

}
