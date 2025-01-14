import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreeningAvailableSeats } from '../../models/screening.model';
import { CrudService } from '../crud/crud.service';
import { Endpoints } from '../../enums/endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService extends CrudService<ScreeningAvailableSeats> {
  constructor() {
    super(Endpoints.Screenings);
  }

  getScreeningDetails(id: number): Observable<ScreeningAvailableSeats> {
    return this.http.get<ScreeningAvailableSeats>(`${this.baseUrl}/Screenings/${id}`);
  }

  toggleSeat(screeningId: number, seatId: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/SeatAvailabilities/toggle`, {
      screeningId,
      seatId,
    });
  }

  buyTicket(screeningId: number, seatId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/Tickets`, {
      price: 10,
      userId,
      screeningId,
      seatId,
    });
  }
}
