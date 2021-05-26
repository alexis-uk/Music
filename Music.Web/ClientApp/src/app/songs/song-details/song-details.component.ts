import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Song } from '../../models/song';
import { MusicdbService } from '../../services/musicdb.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Subscription } from 'rxjs';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmailDialogComponent } from './email-dialog/email-dialog.component';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css'],
})
export class SongDetailsComponent implements OnInit, OnDestroy {
  public songId: string;
  public song: Song;
  public subscription: Subscription;

  constructor(
    http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private musicDB: MusicdbService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    @Inject('BASE_URL') baseUrl: string
  ) {
    this.songId = this.route.snapshot.paramMap.get('id')!;

    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      // do your task for before route

      return false;
    }

    this.subscription = musicDB.getSong(this.songId).subscribe(result => {
      result.forEach((song: Song) => {
        this.song = (Object.assign(new Song(),
          {
            title: song.title,
            songId: song.songId,
            artist: {
              name: song.artist,
              bio: ''
            }
          }
        ));
        let visited:any =localStorageService.getItem('visited');
        if (visited == null) {
          visited = [];
        } else {
          visited = JSON.parse(visited);
        }
        visited.push(this.song);
        localStorageService.setItem('visited', JSON.stringify(visited));
      });
    }, error => console.error(error));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  buySong(songId) {
    alert(songId);
    this.musicDB.buySong(songId, 'aaa@aaa.com').subscribe(result=> console.log(result));
  }

  openDialog(songId): void {
    let dialogRef = this.dialog.open(EmailDialogComponent, {
      width: '250px',
      data: { songId,email:'' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.musicDB.buySong(result.songId, result.email).subscribe(result => this.router.navigateByUrl('/'));
    });
  }
}
