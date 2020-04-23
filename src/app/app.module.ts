import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PlayerBarComponent } from './player-bar/player-bar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchBarComponent } from './search-bar/search-bar.component';


@NgModule({
imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    PlayerBarComponent
    SidenavComponent,
    SettingsComponent,
    SearchBarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
