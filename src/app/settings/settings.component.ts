import { Component, OnInit,Input , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

  hoverBtn = false;
  settingsField = "General";
  fadeoutVal;
  themeVal;
  errorFade = false;
  constructor() { }

  @Input()
  openSetting : boolean;
  @Input()
  darkMode : boolean;
  @Input()
  accountid;

  @Output()
  close = new EventEmitter<boolean>();
  @Output()
  themeSwap = new EventEmitter<boolean>();

  ngOnInit(): void {
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
          target.fadeoutVal = data[0].fadeout;
        }
    }
    http.send(params);
  }

  leaveSettings(){
    this.close.emit(false);
  }

  changeTheme(){
    this.themeSwap.emit(!this.darkMode);
    if(this.darkMode){
      this.themeVal = 0;
    }else{
      this.themeVal = 1;
    }
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'updateDarkmode');
    params.append('darkmode',this.themeVal);
    params.append('id', this.accountid);
    // On connecte
    http.open("POST","https://poopify.fr/api/api.php",true);
    http.onload = function() {
    }
    http.send(params);
  }

  setFadeVal(data){
    this.errorFade = false;
    if(Number(data.target.value) < 20){
      this.fadeoutVal = data.target.value;
      var http = new XMLHttpRequest();

      // On crée les params post que l'on va envoyer
      var params = new FormData();
      params.append('function', 'updateFadeout');
      params.append('fadeout',data.target.value);
      params.append('id', this.accountid);
      // On connecte
      http.open("POST","https://poopify.fr/api/api.php",true);
      http.onload = function() {
      }
      http.send(params);
    }else{
      this.errorFade = true;
    }
  }
}
