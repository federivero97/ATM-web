import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Atm } from '../models/atm';
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AtmService {

  get token(): String {
    return this.authenticationService.currentTokenValue;
  }

  private currentATMListSubject: BehaviorSubject<Array<Atm>>;
  public currentATMList: Observable<Array<Atm>>;

  constructor(private http: HttpClient, private authenticationService:AuthenticationService) {
    this.currentATMListSubject = new BehaviorSubject<Array<Atm>>(JSON.parse(localStorage.getItem('currentAtmList')));
    this.currentATMList = this.currentATMListSubject.asObservable();
   }

  public get currentAtmListValue(): Array<Atm> {
    return this.currentATMListSubject.value;
  }

  getAtmList(text: string, fields: string) {
    let tokenStr = "Bearer " + this.token
    let headers = new HttpHeaders({"Authorization": tokenStr})
    let params = new HttpParams().set("q",text).set("fields", fields);
    return this.http.get("atscom/atm", {headers: headers, params: params, responseType: 'text' as 'json'}).subscribe((data: string) => {
      localStorage.setItem("currentATMList", JSON.stringify(data));
      this.currentATMListSubject.next(<Atm[]>JSON.parse(data));
      return data;
    })
  }
}