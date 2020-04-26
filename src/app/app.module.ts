import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    YouTubeSearchResultComponent
  ],
  providers: [youTubeSearchInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
