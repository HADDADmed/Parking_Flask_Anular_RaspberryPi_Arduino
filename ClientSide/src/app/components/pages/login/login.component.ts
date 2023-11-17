import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });



  constructor() {
    this.loginForm.valueChanges.subscribe((value)=>{
      console.log(value);

  });

  }
  onClickSubmit() {
    console.log("You have entered 1 : ");
    console.log("You have entered 2 : ");
  }

}
