import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  active = 'Home';
  dropdownenable = false;
  toggleNewPlaylist = false;
  addNew = false;
  newPlaylist = '';
  private = false;
  isPrivate;
  errorName = false;
  playlists : Array<{name : string, id : number}> = [];
  width;

  @Input()
  accountid;

  constructor() { }

  ngOnInit() {
    this.loadPlaylists();
  }

  @Output()
  setting = new EventEmitter<boolean>();

  @Output()
  profil = new EventEmitter<boolean>();

  @Output()
  path = new EventEmitter();

  @Output()
  quit = new EventEmitter<boolean>();

  openSettings(){
    this.setting.emit(true);
  }

  openProfil(){
    this.profil.emit(true);
  }

  goHome(){
    this.path.emit("Home");
    this.active = "Home";
  }

  goTop(){
    this.path.emit("Top");
    this.active = "Top";
  }

  goFav(){
    this.path.emit("Fav");
    this.active = "Favorite";
  }

  goPlaylist(int){
    this.path.emit(Number(int));
    this.active = "Playlist";
    this.toggleNewPlaylist = false;
    this.dropdownenable = false;
  }

  logout(){
    this.quit.emit(true);
  }

  getPlaylistName(data){
    this.newPlaylist = data.target.value;
  }

  playlist(){
    this.width = window.innerWidth;
    if(this.width < 576){
      this.toggleNewPlaylist = true;
    }
  }

  quitter(){
    this.addNew = false;
    this.toggleNewPlaylist = false;
  }

  changePrivacy(){
    this.private = !this.private;
    if(this.private){
      this.isPrivate = '1';
    }else{
      this.isPrivate = '0';
    }
  }

  addPlaylist(){
    if(this.newPlaylist == ''){
      this.errorName = true;
    }else{
      var http = new XMLHttpRequest();

      // On crée les params post que l'on va envoyer
      var params = new FormData();
      params.append('function', 'addPlaylist');
      params.append('name',this.newPlaylist);
      params.append('account_id', this.accountid);
      params.append('private', this.isPrivate);

      // On connecte
      http.open("POST","https://poopify.fr/api/api.php",true);

      http.onload = function() {}

      http.send(params);

      this.loadPlaylists();

      this.toggleNewPlaylist = false;
      this.newPlaylist = '';
      this.isPrivate = '0';
      this.private = false;
      this.addNew = false;

    }
  }


  loadPlaylists() {
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'getPlaylistByUser');
    params.append('user', this.accountid);

    // Pour pouvoir acceder au this dans la sous function
    var target = this;
    target.playlists = [];
    // On connecte
    http.open("POST","https://poopify.fr/api/api.php",true);

    // Lorsque l'execution est terminé
    http.onload = function(){
      // On parse les résultats du Json (On peut utiliser comme ceci : data.id, data.email, data.password etc...)
      var data = JSON.parse(http.response);
      // On regarde si il y a un résultat
      if(Object.keys(data).length > 0) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          target.playlists.push({name : element.name, id : element.id});
        }
      }
    }
    http.send(params);
  }
}
