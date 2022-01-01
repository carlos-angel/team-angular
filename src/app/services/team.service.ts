import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../interfaces/team.interface';

export const TeamsTableHeaders = ['Name', 'Country', 'Players'];

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private TeamsDb: AngularFireList<Team>;
  constructor(private db: AngularFireDatabase) {
    this.TeamsDb = this.db.list('/teams', (ref) => ref.orderByChild('name'));
  }

  getTeams(): Observable<Team[]> {
    return this.TeamsDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() } as Team));
      }),
    );
  }

  addTeam(team: Team) {
    return this.TeamsDb.push(team);
  }

  deletePlayer(id: string) {
    this.db.list('/teams').remove(id);
  }

  editTeam(changes: Team) {
    if (changes.$key) {
      const $key = changes.$key;
      delete changes.$key;
      this.db.list('/teams').update($key, changes);
    }
  }
}
