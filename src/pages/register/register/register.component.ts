import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RegisterFormControls } from '../register-form-controls.enum';
import { AuthService } from '../../../core/services/auth/auth.service';
import { UserRole } from '../../../core/models/user-role.interface';
import { MatSelectModule } from '@angular/material/select';
import { UserRoleService } from '../../../core/services/user-role.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  loading = false;
  readonly formControls = RegisterFormControls;
  userRoles: UserRole[] = [];

  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private userRoleService = inject(UserRoleService);

  registerForm: FormGroup = this.fb.group({
    [RegisterFormControls.Username]: ['', Validators.required],
    [RegisterFormControls.Password]: ['', Validators.required],
    [RegisterFormControls.Email]: [''],
    [RegisterFormControls.Role]: ['', Validators.required],
  });

  ngOnInit() {
    this.userRoleService.getAll<UserRole>().subscribe((roles) => {
      if (roles()) {
        this.userRoles = roles();
        // Set a default value to the first role, this will prevent an error
        this.registerForm.get(this.formControls.Role)?.setValue(this.userRoles[0].id);
      }
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;

      const username = this.registerForm.get(this.formControls.Username)?.value;
      const password = this.registerForm.get(this.formControls.Password)?.value;
      const email = this.registerForm.get(this.formControls.Email)?.value;
      const userRoleId = this.registerForm.get(this.formControls.Role)?.value;

      this.authService.register(username!, password!, userRoleId, email).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.snackBar.open('Registration successful, please login', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.snackBar.open('Registration failed', 'Close', { duration: 3000 });
          this.loading = false;
          this.registerForm.reset();
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
