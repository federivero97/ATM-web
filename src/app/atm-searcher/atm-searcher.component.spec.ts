import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmSearcherComponent } from './atm-searcher.component';

describe('AtmSearcherComponent', () => {
  let component: AtmSearcherComponent;
  let fixture: ComponentFixture<AtmSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
