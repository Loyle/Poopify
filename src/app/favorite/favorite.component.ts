import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit, OnChanges {
  times = Array(24);
  sounds : Array<{bddId : string,name : string, duration : number, id : string , addDate : Date}> = [];
  playlistName = 'Favorite';
  test;
  i = 0;

  @Input()
  accountid;

  @Output()
  played = new EventEmitter<any>();

  @Output()
  queue = new EventEmitter<any>();

  @Input()
  playlistId! :number;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    this.updateMusic();
  }

  playSong(id){
    this.played.emit(id);
  }

  addToQueue(id){
    this.queue.emit(id);
  }

  run(){
    if(this.sounds.length != 0){
      if(this.i > this.sounds.length-1){
        this.i=0;
        this.test = this.sounds[this.i].id;
        ++this.i;
      }else{
        this.test = this.sounds[this.i].id;
        ++this.i;
      }
    }else{
      this.test = '';
    }
  }
  updateMusic(){
    var http = new XMLHttpRequest();
    // On crée les params post que l'on va envoyer
    var params = new FormData();
    params.append('function', 'getLiked');
    params.append('account_id', this.accountid);
    // Pour pouvoir acceder au this dans la sous function
    var target = this;
    // On connecte
    http.open("POST","https://poopify.fr/api/api.php",true);
    // Lorsque l'execution est terminé
    http.onload = function() {
      // On parse les résultats du Json (On peut utiliser comme ceci : data.id, data.email, data.password etc...)
      var data = JSON.parse(http.response);
      // On regarde si il y a un résultat
      if (Object.keys(data).length > 0) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          target.sounds.push({
            bddId: element.id,
            name: element.name,
            duration: element.duration,
            id: element.video_id,
            addDate: element.add_date
          });
        }
      }
    }
    http.send(params);
  }

}
