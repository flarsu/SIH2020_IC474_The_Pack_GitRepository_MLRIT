import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AddService } from '../services/add.service';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  constructor(
    private messageService: MessageService,
    private addService: AddService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm =  this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      cnfPassword: ['', Validators.required]
    });
  }
  signUp(){
    console.log(this.registerForm.value);
    if (this.registerForm.invalid){
      return;
    }
    if (this.registerForm.value.password !== this.registerForm.value.cnfPassword){
      return this.messageService.add({
        severity: 'error',
        summary: 'Password does not match',
      });
    }
    const data = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      name: this.registerForm.value.fullName,
      password: this.registerForm.value.password
    };
    this.addService.register(data).subscribe((res: any) => {
      if (res.success){
        this.messageService.add({
          severity: 'success',
          summary: 'Congratulations! Now you can login.',
        });
        localStorage.setItem('token' , res.token);
        this.reset();
        this.router.navigate(['mode']);

      }
      }, (error) =>  {
          this.messageService.add({
            severity: 'error',
            summary: error.error.error,
          });
          this.reset();
      });
  }

  reset(){
    this.registerForm.reset();
  }
}
