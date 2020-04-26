import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  active = 'Home';
  dropdownenable = false;

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  setting = new EventEmitter<boolean>();

  @Output()
  profil = new EventEmitter<boolean>();

  @Output()
  path = new EventEmitter<string>();

  @Output()
  quit = new EventEmitter<boolean>();

  openSettings(){
    this.setting.emit(true);
  }

  openProfil(){
    this.profil.emit(true);
  }

  goHome(){
    this.path.emit("Home");
    this.active = "Home";
  }

  goTop(){
    this.path.emit("Top");
    this.active = "Top";
  }

  goFav(){
    this.path.emit("Fav");
    this.active = "Fav";
  }

  goPlaylist(int){
    this.path.emit("Playlist"+int);
    this.active = "Playlist";
  }

  logout(){
    this.quit.emit(true);
  }

}
