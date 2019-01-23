import { TestBed } from '@angular/core/testing';

import { WeatherFormService } from './weather-form.service';
import { HttpClientModule } from '@angular/common/http';

describe('WeatherFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: WeatherFormService = TestBed.get(WeatherFormService);
    expect(service).toBeTruthy();
  });
});


