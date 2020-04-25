import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-logscreen',
  templateUrl: './logscreen.component.html',
  styleUrls: ['./logscreen.component.css']
})
export class LogscreenComponent implements OnInit {

  private password = "Poopify";
  private email = "GL40";
  emailInput ='';
  passInput = '';
  logged = false;
  error = false;
  fade = false;

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

    if(this.emailInput === this.email && this.passInput === this.password){
      this.logged = true;
      setTimeout(() => {this.fade = true;}, 4000);
    }else{
      this.error = true;
    }
  }
}
