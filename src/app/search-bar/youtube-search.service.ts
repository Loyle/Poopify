import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VideoDetail } from './video-detail.model';

export const YOUTUBE_API_KEY = 'AIzaSyCXXCcPyjvXYeHXX2fS_mmLFZw57N8aFjg';
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

@Injectable()
export class YoutubeSearchService {

  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string) { }

    search(query: string): Observable<VideoDetail[]> {
      const params: string = [
        `q=${query}`,
        `key=${this.apiKey}`,
        `part=snippet`,
        `type=video`,
        `maxResults=10`
      ].join('&')
      const queryUrl = `${this.apiUrl}?${params}`
      console.log(queryUrl)
      return this.http.get(queryUrl).map(response => {
        return <any>response['items'].map(item => {
          alert(item.snippet.thumbnails.high.url);
          return new VideoDetail({
            id: item.id.videoId,
            title: item.snippet.title,
            desc: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          })
        })
      })
    }
}
