import { Countries } from './nationalities.enum';

export interface Player {
  $key?: string;
  name: string;
  lastName: string;
  position: SquadNumber;
  weight: number;
  height: number;
  nationality: Countries;
  leftFooted: boolean;
}

export enum SquadNumber {
  goalKeeper = 1,
  rightBack = 4,
  sweeper = 2,
  stopper = 6,
  leftBack = 3,
  rightMidFielder = 8,
  centerlDefensiveMidFielder = 5,
  leftMIdFielder = 10,
  rightWinger = 7,
  centreForward = 9,
  leftWinger = 11,
}
