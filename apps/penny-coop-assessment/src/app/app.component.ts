import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

@Component({
  imports: [LandingPageComponent, RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'penny-coop-assessment';
}
