import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Countries } from '../interfaces/nationalities.enum';
import { SquadNumber, Player } from '../interfaces/player.interface';
import { Team } from '../interfaces/team.interface';
import { PlayerService } from '../services/player.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss'],
})
export class PlayerDialogComponent implements OnInit {
  @Input() player: Player;
  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter();
  private team: Team;
  public countries = Object.entries(Countries).map((item) => ({ label: item[0], key: item[1] }));
  public squadNumber = Object.entries(SquadNumber)
    .slice(Object.entries(SquadNumber).length / 2)
    .map((item) => ({ label: item[0], key: item[1] }));

  constructor(private playerService: PlayerService, private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length > 0) {
          this.team = teams[0];
        }
      });
  }

  private newPlayer(playerFormValue: Player) {
    const key = this.playerService.addPlayer(playerFormValue).key;
    if (key) {
      const playerFormValueKey = {
        ...playerFormValue,
        key,
      };

      const formattedTeam: Team = {
        ...this.team,
        players: [...(this.team.players ? this.team.players : []), playerFormValueKey],
      };

      this.teamService.editTeam(formattedTeam);
    }
  }

  private editPlayer(playerFormValue: Player) {
    const playerFormValueWithKey = { ...playerFormValue, $key: this.player.$key };
    const playerFormValueFormattedKey = { ...playerFormValue, key: this.player.$key };
    delete playerFormValueFormattedKey.$key;

    const modifiedPlayers = this.team.players
      ? this.team.players.map((player) => (player.$key === this.player.$key ? playerFormValueFormattedKey : player))
      : this.team.players;

    const formattedTeam: Team = {
      ...this.team,
      players: [...modifiedPlayers],
    };

    this.playerService.editPlayer(playerFormValueWithKey);
    this.teamService.editTeam(formattedTeam);
  }

  onSubmit(playerForm: NgForm) {
    const playerFormValue = { ...playerForm.value };

    playerFormValue.leftFooted =
      playerFormValue.leftFooted === '' || playerFormValue.leftFooted === undefined ? false : playerFormValue.leftFooted;

    if (this.player) {
      this.editPlayer(playerFormValue);
    } else {
      this.newPlayer(playerFormValue);
    }

    window.location.replace('#');
  }

  onClose() {
    this.closeDialog.emit(true);
  }
}
