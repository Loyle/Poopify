import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logscreen',
  templateUrl: './logscreen.component.html',
  styleUrls: ['./logscreen.component.css']
})
export class LogscreenComponent implements OnInit {

  private password = "Poopify";
  private email = "GL40";
  nameInput ='';
  bdateInput = '';
  emailInput ='';
  passInput = '';
  countryInput ='';
  logged = false;
  errorPass = false;
  errorEmail = false;
  fade = false;
  createAccount = false;

  @Output()
  authentify = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  getEmail(data){
    this.emailInput = data.target.value;
  }

  getPass(data){
    this.passInput = data.target.value;
  }

  logTest(){

    if(this.emailInput === this.email){
      this.errorEmail = false;
      if (this.passInput === this.password){
        this.logged = true;
        this.errorPass = false;
        setTimeout(() => {this.fade = true;}, 4000);
        setTimeout(() => {this.authentify.emit(true);}, 4500);
      }else{
        this.errorPass = true;
      }
    }else{
      this.errorEmail = true;
    }
  }

  newName(data){
    this.nameInput = data.target.value;
  }

  newEmail(data){
    this.emailInput = data.target.value;
  }

  newPass(data){
    this.passInput = data.target.value;
  }

  newBDate(data){
    this.bdateInput = data.target.value;
  }

  newCountry(data){
    this.countryInput = data.target.value;
  }

  createNewAccount(){
    alert("create");
  }
}
