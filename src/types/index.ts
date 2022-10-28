type FetchServiceParams = {
  path: string;
  id?: string;
  query?: Record<string, string>;
};

type Area = {
  id: number;
  flag: string | null;
  name: string;
};

type Competition = {
  id: number;
  area: Area[];
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
  currentSeason: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: null;
  };
  numberOfAvailableSeasons: number;
  lastUpdated: string;
};

type Player = {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  firstName: string;
  lastName: string;
  shirtNumber: number;
  currentTeam: Team;
};

type Team = {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  coach: {
    name: string;
  };
  squad: Player[];
  lastUpdated: string;
};

export type { FetchServiceParams, Area, Competition, Player, Team };
