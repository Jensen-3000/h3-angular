import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginFormControls } from '../login-form-controls.enum';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = false;
  readonly formControls = LoginFormControls;

  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    [LoginFormControls.Username]: ['', Validators.required],
    [LoginFormControls.Password]: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;

      const username = this.loginForm.get(this.formControls.Username)?.value;
      const password = this.loginForm.get(this.formControls.Password)?.value;

      this.authService.login(username!, password!).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.snackBar.open('Login successful', 'Close', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Login failed', 'Close', { duration: 3000 });
          this.loading = false;
          this.loginForm.reset();
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
