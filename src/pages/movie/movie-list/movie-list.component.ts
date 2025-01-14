import { Component } from '@angular/core';
import { MovieDetailed } from '../../../core/models/movie.model';
import { MovieService } from '../../../core/services/movie/movie.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  displayedColumns: string[] = ['id', 'name', 'duration', 'actions'];
  dataSource = new MatTableDataSource<MovieDetailed>([]);

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getAll().subscribe((movies) => {
      this.dataSource.data = movies;
    });
  }

  deleteMovie(id: number): void {
    this.movieService.delete(id).subscribe(() => {
      this.loadMovies();
    });
  }
}
