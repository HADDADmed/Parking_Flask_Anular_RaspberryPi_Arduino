import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Userlogin } from '../../../../shared/interfaces/Userlogin';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule,FormsModule],
  providers: [UserService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(
    private userService:UserService,

  ) { }
  // create instatce of Userlogin
  userlogin: Userlogin = {
    email: '',
    password: ''
  };

  onClickSubmit(result:any) {

    this.userlogin.email = result.username;
    this.userlogin.password = result.password;

    console.log("You have entered 1 : " +  this.userlogin);

    // check the user name and passqord
    this.userService.login( this.userlogin) ;
    // if the user name and password are correct




 }



}
