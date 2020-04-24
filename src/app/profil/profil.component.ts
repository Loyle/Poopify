import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  @Input()
  openProfil : boolean;

  @Output()
  close = new EventEmitter<boolean>();

  firstname = "Théau";
  lastname = "Zatti";
  birthdate = '08/05/1999';
  email = "theau.zatti@gmail.com";
  land = "France";
  constructor() { }

  ngOnInit(): void {
  }

  leaveSettings(){
    this.close.emit(false);
  }
}
