import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-compitition-card',
  standalone: true,
  imports: [RouterLink, CommonModule], // Include CommonModule
  templateUrl: './compitition-card.component.html',
  styleUrls: ['./compitition-card.component.css'],
})
export class CompititionCardComponent {
  @Input() competition: any; // Receives competition data from parent component
}
