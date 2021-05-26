import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { SongDetailsComponent } from './songs/song-details/song-details.component';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { SongsComponent } from './songs/songs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailDialogComponent } from './songs/song-details/email-dialog/email-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SongsComponent,
    CounterComponent,
    SongDetailsComponent,
    EmailDialogComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot([
      { path: '', component: SongsComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'details', component: SongDetailsComponent },
      { path: 'details/:id', component: SongDetailsComponent },
    ], { onSameUrlNavigation: 'reload' }),
    BrowserAnimationsModule
  ],
  entryComponents: [EmailDialogComponent],
  exports: [RouterModule,EmailDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
