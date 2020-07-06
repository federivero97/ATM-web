import { Component, OnInit } from '@angular/core';
import { Atm } from '../models/atm';
import { AtmService } from '../services/atm.service';

@Component({
  selector: 'app-atm-list',
  templateUrl: './atm-list.component.html',
  styleUrls: ['./atm-list.component.scss']
})
export class AtmListComponent implements OnInit {

  get atmList(): Array<Atm> {
    return this.atmService.currentAtmListValue
  }

  constructor(private atmService:AtmService) { }

  ngOnInit() {
  }

}
