import { Component, OnInit, Output,Input,OnChanges, EventEmitter,SimpleChanges } from '@angular/core';
import {isNumeric} from "rxjs/internal-compatibility";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnChanges {
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

  @Input()
  activePath! : number;


  constructor() { }

  ngOnInit() {
    this.loadPlaylists();
  }

  ngOnChanges(value : SimpleChanges){
    if(typeof value.activePath.currentValue === 'number'){
      this.active = "Playlist";
    }else{
      this.active = value.activePath.currentValue;
    }
  }

  @Output()
  setting = new EventEmitter<boolean>();

  @Output()
  profil = new EventEmitter<boolean>();

  @Output()
  path = new EventEmitter();

  @Output()
  quit = new EventEmitter<boolean>();
  
  @Output() closePlayerEvent = new EventEmitter();

  openSettings(){
    this.setting.emit(true);
  }

  openProfil(){
    this.profil.emit(true);
  }

  goHome(){
    this.path.emit("Home");
  }

  goTop(){
    this.path.emit("Top");
  }

  goFav(){
    this.path.emit("Favorite");
  }

  goPlaylist(int){
    this.path.emit(Number(int));
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
      this.addNew = false;
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

  removePlaylist(playlist){
    var http = new XMLHttpRequest();

    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'deletePlaylist');
    params.append('id', playlist.id);
    // On connecte
    http.open("POST","https://poopify.fr/api/api.php",true);
    http.onload = function() {
    }
    http.send(params);

    this.loadPlaylists();
  }

    closePlayer() : void {
      this.closePlayerEvent.emit();
    }
}
