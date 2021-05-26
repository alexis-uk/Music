import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class MusicdbService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  public getSongs(){
    return this.http.get<Song[]>(this.baseUrl + 'songs');
  }

  public getBuyedSongs() {
    return this.http.get<Song[]>(this.baseUrl + 'songs/buyed');
  }

  public getSong(id:string) {
    return this.http.get<Song[]>(this.baseUrl + 'songs/'+id);
  }
  public buySong(songId: string, userEmail: string) {
    return this.http.post<Song[]>(this.baseUrl + 'songs/buy', { songId,  userEmail });
  }
}
