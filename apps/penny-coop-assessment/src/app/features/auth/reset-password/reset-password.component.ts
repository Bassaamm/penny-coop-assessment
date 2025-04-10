import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { SnackbarService } from '../../../shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  private token = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.token = params['token'];
      if (!this.token) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  onSubmit() {
    if (this.resetForm.valid && this.token) {
      this.isLoading = true;
      this.authService
        .resetPassword(this.token, this.resetForm.value.password)
        .subscribe({
          next: () => {
            this.snackbar.success('Password reset successful');
            this.router.navigate(['/auth/login']);
          },
          error: (error) => {
            this.snackbar.error(
              error.error.message[0] || 'Failed to reset password'
            );
            this.isLoading = false;
          },
        });
    }
  }
}
