import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieDetailed, MovieSimple } from '../../core/models/movie.model';
import { ScreeningSimple } from '../../core/models/screening.model';
import { MovieService } from '../../core/services/movie/movie.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { catchError } from 'rxjs';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, SeatSelectionComponent],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);

  movie: MovieDetailed | null = null;
  error: string | null = null;
  selectedCinemaName: string | null = null;
  selectedScreening: ScreeningSimple | null = null;

  get screeningsForSelectedCinema() {
    return this.movie?.screenings.filter((s) => s.cinemaName === this.selectedCinemaName);
  }

  get cinemas() {
    return [...new Set(this.movie?.screenings.map((s) => `${s.cinemaName}|${s.cinemaAddress}`))].map((cinema) => {
      const [name, address] = cinema.split('|');
      return { name, address };
    });
  }

  get genres() {
    return this.movie?.genres.map((g) => g.name).join(', ') ?? '';
  }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (!movieId) return;

    this.movieService
      .getDetailedById(movieId)
      .pipe(
        catchError(() => {
          this.error = 'Failed to load movie';
          return [];
        })
      )
      .subscribe((movie) => (this.movie = movie));
  }

  selectCinema(name: string): void {
    this.selectedCinemaName = name;
  }

  selectScreening(screening: ScreeningSimple): void {
    this.selectedScreening = screening;
  }
}
