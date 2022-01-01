import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamService, TeamsTableHeaders } from '../services/team.service';
import { Team } from '../interfaces/team.interface';
import { take } from 'rxjs/operators';
import { Countries } from '../interfaces/nationalities.enum';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss'],
})
export class TeamTableComponent implements OnInit {
  public teams$: Observable<Team[]>;
  public tableHeaders = TeamsTableHeaders;

  constructor(private teamService: TeamService) {
    this.teams$ = this.teamService.getTeams();
  }

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe((teams) => {
        if (teams.length === 0) {
          const team: Team = {
            name: 'MyAmazingTeam',
            country: Countries.Mexico,
            players: [],
          };

          this.teamService.addTeam(team);
        }
      });
  }
}
