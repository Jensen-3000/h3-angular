import { Component, inject, signal } from '@angular/core';
import { MovieDetailed } from '../../../core/models/movie.model';
import { MovieService } from '../../../core/services/movie/movie.service';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private movieService = inject(MovieService);
  movies = signal<MovieDetailed[]>([]);

  ngOnInit(): void {
    this.movieService.getAll().subscribe((movies) => this.movies.set(movies));
  }
}
