import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    SidenavComponent,
    SettingsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
