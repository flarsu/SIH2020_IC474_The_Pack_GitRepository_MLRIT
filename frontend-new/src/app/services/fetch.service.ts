import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private httpClient: HttpClient) {
    if (environment.production) {
      this.backendRoute = '/api/v1';
    } else {
      this.backendRoute = 'http://localhost:3000/api/v1';
    }
  }
  public backendRoute;

  getMe() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.httpClient.get(
      `${this.backendRoute}/user/me`,
      httpOptions
    );
  }

  getAllVideos() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.httpClient.get(
      `${this.backendRoute}/ml/allVideos`,
      httpOptions
    );
  }
}
