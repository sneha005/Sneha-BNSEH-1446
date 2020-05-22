import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthenticationService', () => {
  let httpClient: HttpClient;
  let service: AuthenticationService;
  const userData = {
    users: [
      {
        userName: 'admin',
        password: 'abcd'
      },
      {
        userName: 'employee',
        password: '1234'
      }
    ]
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [AuthenticationService, HttpClient]
  }));

  beforeEach(inject([HttpClient],
    (httpclient: HttpClient) => {
      httpClient = httpclient;
    }));

  beforeEach(() => {
    // tslint:disable-next-line: deprecation
    service = TestBed.get(AuthenticationService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if valid user is passed in parameter', () => {
    spyOn(httpClient, 'get').and.returnValue(of(userData));
    service.authenticateUser('admin', 'abcd').subscribe(data => {
      expect(data).toBe(true);
    });

  });

  it('should return false if invalid user is passed in parameter', () => {
    spyOn(httpClient, 'get').and.returnValue(of(userData));
    service.authenticateUser('random', 'password').subscribe(data => {
      expect(data).not.toBe(true);
    });

  });

});


