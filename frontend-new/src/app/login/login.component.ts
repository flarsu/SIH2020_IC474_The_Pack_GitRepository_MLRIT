import { Component, OnInit } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { AddService } from '../services/add.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  constructor(
    private fetch: FetchService,
    private formBuilder: FormBuilder,
    private addService: AddService,
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['modeLatest']);
    }
  }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.addService.login(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Congratulations! Now you are logged In.',
          });
          this.router.navigate(['modeLatest']);
          localStorage.setItem('token', res.token);
          this.reset();
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: error.error.error,
        });
        this.reset();
      }
    );
  }

  reset() {
    this.loginForm.reset();
  }
}
