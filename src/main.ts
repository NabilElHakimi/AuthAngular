import { routes } from './app/app.routes';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Provide routing
    provideHttpClient(),   // Provide HttpClient
  ],
}).catch((err) => console.error(err));
