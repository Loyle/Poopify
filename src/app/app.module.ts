import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfilComponent } from './profil/profil.component';
import { LogscreenComponent } from './logscreen/logscreen.component';

import { FormsModule } from '@angular/forms';
import { youTubeSearchInjectables } from './search-bar/youtube-search-injectables';
import { YouTubeSearchResultComponent } from './search-bar/youtube-search-result.component';
import { PlaylistComponent } from './playlist/playlist.component';


@NgModule({
imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    SidenavComponent,
    SettingsComponent,
    SearchBarComponent,
    ProfilComponent,
    LogscreenComponent,
    YouTubeSearchResultComponent,
    PlaylistComponent
  ],
  providers: [youTubeSearchInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
