export interface Movie {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageUrl: string;
  duration: string;
  genres: Genre[];
  screenings: Screening[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Screening {
  id: number;
  startTime: string;
  cinemaName: string;
  cinemaAddress: string;
}

export interface SeatAvailability {
  isAvailable: boolean;
  screeningId: number;
  seatId: number;
}

export interface ScreeningDetails {
  seatAvailabilities: SeatAvailability[];
  movieTitle: string;
  screenName: string;
}
