import {Component, OnInit, HostListener, Input} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
	selector: 'app-player-bar',
	templateUrl: './player-bar.component.html',
	styleUrls: ['./player-bar.component.css']
})
export class PlayerBarComponent implements OnInit {

	public YT: any;
	public videoID = "VPRjCeoBqrI";

	public player: any;
	public playerPassiv : any;
	public player1: any;
	public player2: any;
	public actualPlayer;

	public isPlaying = false;
	public isFading = false;
	public fading : any;

	public fadeOut = 10;
	public duration = 0;
	public currentTime = 0;

	public isMusicLoaded = false;
	public volume = 100;

	public firstPlay = true;

	public musicTitle = "";
	public thumbnail = "";

	public playlist : string[] = [];
	public playlistPos = 0;
	public waitingList : string[] = [];

	public listened : string[] = [];

	public playerReady : boolean = false;

	public isMobile : boolean = false;
	public activePlayer : boolean = false;

	nbRecent: number;
	@Input()
	accountid;

	constructor() { }
	init() {
		var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	ngOnInit(): void {
		if(window.innerWidth <= 576) {
			this.isMobile = true;
		}


		this.init();
		this.initTestPlaylist();

		window['onYouTubeIframeAPIReady'] = (e) => {
			this.YT = window['YT'];
			this.player1 = new window['YT'].Player('player1', {
				height: '0',
				width: '0',
				suggestedQuality: "hd720",
				events: {
					'onStateChange': this.onPlayerStateChange,
					'onError': this.onPlayerError,
					'onReady': this.onPlayer1Ready(this)
				}
			});

			this.player2 = new window['YT'].Player('player2', {
				height: '0',
				width: '0',
				suggestedQuality: "hd720",
				events: {
					'onStateChange': this.onPlayerStateChange,
					'onError': this.onPlayerError,
					'onReady': this.onPlayer2Ready(this)
				}
			});
		}

		this.player = this.player1;
		this.playerPassiv = this.player2;
		this.actualPlayer = 1;
	}

	previousMusic() : void {
		// On stop si il y avait un fadeOut
		this.isFading = false;
		clearInterval(this.fading);
		this.player1.setVolume(this.volume);
		this.player2.setVolume(this.volume);

		if(this.currentTime > 2) {
			// On remet au debut
			this.player.seekTo(0);
		}
		else {
			// On charge la musique precedente
			if(this.playlistPos > 0) {
				this.playlistPos--;
				this.videoID = this.playlist[this.playlistPos];
				this.loadMusic();
				this.preloadNext();
				this.isMusicLoaded = false;
				this.isPlaying = true;
			}
			else {
				console.log("[PLAYLIST] Playlist is already at the beginning");
				this.player.seekTo(0);
			}

		}
	}
	playMusic(videoID, autoplay = true) : void {
		this.videoID = videoID;
		this.loadMusic(autoplay);
		this.preloadNext();
		this.isMusicLoaded = false;
		this.isPlaying = true;

		if(this.firstPlay) {
			this.firstPlay = false;
			setInterval(() => {
				if(!this.isMusicLoaded) {
					if(this.player.getDuration() > 0) {
						this.loadMusicData();
						/** update Recent content **/
						this.getNbRecent();
						if(this.nbRecent < 10){
							this.addRecent(this.videoID);
						}else{
							this.getOlderRecent();
							this.addRecent(this.videoID);
						}
					}
				}
				else {
					this.checkPlayerStatus();
				}
			}, 100);
		}

	}
	playPauseMusic(autoplay = true) : void {
		if(this.isPlaying) {
			this.pauseAllVideo();
		}
		else {
			if(this.duration == 0) { // Si la musique est pas load (duration == 0) on la load
				this.playMusic(this.videoID, autoplay);
				return;
			}

			if(this.isFading)
				this.playAllVideo();
			else
				this.player.playVideo();
		}
		this.isPlaying = !this.isPlaying;
	}
	nextMusic() : void {
		this.listened.push(this.videoID);

		// On stop si il y avait un fadeOut
		this.isFading = false;
		clearInterval(this.fading);
		this.player1.setVolume(this.volume);
		this.player2.setVolume(this.volume);
		this.playlistPos++;

		if(this.playlist.length > this.playlistPos || this.waitingList.length > 0) {
			this.pauseAllVideo();
			this.switchPlayers();
			this.player.playVideo();

			if(this.waitingList.length > 0) {
				this.playlistPos--;
				this.videoID = this.waitingList[0];
				this.waitingList.shift();
			}
			else {
				this.videoID = this.playlist[this.playlistPos];
			}

			this.preloadNext();
			this.isMusicLoaded = false;
			this.isPlaying = true;
		}
		else
			console.log("[PLAYLIST] Playlist is ended");
	}
	volumeChanged(value) : void {
		this.player1.setVolume(value);
		this.player2.setVolume(value);
		this.volume = value;
	}
	timeChanged(value) : void {
		this.player.seekTo(value / 1000,true);
		this.checkPlayerStatus();
	}

	loadMusic(autoplay = true) : void {
		this.getActualPlayer();
		this.player.loadVideoByUrl("http://www.youtube.com/v/" + this.videoID + "?version=3&autoplay="+((this.isPlaying && autoplay) ? "1" :"0") ,0 ,"hd720");
	}

	preloadNext() : void {
		if(this.playlist.length > this.playlistPos + 1 || this.waitingList.length > 0) {
			if(this.waitingList.length > 0) {
				var url : string = "http://www.youtube.com/v/" + this.waitingList[0] + "?version=3&autoplay=0";
			}
			else {
				var url : string = "http://www.youtube.com/v/" + this.playlist[this.playlistPos + 1] + "?version=3&autoplay=0";
			}
			this.playerPassiv.stopVideo();
			this.playerPassiv.loadVideoByUrl(url,0,"hd720");
			this.playerPassiv.pauseVideo();
		}
	}

	getActualPlayer() : void {
		if(this.actualPlayer == 1) {
			this.player = this.player1;
			this.playerPassiv = this.player2;
		}
		else {
			this.player = this.player2;
			this.playerPassiv = this.player1;
		}
	}

	switchPlayers() : void {
		if(this.actualPlayer == 1)
			this.actualPlayer = 2;
		else
			this.actualPlayer = 1;

		this.getActualPlayer();
	}

	doFadeOut() : void {
		this.switchPlayers();
		this.player.playVideo();
		this.isMusicLoaded = false;
		if(this.fadeOut > 0) {
			this.isFading = true;

			var upVolume = 0;
			var downVolume = this.volume;
			this.fading = setInterval(() => {
				if(this.isPlaying) {
					this.playerPassiv.setVolume(downVolume);
					this.player.setVolume(upVolume);

					upVolume++;
					downVolume--;

					if(upVolume - 1 > this.volume) {
						this.isFading = false;
						clearInterval(this.fading);
						this.preloadNext();
					}
				}
			}, (1000 * this.fadeOut) / this.volume );
		}
		else {
			this.preloadNext();
		}
	}

	checkPlayerStatus() : void {
		this.currentTime = this.player.getCurrentTime();
		this.duration = this.player.getDuration();
		if(this.duration - this.currentTime <= this.fadeOut) {
			if(this.isFading == true) {
				// Il y a deja un fadout en cours !!
				this.isFading = false;
				clearInterval(this.fading);
				this.preloadNext();
			}

			if(this.waitingList.length > 0) {
				this.videoID = this.waitingList[0];
				this.waitingList.shift();
			}
			else {
				this.playlistPos++;
				this.videoID = this.playlist[this.playlistPos];
			}
			this.doFadeOut();
		}
	}

	loadMusicData() : void {
		this.musicTitle = this.player.getVideoData().title;
		this.thumbnail = "https://img.youtube.com/vi/"+ this.videoID +"/0.jpg"
		this.isMusicLoaded = true;
	}

	pauseAllVideo() {
		this.player1.pauseVideo();
		this.player2.pauseVideo();
	}
	playAllVideo() {
		this.player1.playVideo();
		this.player2.playVideo();
	}

	onPlayerStateChange(event) {
		console.log("Player status changed");
		console.log(event.data);
	}

	onPlayerError(event) {
		alert("Error lecture");
	}
	onPlayer1Ready(t) {
		/*console.log("Player1 is ready");
		t.player = t.player1;
		t.actualPlayer = 1;*/

	}
	onPlayer2Ready(t) {
		/*console.log("Player2 is ready");
		t.playerPassiv = t.player2;
		t.playPauseMusic(this.playlist[0],false);*/
	}

	@HostListener('document:keypress', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if(event.key == " ") {
			//this.playPauseMusic(true);
		}
	}

	setPlaylist(playlist) : void {
		this.playlist = playlist;
	}

	addToPlaylist(videoID : string) : void {
		this.playlist.push(videoID);
	}

	addToWaitingList(videoID : string) : void {
		this.waitingList.push(videoID);
	}


	initTestPlaylist() {
		this.addToWaitingList("Uus8_DP1Fhg");

		this.addToPlaylist("VPRjCeoBqrI");
		this.addToPlaylist("du_urI33fuE");
		this.addToPlaylist("Vujit_MkMt8");
		this.addToPlaylist("K-865CiZKKE");
		this.addToPlaylist("kiEJvdiA4yc");
		this.addToPlaylist("CXBdq6YOv_c");
		this.addToPlaylist("PGE7RG7wwTc");
		this.addToPlaylist("p3l7fgvrEKM");
		this.addToPlaylist("iRA82xLsb_w");
	}

	setPlayerActive(value : boolean) {
		if(this.isMobile) {
			this.activePlayer = value;
		}
	}

	addRecent(id){

		var pipe = new DatePipe('fr-FR');
		var http = new XMLHttpRequest();

		var params = new FormData();
		params.append('function', 'addRecent');
		params.append('name', this.musicTitle);
		params.append('account_id', this.accountid);
		params.append('video_id', id);
		params.append('duration', '100');
		params.append('add_date', pipe.transform(new Date(), 'yyyy-MM-dd '));

		http.open('POST', 'https://poopify.fr/api/api.php', true);
		http.onload = function () {
			console.log(http.response);
		};
		http.send(params);

	}
	removeRecent(id){

		var http = new XMLHttpRequest();

		var params = new FormData();
		params.append('function', 'removeRecent');
		params.append('id', id);
		http.open('POST', 'https://poopify.fr/api/api.php', true);
		http.onload = function () {
			console.log(http.response);
		};
		http.send(params);
	}

	getNbRecent(){
		var http = new XMLHttpRequest();

		var params = new FormData();
		params.append('function', 'getNbRecent');
		params.append('account_id', this.accountid);
		var target = this;
		http.open('POST', 'https://poopify.fr/api/api.php', true);
		http.onload = function () {
			var data = JSON.parse(http.response);
			// On regarde si il y a un résultat
			if(Object.keys(data).length > 0) {
				target.nbRecent = data;
			}
		};
		http.send(params);
	}

	getOlderRecent(){

		var http = new XMLHttpRequest();
		// On crée les params post que l'on va envoyer
		var params = new FormData();
		params.append('function', 'getOlderRecent');
		params.append('account_id', this.accountid);
		// Pour pouvoir acceder au this dans la sous function
		var target = this;
		// On connecte
		http.open("POST","https://poopify.fr/api/api.php",true);
		// Lorsque l'execution est terminé
		http.onload = function(){
			// On parse les résultats du Json (On peut utiliser comme ceci : data.id, data.email, data.password etc...)
			var data = JSON.parse(http.response);

			console.log('http' + http.response);
			// On regarde si il y a un résultat
			if(Object.keys(data).length > 0) {
				target.removeRecent(data[0].id);
			}
		}
		http.send(params);
	}
}
