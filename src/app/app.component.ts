import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Poopify';
  toggleSettings = false;
  ngOnInit() {}

  openSettings(event){
    this.toggleSettings = event;
  }

  closeSettings(event){
    this.toggleSettings = event;
  }
}
