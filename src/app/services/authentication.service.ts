import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentTokenSubject: BehaviorSubject<String>;
    public currentToken: Observable<String>;

  constructor(private http: HttpClient) {
    this.currentTokenSubject = new BehaviorSubject<String>(localStorage.getItem('currentToken'));
    this.currentToken = this.currentTokenSubject.asObservable();
   }

  public get currentTokenValue(): String {
    return this.currentTokenSubject.value;
  }

  login(username: string, password: string) {
    // store user and jwt token in local storage to keep user logged in between page refreshes
    return this.http.post("http://localhost:8080/atscom/login", {'userName': username, 'password': password}, {responseType: 'text' as 'json'}).pipe(map(data => {
      let token = "Bearer " + data
      localStorage.setItem("currentToken", token)
      this.currentTokenSubject.next(token);
    }))
  }

  logout() {
    // remove user and token from local storage to log user out
    localStorage.removeItem('currentToken');
    this.currentTokenSubject.next(null);
  }

}
