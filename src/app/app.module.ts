import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './home/home.component';
import { PlaylistLineComponent } from './home/playlist-line/playlist-line.component';
import { BoxComponent } from './home/box/box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule
  ],
    declarations: [
        AppComponent,
        HomeComponent,
        PlaylistLineComponent,
        BoxComponent,
        PlaylistLineComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
