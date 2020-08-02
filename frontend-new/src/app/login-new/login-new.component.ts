import { Component, OnInit } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { AddService } from '../services/add.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login-new',
  templateUrl: './login-new.component.html',
  styleUrls: ['./login-new.component.css'],
  providers: [MessageService],
})
export class LoginNewComponent implements OnInit {
  constructor(
    private fetch: FetchService,
    private addService: AddService,
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['modeLatest']);
    }
  }
  ngOnInit(): void {}

  login(email, Password) {
    const data = {
      email: email.value,
      password: Password.value,
    };
    this.addService.login(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Congratulations! Now you can use EUREKA.',
          });
          this.router.navigate(['modeLatest']);
          localStorage.setItem('token', res.token);
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: error.error.error,
        });
      }
    );
  }
}
