import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
  @Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  constructor(
    private router: Router
  ) { }

  redirectTo( path: string){
    this.router.navigate([path]);
  }
 }
