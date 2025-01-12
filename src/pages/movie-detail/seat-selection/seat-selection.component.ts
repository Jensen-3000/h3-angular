import { Component, inject, Input, signal } from '@angular/core';
import { ScreeningDetails, SeatAvailability } from '../../../core/models/movie';
import { ScreeningService } from '../../../core/services/screening/screening.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-seat-selection',
  imports: [MatCardModule],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css',
})
export class SeatSelectionComponent {
  @Input() screeningId!: number;
  private screeningService = inject(ScreeningService);

  screeningDetails = signal<ScreeningDetails | null>(null);

  ngOnInit() {
    this.loadScreeningDetails();
  }

  private loadScreeningDetails() {
    this.screeningService
      .getScreeningDetails(this.screeningId)
      .subscribe((details) => this.screeningDetails.set(details));
  }

  toggleSeat(seat: SeatAvailability) {
    this.screeningService.toggleSeat(seat.screeningId, seat.seatId).subscribe(() => this.loadScreeningDetails());
  }
}
