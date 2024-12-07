import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router for navigation
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule , RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    // Initialize the registration form with validators
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]], // Add minimum password length
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      nationality: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Ensure valid email format
    });
  }

  // Handles form submission
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:8080/api/auth/register', this.registerForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful! Redirecting to login...';
          this.clearMessagesAfterDelay();
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to the login page after success
          }, 3000); // Redirect after 3 seconds
        },
        error: (error) => {
          this.errorMessage = error?.error?.message || 'Registration failed. Please try again.';
          this.clearMessagesAfterDelay();
        },
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.clearMessagesAfterDelay();
    }
  }

  // Clears success and error messages after a delay
  private clearMessagesAfterDelay(): void {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 3000); // Clear messages after 3 seconds
  }
}
