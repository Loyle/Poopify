import { Component, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { VideoDetail } from './video-detail.model';
import { YoutubeSearchService } from './youtube-search.service';
import { Observable } from 'rxjs';
import { map,filter, debounceTime,tap, switchAll } from 'rxjs/operators';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  clicked = false;
  search = '';

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() results = new EventEmitter<VideoDetail[]>();

  constructor(private youtube: YoutubeSearchService, private el:ElementRef) { }

  ngOnInit() {
  }

  getSearch(event){
    this.search = event.target.value;
    this.search
    .filter((text: string) => text.length > 1) // filter out if empty
    .debounceTime(250)                         // only once every 250ms
    .do(() => this.loading.emit(true))         // enable loading
    .map((query: string) => this.youtube.search(query))
    .switch()                                  // act on the return of the search
    .subscribe(
      (results: VideoDetail[]) => {
        alert("in");
        this.loading.emit(false)
        this.results.emit(results)
      },
      (err: any) => {
        console.log(err)
        this.loading.emit(false)
      },
      () => { // on completion
        this.loading.emit(false)
      }
    )
    alert("2");
  }
}
