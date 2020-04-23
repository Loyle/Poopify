import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  hoverBtn = false
  constructor() { }

  @Input()
  open : boolean;

  @Output()
  close = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  leaveSettings(){
    this.open = !this.open;
    this.close.emit(this.open);
  }

}
