import { Component, OnInit, ViewChild  } from '@angular/core';
import { YouTubeSearchResult } from './search-bar/youtube-search-result';
import { PlayerBarComponent } from './player-bar/player-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Poopify';
  toggleSettings = false;
  toggleProfil = false;
  themedark = true;
  logged = false;
  loading: boolean;
  error: boolean;
  results: YouTubeSearchResult[];
  loadResults = false;
  path ="Home";
  accountid = '';
  switch = false;

  constructor() { }

  ngOnInit() {}

  openSettings(event){
    this.toggleSettings = event;
  }

  closeSettings(event){
    this.toggleSettings = event;
  }

  openProfil(event){
    this.toggleProfil = event;
  }

  closeProfil(event){
    this.toggleProfil = event;
  }

  changeTheme(event){
    this.themedark = event;
    if (event){
      document.documentElement.style.setProperty('--bg-primary','var(--dark-theme-primary)');
      document.documentElement.style.setProperty('--bg-secondary','var(--dark-theme-secondary)');
      document.documentElement.style.setProperty('--text-color','var(--dark-theme-text)');
      document.documentElement.style.setProperty('--hover','var(--dark-theme-hover)');
    }else{
      document.documentElement.style.setProperty('--bg-primary','var(--light-theme-primary)');
      document.documentElement.style.setProperty('--bg-secondary','var(--light-theme-secondary)');
      document.documentElement.style.setProperty('--text-color','var(--light-theme-text)');
      document.documentElement.style.setProperty('--hover','var(--light-theme-hover)');
    }
  }

  updateResults(results: YouTubeSearchResult[]): void {
    this.results = results;
    this.loadResults = true;
  }

  @ViewChild(PlayerBarComponent ) playerBar: PlayerBarComponent ;
  playSong(song){
    this.playerBar.playMusic(song.id,true);
  }

  openPage(path){
    this.loadResults=false;
    this.path = path;
  }

  logUser(){
    this.logged = true;
    setTimeout(() => {this.switch = true}, 500);
  }

  getAccountId(ev){
    this.accountid = ev;
  }

  isNumber(path){
    return typeof path === 'number'; 
  }
}
