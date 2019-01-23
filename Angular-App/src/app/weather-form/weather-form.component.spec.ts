import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IWeatherForecast } from './IWeatherForecast';

import { WeatherFormComponent } from './weather-form.component';
import { HttpClientModule } from '@angular/common/http';


describe('WeatherFormComponent', () => {
  let component: WeatherFormComponent;
  let fixture: ComponentFixture<WeatherFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [ WeatherFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
