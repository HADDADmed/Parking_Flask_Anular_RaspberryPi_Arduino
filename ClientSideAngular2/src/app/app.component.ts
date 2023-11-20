import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule ,ReactiveFormsModule  } from '@angular/forms';
import { NaveBarComponent } from "./components/partials/nave-bar/nave-bar.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
imports: [FontAwesomeModule,HttpClientModule, CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, NaveBarComponent,RouterModule ]
})
export class AppComponent {
  title = 'ClientSideAngular2';



  
}
