import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    if (token) {
      return true; // Allow access if the token exists
    } else {
      this.router.navigate(['/login']); // Redirect to login if no token
      return false;
    }
  }
}
