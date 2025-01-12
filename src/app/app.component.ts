import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent as NavbarComponent } from '../shared/navbar/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'h3-angular';
}
