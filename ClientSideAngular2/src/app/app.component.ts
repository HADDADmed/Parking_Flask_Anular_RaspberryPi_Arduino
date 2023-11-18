import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule ,ReactiveFormsModule  } from '@angular/forms';
import { NaveBarComponent } from "./components/partials/nave-bar/nave-bar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule, NaveBarComponent]
})
export class AppComponent {
  title = 'ClientSideAngular2';
}
