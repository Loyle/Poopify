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

  name = "Théau Zatti";
  birthdate = '08/05/1999';
  email = "theau.zatti@gmail.com";
  land = "France";
  allowModification = false;
  constructor() { }

  ngOnInit(): void {
  }

  leaveSettings(){
    this.close.emit(false);
  }

  nameChange(data){
    this.name = data.target.value;
    alert(this.name);
  }

  dateChange(data){
    this.birthdate = data.target.value;
  }

  mailChange(data){
    this.email = data.target.value;
  }

  landChange(data){
    this.land = data.target.value;
  }
}
