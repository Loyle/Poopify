import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PlayerBarComponent } from './player-bar/player-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfilComponent } from './profil/profil.component';
import { LogscreenComponent } from './logscreen/logscreen.component';

import { FormsModule } from '@angular/forms';
import { youTubeSearchInjectables } from './search-bar/youtube-search-injectables';
import { YouTubeSearchResultComponent } from './search-bar/youtube-search-result.component';
import { PlaylistComponent } from './playlist/playlist.component';

import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr');


@NgModule({
  imports: [
  BrowserModule,
  FormsModule,
  HttpClientModule
  ],
  declarations: [
  AppComponent,
  PlayerBarComponent,
  SidenavComponent,
  SettingsComponent,
  SearchBarComponent,
  ProfilComponent,
  LogscreenComponent,
  YouTubeSearchResultComponent,
  PlaylistComponent
  ],
  providers: [
  youTubeSearchInjectables,
  { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
