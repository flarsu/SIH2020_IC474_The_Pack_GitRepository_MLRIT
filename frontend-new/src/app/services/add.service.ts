import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AddService {
  constructor(private httpClient: HttpClient) {
    if (environment.production) {
      this.backendRoute = '/api/v1';
      this.flaskRoute = 'http://52.146.33.103:5000/';
    } else {
      this.backendRoute = 'http://localhost:3000/api/v1';
      this.flaskRoute = 'http://localhost:5000';
    }
  }

  public backendRoute;
  public flaskRoute;

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

  textToSpeech(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.httpClient.post(
      `${this.backendRoute}/ml/speech`,
      data,
      httpOptions
    );
  }

  getPos(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
    return this.httpClient.post(
      `${this.flaskRoute}/get_pos`,
      data,
      httpOptions
    );
  }

  imageSearch(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.httpClient.post(
      `${this.backendRoute}/ml/image`,
      data,
      httpOptions
    );
  }

  videoGen(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.httpClient.post(
      `${this.backendRoute}/ml/video`,
      data,
      httpOptions
    );
  }

  ocr(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.httpClient.post(
      `${this.backendRoute}/ml/ocr`,
      data,
      httpOptions
    );
  }


  summary(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.httpClient.post(
      `${this.backendRoute}/ml/summary`,
      data,
      httpOptions
    );
  }

  translate(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.httpClient.post(
      `${this.backendRoute}/ml/translate`,
      data,
      httpOptions
    );
  }

  questionGen(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }),
    };
    return this.httpClient.post(
      `${this.flaskRoute}/question_gen`,
      data,
      httpOptions
    );
  }
}
