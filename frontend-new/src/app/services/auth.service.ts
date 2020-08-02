import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, public router: Router) {}
  public backendRoute = 'http://localhost:3000/api/v1';

  // Check if is token Expired
  isTokenExpired(token) {
    const expirationDate = helper.getTokenExpirationDate(token);
    const isExpired = helper.isTokenExpired(token);
    const tokenData = {
      isExpired,
      expirationDate
    };
    return tokenData;
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }
}
