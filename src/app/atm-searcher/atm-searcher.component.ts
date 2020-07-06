import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AtmService } from '../services/atm.service';

@Component({
  selector: 'app-atm-searcher',
  templateUrl: './atm-searcher.component.html',
  styleUrls: ['./atm-searcher.component.scss']
})
export class AtmSearcherComponent implements OnInit {

  searchForm: FormGroup;
  filtersData = [
    { name: 'City', value: 'city' },
    { name: 'Street', value: 'street' },
    { name: 'House Number', value: 'housenumber' },
    { name: 'Postal Code', value: 'postalcode' },
    { name: 'Lat', value: 'lat' },
    { name: 'Lng', value: 'lng' },
    { name: 'Distance', value: 'distance' },
    { name: 'Type', value: 'type' }
  ];

  get filtersFormArray() {
    return this.searchForm.controls.orders as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private atmService:AtmService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      text: ['', Validators.required],
      filtersArray: this.formBuilder.array([])
    });
  }

  onCheckboxChange(e) {
    const filtersArray: FormArray = this.searchForm.get('filtersArray') as FormArray;
  
    if (e.target.checked) {
      filtersArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      filtersArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          filtersArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit() {
    if (this.searchForm.value.filtersArray.length){
      this.atmService.getAtmList(this.searchForm.value.text,this.searchForm.value.filtersArray)
    }
  }
} 
