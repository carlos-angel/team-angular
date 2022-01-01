import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../interfaces/player.interface';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private PlayersDb: AngularFireList<Player>;
  constructor(private db: AngularFireDatabase) {
    this.PlayersDb = this.db.list('/players', (ref) => ref.orderByChild('name'));
  }

  getPlayers(): Observable<Player[]> {
    return this.PlayersDb.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({ $key: c.payload.key, ...c.payload.val() } as Player));
      }),
    );
  }

  addPlayer(player: Player) {
    return this.PlayersDb.push(player);
  }

  deletePlayer(id: string) {
    this.db.list('/players').remove(id);
  }

  editPlayer(changes: Player) {
    if (changes.$key) {
      const $key = changes.$key;
      delete changes.$key;
      this.db.list('/players').update($key, changes);
    }
  }
}
