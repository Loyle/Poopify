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
    accountId = '';

    @Output()
    authentify = new EventEmitter<boolean>();

    @Output()
    accountVal = new EventEmitter();

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

        var http = new XMLHttpRequest();

        // On crée les params post que l'on va envoyer
        var params = new FormData();
        params.append('function', 'login');
        params.append('email', this.emailInput);
        params.append('pwd', this.passInput);

        // Pour pouvoir acceder au this dans la sous function
        var target = this;

        // On connecte
        http.open("POST","https://poopify.fr/api/api.php",true);

        // Lorsque l'execution est terminé
        http.onload = function() {
            // On parse les résultats du Json (On peut utiliser comme ceci : data.id, data.email, data.password etc...)
            var data = JSON.parse(http.response);

            // On regarde si il y a un résultat
            if(Object.keys(data).length > 0) {
                // Si effectivement la combinaison existe, alors on le login
                // Il faudrai stocker l'ID de l'user dans une session ?
                target.errorPass = false;

                target.logged = true;
                target.errorPass = false;
                target.accountId = data.id;
                target.accountVal.emit(target.accountId);
                setTimeout(() => {target.fade = true;}, 4000);
                setTimeout(() => {target.authentify.emit(true);}, 4500);

            }
            else {
                // Sinon, on affiche mauvais MDP
                target.errorPass = true;
            }
        }
        http.send(params);
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
        alert(this.bdateInput);
    }

    newCountry(data){
        this.countryInput = data.target.value;
    }

    createNewAccount(){
      alert("create");
      var http = new XMLHttpRequest();

      // On crée les params post que l'on va envoyer
      var params = new FormData();
      params.append('function', 'create');
      params.append('name',this.nameInput);
      params.append('email', this.emailInput);
      params.append('pwd', this.passInput);
      params.append('bdate',this.bdateInput);
      params.append('country',this.countryInput);

      // On connecte
      http.open("POST","https://poopify.fr/api/api.php",true);

      http.onload = function() {
          // On parse les résultats du Json (On peut utiliser comme ceci : data.id, data.email, data.password etc...)

          console.log(http.response);
      }

      http.send(params);
    }
}
