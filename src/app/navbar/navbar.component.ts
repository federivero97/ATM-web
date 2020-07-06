import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AtmService } from '../services/atm.service';
import { Atm } from '../models/atm';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  get session(): boolean {
    return this.authenticationService.currentTokenValue!=null
  }

  constructor(private authenticationService:AuthenticationService) {
  }

  ngOnInit() {
  }

  logout(){
    this.authenticationService.logout()
  }
}
