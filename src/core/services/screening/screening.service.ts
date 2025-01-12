import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScreeningDetails } from '../../models/movie';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ScreeningService {
  private baseUrl = environment.apiBaseUrl;

  http = inject(HttpClient);

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
