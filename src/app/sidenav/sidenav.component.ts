import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  active = 'Home';
  dropdownenable = false;
  toggleSettings = false;

  constructor() { }

  ngOnInit(): void {
  }

  openSettings(){
    this.toggleSettings = true;
  }

  closeSettings(event){
    this.toggleSettings = event;
  }
}
