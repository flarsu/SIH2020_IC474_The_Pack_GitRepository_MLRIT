import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AddService {
  constructor(private httpClient: HttpClient) {}
  public backendRoute = 'http://localhost:3000/api/v1';


  login(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      `${this.backendRoute}/auth/login`,
      data,
      httpOptions
    );
  }

  register(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClient.post(
      `${this.backendRoute}/auth/register`,
      data,
      httpOptions
    );
  }
}
