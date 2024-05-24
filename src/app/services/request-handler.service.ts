import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestHandlerService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080';

  postData(data: any): Observable<any> {
    const url = `${this.baseUrl}/${data.division}/submit`;
    return this.http.post(url, data);
  }

  managerView(data: any) :Observable<any>{
    const url =  `${this.baseUrl}/${data}/Manager`
    return this.http.get(url);
  }
  
}
