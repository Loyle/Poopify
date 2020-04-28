import { Component, OnInit } from '@angular/core';
import { YouTubeSearchResult } from './search-bar/youtube-search-result';

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
  logged = true;
  loading: boolean;
  error: boolean;
  results: YouTubeSearchResult[];
  loadResults = false;

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

  playSong(song){
    alert(song.id);
  }

  openPage(path){
    this.loadResults=false;
    alert(path);
  }
}
