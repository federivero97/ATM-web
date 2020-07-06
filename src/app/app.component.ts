import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ATM-web';

  get session(): boolean {
    return this.authenticationService.currentTokenValue!=null
  }

  constructor(private authenticationService:AuthenticationService) {
  }
}
