import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../interfaces/player.interface';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss'],
})
export class PlayerTableComponent implements OnInit {
  public players$: Observable<Player[]>;
  public selectedPlayer: Player | null;
  public showModal: boolean = false;

  constructor(private playerService: PlayerService) {
    this.players$ = this.playerService.getPlayers();
    this.selectedPlayer = null;
  }

  ngOnInit(): void {}

  newPlayer() {
    this.showModal = true;
    this.selectedPlayer = null;
    setTimeout(() => {
      window.location.replace('#open-modal');
    }, 0);
  }
}
