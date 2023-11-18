import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { VehicleComponent } from './vehicle/vehicle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VehicleComponent ],
  template: `
  <app-vehicle></app-vehicle>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ClientSideAngular';
}
