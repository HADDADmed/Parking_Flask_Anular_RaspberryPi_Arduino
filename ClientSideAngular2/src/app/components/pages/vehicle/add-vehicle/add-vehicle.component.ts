import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl , FormGroup ,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SideBarComponent } from "../../../partials/side-bar/side-bar.component";
import { VehicleService } from '../../../../services/vehicle/vehicle.service';

@Component({
    selector: 'app-add-vehicle',
    standalone: true,
    templateUrl: './add-vehicle.component.html',
    styleUrl: './add-vehicle.component.css',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SideBarComponent]
})
export class AddVehicleComponent {
  route : ActivatedRoute = inject(ActivatedRoute) ; 
  vehicleService : VehicleService = inject(VehicleService) ; 

  applyForm = new FormGroup({
    matricule : new FormControl('') ,
    model : new FormControl(''),
    userId : new FormControl(0),
    abonnement_id : new FormControl(0)
  })

  saveVehicle() {

    this.vehicleService.SaveVehicle(
      this.applyForm.value.matricule ?? " ",
      this.applyForm.value.model ?? " " ,
      this.applyForm.value.userId ?? 0 ,
      this.applyForm.value.abonnement_id ?? 0 
      ); 
      this.applyForm.reset() ; 
  }
}
