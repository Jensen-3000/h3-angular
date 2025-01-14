import { Component } from '@angular/core';
import { MovieListComponent } from '../../movie/movie-list/movie-list.component';

@Component({
  selector: 'app-admin',
  imports: [MovieListComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {}
