import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CompititionCardComponent } from '../compitition-card/compitition-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CompititionCardComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  competitions: any[] = [];
  errorMessage: string | null = null;
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  isLoading: boolean = false; // Add this property to resolve the error

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCompetitions();
  }

  fetchCompetitions(): void {
    this.isLoading = true; // Set loading state to true
    const token = localStorage.getItem('authToken'); // Get token from local storage

    if (!token) {
      this.errorMessage = 'You are not authenticated. Please log in.';
      this.router.navigate(['/login']);
      return;
    }

    const params = new HttpParams()
      .set('page', this.page.toString())
      .set('size', this.size.toString());

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set token in headers

    this.http
      .get('http://localhost:8080/api/competition/details', { params, headers })
      .subscribe({
        next: (response: any) => {
          this.competitions = response.content || [];
          this.totalPages = response.totalPages || 0;
          this.errorMessage = null; // Clear any previous errors
          this.isLoading = false; // Set loading state to false
        },
        error: (error) => {
          console.error('Error fetching competitions:', error);
          this.errorMessage = 'Failed to load competitions. Please try again.';
          this.isLoading = false; // Set loading state to false
        },
      });
  }

  onPageChange(direction: 'next' | 'prev'): void {
    if (direction === 'next' && this.page < this.totalPages - 1) {
      this.page++;
      this.fetchCompetitions();
    } else if (direction === 'prev' && this.page > 0) {
      this.page--;
      this.fetchCompetitions();
    }
  }

  onLogout(): void {
    localStorage.removeItem('authToken'); // Remove token on logout
    this.router.navigate(['/login']); // Redirect to login page
  }
}
