import { Component, OnInit } from '@angular/core';
import { Song } from '../models/song';
import { LocalStorageService } from '../services/local-storage.service';
import { MusicdbService } from '../services/musicdb.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
})
export class SongsComponent implements OnInit {
  public songs: Song[] = [];
  public buyedSongs: Song[] = [];
  public visited: any;
  constructor(private localStorageService: LocalStorageService, private musicDB: MusicdbService) {
  }
  ngOnInit(): void {
    this.localStorageService.setItem("songs", JSON.stringify(this.songs));

    let jsonsongs = this.localStorageService.getItem("songs");

    let parsed = <Song[]>JSON.parse(jsonsongs);
    this.musicDB.getSongs().subscribe(result => {
      result.forEach((song: Song) => {
        this.songs.push(Object.assign(new Song(),
          {
            title: song.title,
            songId: song.songId,
            visited: this.wasVisited(song.songId),
            artist: {
              name: song.artist
            }
          }
        ));
      });
    }, error => console.error(error));

    this.musicDB.getBuyedSongs().subscribe(result => {
      result.forEach((song: Song) => {
        this.buyedSongs.push(Object.assign(new Song(),
          {
            title: song.title,
            songId: song.songId,
            visited: this.wasVisited(song.songId),
            artist: {
              name: song.artist
            }
          }
        ));
      });
    }, error => console.error(error));

    this.visited = this.localStorageService.getItem('visited');
    if (this.visited == null) {
      this.visited = [];
    } else {
      this.visited = JSON.parse(this.visited);
    }
  }

  private wasVisited(songId: string): boolean {
    let result: boolean = false;
    this.visited.forEach((e: Song) => { if (e.songId == songId) { result = true; } });
    return result;
  }
}
