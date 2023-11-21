import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../../partials/side-bar/side-bar.component";
import { Vehicle } from '../../../../models/Vehicle';
import { VehicleService } from '../../../../services/vehicle/vehicle.service';

@Component({
    selector: 'app-vehicles-list',
    standalone: true,
    templateUrl: './vehicles-list.component.html',
    styleUrl: './vehicles-list.component.css',
    imports: [CommonModule, SideBarComponent]
})
export class VehiclesListComponent {

    vehicles: Vehicle[] = [];

    constructor(private vehicleService: VehicleService) { }
  
    ngOnInit() {
      this.vehicleService.getAllVehicles().subscribe(
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
