import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingsComponent } from './settings/settings.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProfilComponent } from './profil/profil.component';


@NgModule({
imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,
    SidenavComponent,
    SettingsComponent,
    SearchBarComponent,
    ProfilComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
