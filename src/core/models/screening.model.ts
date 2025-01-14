import { SeatAvailability } from './seat-availability.model';

export interface ScreeningSimple {
  id: number;
  startTime: string;
  cinemaName: string;
  cinemaAddress: string;
}

export interface ScreeningDetails {
  movieTitle: string;
  screenName: string;
}

export interface ScreeningAvailableSeats extends ScreeningDetails {
  seatAvailabilities: SeatAvailability[];
}
