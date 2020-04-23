import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
	selector: 'app-player-bar',
	templateUrl: './player-bar.component.html',
	styleUrls: ['./player-bar.component.css']
})
export class PlayerBarComponent implements OnInit {

	@ViewChild('playerStateRange') playerStateRange : ElementRef;

	public YT: any;
	public videoID: any;
	public player: any;
	public isPlaying = false;

	public duration = 0;
	public currentTime = 0;

	public isMusicLoaded = false;


	public musicTitle = "";
	public thumbnail = "";

	constructor() { }
	init() {
		var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	}

	ngOnInit(): void {
		this.init();

		window['onYouTubeIframeAPIReady'] = (e) => {
			this.YT = window['YT'];
			this.player = new window['YT'].Player('player', {
				height: '0',
				width: '0',
				suggestedQuality: "hd720",
				events: {
					'onStateChange': this.onPlayerStateChange,
					'onError': this.onPlayerError,
					'onReady': this.onPlayerReady(this)
				}
			});
		}

		setInterval(() => {
			if(!this.isMusicLoaded) {
				if(this.player.getDuration() > 0) {
					this.isMusicLoaded = true;
					this.loadMusicData();
				}
			}
			else {
				this.checkPlayerStatus();
			}
		}, 100);
	}
	
	previousMusic() : void {
		alert("Previous");
	}
	playPauseMusic(videoID) : void {
		if(this.isPlaying) {
			this.player.pauseVideo(); 
		}
		else {
			if(videoID != this.videoID) {
				this.videoID = videoID;
				this.loadPlayer();
			}
			this.player.playVideo(); 
		}
		this.isPlaying = !this.isPlaying;
	}
	nextMusic() : void {
		alert("Next");
	}
	volumeChanged(value) : void {
		this.player.setVolume(value);
	}
	timeChanged(value) : void {
		this.player.seekTo(value / 1000,true);
		this.checkPlayerStatus();
	}

	loadPlayer() : void {
		this.player.loadVideoByUrl("http://www.youtube.com/v/" + this.videoID + "?version=3" ,0 ,"hd720");
		this.isMusicLoaded = false;
	}

	checkPlayerStatus() : void {
		this.currentTime = this.player.getCurrentTime();
		this.duration = this.player.getDuration();
	}

	loadMusicData() : void {
		this.musicTitle = this.player.getVideoData().title;
		this.thumbnail = "https://img.youtube.com/vi/"+ this.videoID +"/0.jpg"
		this.isMusicLoaded = true;
	}


	onPlayerStateChange(event) {
		console.log("Player status changed");
		console.log(event.data);
	}

	onPlayerError(event) {
		alert("Error lecture");
	}
	onPlayerReady(t) {
		console.log("Player is ready");
	}
}