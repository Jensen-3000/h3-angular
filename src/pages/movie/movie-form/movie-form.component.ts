import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GenreSimple } from '../../../core/models/genre.model';
import { MovieUpdate, MovieCreate } from '../../../core/models/movie.model';
import { MovieService } from '../../../core/services/movie/movie.service';
import { GenreService } from '../../../core/services/genre/genre.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-movie-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './movie-form.component.html',
  styleUrl: './movie-form.component.css',
})
export class MovieFormComponent {
  movieForm: FormGroup;
  movieId: number | null = null;
  genres: GenreSimple[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private movieService: MovieService,
    private genreService: GenreService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.movieForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: [''],
      slug: [''],
      duration: ['', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/)]],
      genreIds: [[]],
    });
  }

  ngOnInit(): void {
    this.loadGenres();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.movieId = +params['id'];
        this.isEditMode = true;
        this.loadMovieForEdit(this.movieId);
      }
    });
  }

  loadGenres(): void {
    this.genreService.getAll().subscribe((genres) => {
      this.genres = genres;
    });
  }

  loadMovieForEdit(id: number): void {
    this.movieService.getDetailedById(id).subscribe((movie) => {
      this.movieForm.patchValue({
        name: movie.name,
        description: movie.description,
        imageUrl: movie.imageUrl,
        slug: movie.slug,
        duration: movie.duration,
        genreIds: movie.genres.map((genre) => genre.id),
      });
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const movieData = this.movieForm.value;
      if (this.isEditMode && this.movieId !== null) {
        this.movieService.updateMovie(this.movieId, movieData as MovieUpdate).subscribe(() => {
          this.router.navigate(['/movies']);
        });
      } else {
        console.log(movieData);
        this.movieService.createMovie(movieData as MovieCreate).subscribe(() => {
          this.router.navigate(['/movies']);
        });
      }
    }
  }
}
