import { TestBed } from '@angular/core/testing';

import { WeatherFormService } from './weather-form.service';

describe('WeatherFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherFormService = TestBed.get(WeatherFormService);
    expect(service).toBeTruthy();
  });
});
