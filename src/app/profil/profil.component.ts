import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  @Input()
  openProfil : boolean;

  @Input()
  accountid;

  @Output()
  close = new EventEmitter<boolean>();

  name = "";
  birthdate = '';
  email = "";
  land = "";
  allowModification = false;
  constructor() { }

  ngOnInit(): void {
  }

  leaveSettings(){
    this.allowModification=false;
    this.close.emit(false);
  }

  nameChange(data){
    this.name = data.target.value;
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
