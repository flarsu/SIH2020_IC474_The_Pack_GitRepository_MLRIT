import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FetchService } from '../services/fetch.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fetch: FetchService
  ) {}
  public display = false;
  public name;
  public email;
  ngOnInit(): void {
    this.fetch.getMe().subscribe((res: any) => {
      this.name = res.data.name;
      this.email = res.data.email;
    });
  }

  public displayChange() {
    this.display = !this.display;
  }

  logout() {
    this.authService.logOut();
  }
}
