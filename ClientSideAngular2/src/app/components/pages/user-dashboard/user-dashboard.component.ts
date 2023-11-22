import { Vehicle } from './../../../models/Vehicle';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../partials/side-bar/side-bar.component";
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { User } from '../../../models/User';
@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.css',
    imports: [CommonModule, SideBarComponent]
})
export class UserDashboardComponent {

  user : User;
  vehicles : Vehicle[] = [];
  constructor(
    private vehicleService : VehicleService
  ){

    if (typeof localStorage !== 'undefined') {
      // Use localStorage
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      // Fallback if localStorage is not available
      this.user = new User( '', '', '', 1, 1);
    }

    this.vehicleService.getVehiclesByUserId(this.user.id).subscribe(
      data => {
        console.log('Received vehicle data:', data);

        if (data && Array.isArray(data.vehicles)) {
          this.vehicles = data.vehicles;
        } else {
          console.error('Invalid vehicle data structure:', data);
        }

        // Other logic...
      },
      error => {
        console.error('Error fetching vehicles:', error);
      }
    );

  }



}
