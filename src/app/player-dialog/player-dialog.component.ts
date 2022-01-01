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

  onSubmit(playerForm: NgForm) {
    const playerFormValue = { ...playerForm.value };
    if (playerForm.valid) {
      playerFormValue.leftFooted = playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    this.newPlayer(playerFormValue);
    window.location.replace('#');
  }
}
