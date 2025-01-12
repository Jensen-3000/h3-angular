import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Role } from '../../../core/services/auth/auth.interface';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  protected auth = inject(AuthService);

  isLoggedIn = this.auth.isLoggedIn;

  username = () => this.auth.username();
  userRole = () => this.auth.userRole();

  isAdmin = () => this.auth.hasRequiredRole([Role.ADMIN]);
  isCustomer = () => this.auth.hasRequiredRole([Role.USER]);

  logout() {
    this.auth.logout();
  }
}
