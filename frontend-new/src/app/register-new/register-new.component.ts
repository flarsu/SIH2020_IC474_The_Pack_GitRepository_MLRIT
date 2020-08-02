import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AddService } from '../services/add.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-new',
  templateUrl: './register-new.component.html',
  styleUrls: ['./register-new.component.css'],
  providers: [MessageService],
})
export class RegisterNewComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private addService: AddService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signup(e, u, f, p, cp) {
    console.log(e.value, u.value, f.value, p.value, cp.value);
    if (p.value !== cp.value) {
      return this.messageService.add({
        severity: 'error',
        summary: 'Password does not match',
      });
    }
    const data = {
      username: u.value,
      email: e.value,
      name: f.value,
      password: p.value,
    };

    this.addService.register(data).subscribe(
      (res: any) => {
        if (res.success) {
          this.messageService.add({
            severity: 'success',
            summary: 'Congratulations! Now you can login.',
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
