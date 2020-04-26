import { Component, OnInit,Input , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

  hoverBtn = false;
  settingsField = "General";
  constructor() { }

  @Input()
  openSetting : boolean;
  @Input()
  darkMode : boolean;

  @Output()
  close = new EventEmitter<boolean>();
  @Output()
  themeSwap = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  leaveSettings(){
    this.close.emit(false);
  }

  changeTheme(){
    this.themeSwap.emit(!this.darkMode);
  }

  setFadeVal(){

  }
}
