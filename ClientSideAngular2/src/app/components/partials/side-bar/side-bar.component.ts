import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
import { User } from '../../../models/User';
  @Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

    user : User;
    constructor(
      private router: Router
  ) {

    if (typeof localStorage !== 'undefined') {
      // Use localStorage
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      // Fallback if localStorage is not available
      this.user = new User( '', '', '', 1, 1);
    }

}

  redirectTo( path: string){
    this.router.navigate([path]);
  }
 }

