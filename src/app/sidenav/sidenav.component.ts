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

  openSettings(){
    this.setting.emit(true);
  }

  openProfil(){
    this.profil.emit(true);
  }

}
