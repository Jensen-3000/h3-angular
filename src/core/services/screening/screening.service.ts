import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreeningDetails } from '../../models/movie';
import { CrudService } from '../crud/crud.service';
import { Endpoints } from '../../models/endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService extends CrudService<ScreeningDetails> {
  constructor() {
    super(Endpoints.Screenings);
  }

  getScreeningDetails(id: number): Observable<ScreeningDetails> {
    return this.http.get<ScreeningDetails>(`${this.baseUrl}/Screenings/${id}`);
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
