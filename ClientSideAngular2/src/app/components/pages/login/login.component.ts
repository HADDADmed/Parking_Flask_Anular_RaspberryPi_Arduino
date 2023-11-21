import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService]

})
export class LoginComponent {

  

  constructor(private loginService: LoginService) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });


  login() {
    console.log('this.loginForm.value 1:');
    console.log(this.loginForm.value);
    this.loginService.login(
      this.loginForm.value.username ? this.loginForm.value.username : '',
      this.loginForm.value.password ? this.loginForm.value.password : ''
    );

  }
}
