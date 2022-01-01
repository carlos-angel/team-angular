import { Component, OnInit } from '@angular/core';
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
  private team: Team | undefined;
  public countries = Object.keys(Countries).map((key) => ({ label: key, key: key.indexOf }));
  public squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map((key) => ({ label: key, key: key.indexOf }));

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
      const playerFormValueKey: Player = {
        ...playerFormValue,
        $key: key,
      };

      if (this.team) {
        const formattedTeam: Team = {
          ...this.team,
          players: [...(this.team.players ? this.team.players : []), playerFormValueKey],
        };

        this.teamService.editTeam(formattedTeam);
      }
    }
  }

  onSubmit(playerForm: NgForm) {
    const playerFormValue = { ...playerForm.value };
    if (playerForm.valid) {
      playerFormValue.leftFooted = playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    this.newPlayer(playerFormValue);
    window.location.replace('#');
  }
}
