import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService:AuthenticationService) { 
      
      // redirect to home if already logged in
      if (this.authenticationService.currentTokenValue) { 
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.authenticationService.logout()
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.authenticationService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(first())
    .subscribe(
        token => {
            this.router.navigate(['/']);
            this.error = null
        },
        error => {
            this.error = "Invalid username/password"
        });
  }
}