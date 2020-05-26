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
    console.log("in");
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'getUserInfo');
    params.append('user', this.accountid);

    // Pour pouvoir acceder au this dans la sous function
    var target = this;
    // On connecte
    http.open("POST","https://poopify.fr/api/api.php",true);

    // Lorsque l'execution est terminé
    http.onload = function(){
        // On parse les résultats du Json (On peut utiliser comme ceci : data.id, data.email, data.password etc...)
        var data = JSON.parse(http.response);
        // On regarde si il y a un résultat
        if(Object.keys(data).length > 0) {
          target.name = data[0].name;
          target.birthdate = data[0].birthday;
          target.email = data[0].email;
          target.land = data[0].country;
        }
    }
    http.send(params);
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

  updateProfil(){
    if(this.allowModification){
      this.allowModification = !this.allowModification;
      var http = new XMLHttpRequest();

      // On crée les params post que l'on va envoyer
      var params = new FormData();
      params.append('function', 'updateProfil');
      params.append('name',this.name);
      params.append('birthday', pipe.transform(this.birthdate, 'yyyy-MM-dd'));
      params.append('email', this.email);
      params.append('country',this.land);
      params.append('id', this.accountid);
      // On connecte
      http.open("POST","https://poopify.fr/api/api.php",true);
      http.onload = function() {
      }
      http.send(params);
    }
    this.allowModification = !this.allowModification;
  }
}
