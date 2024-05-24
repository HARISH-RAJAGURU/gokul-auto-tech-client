import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080';
  isAuthenticatedFlag = false;

  authentication(data: any): Observable<any> {
    const url = `${this.baseUrl}/authentication`;
    this.isAuthenticatedFlag = true;
    return this.http.post(url, data);
  }
}
