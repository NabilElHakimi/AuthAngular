import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private Router: Router) {}
  logout() : void {
    localStorage.removeItem('authToken');
    this.Router.navigate(['/login']);
  }
}
