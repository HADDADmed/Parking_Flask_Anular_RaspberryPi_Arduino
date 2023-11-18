import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

=======
import { VehicleComponent } from './vehicle/vehicle.component';
>>>>>>> 02e7906fc5dd6694018df41c07e133ac74c18137

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, RouterOutlet,FormsModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
=======
  imports: [VehicleComponent ],
  template: `
  <app-vehicle></app-vehicle>
  `,
  styleUrls: ['./app.component.css'],
>>>>>>> 02e7906fc5dd6694018df41c07e133ac74c18137
})
export class AppComponent {
  title = 'ClientSideAngular';
}
