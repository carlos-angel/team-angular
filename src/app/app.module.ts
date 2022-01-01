import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { PlayerService } from './services/player.service';
import { TeamService } from './services/team.service';
import { TeamTableComponent } from './team-table/team-table.component';

@NgModule({
  declarations: [AppComponent, TeamTableComponent],
  imports: [BrowserModule, AppRoutingModule, AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule],
  providers: [PlayerService, TeamService],
  bootstrap: [AppComponent],
})
export class AppModule {}
