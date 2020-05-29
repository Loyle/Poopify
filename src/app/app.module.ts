import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { PlaylistLineComponent } from './home/playlist-line/playlist-line.component';
import { BoxComponent } from './home/box/box.component';
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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import localeFr from '@angular/common/locales/fr';
import { TopComponent } from './top/top.component';
import { VignetteComponent } from './top/vignette/vignette.component';
registerLocaleData(localeFr, 'fr');


@NgModule({
  imports: [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  BsDropdownModule.forRoot(),
  TooltipModule.forRoot(),
  ModalModule.forRoot(),
  NgbModule
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
  PlaylistComponent,
  HomeComponent,
  PlaylistLineComponent,
  BoxComponent,
  TopComponent,
  VignetteComponent,
  ],
  providers: [
  youTubeSearchInjectables,
  { provide: LOCALE_ID, useValue: 'fr-FR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
