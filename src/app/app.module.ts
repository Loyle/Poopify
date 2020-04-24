import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { YoutubeServiceInjectables } from './search-bar/youtube-search.injectable';
import { YoutubeSearchService } from './search-bar/youtube-search.service';


@NgModule({
imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    SidenavComponent,
    SettingsComponent,
    SearchBarComponent
  ],
  providers: [YoutubeSearchService,YoutubeServiceInjectables],
  bootstrap: [AppComponent]
})
export class AppModule { }
