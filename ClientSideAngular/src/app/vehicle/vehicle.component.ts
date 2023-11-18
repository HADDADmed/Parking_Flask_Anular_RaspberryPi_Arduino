import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl , FormGroup , ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VehiculeService } from '../vehicule.service';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  template: `
  <div class="container mt-5">
  <h2>Enregistrer un véhicule</h2>
  <form [formGroup]="applyForm" (submit)="saveVehicle()">
    <div class="mb-3">
      <label for="matricule" class="form-label">Matricule :</label>
      <input type="text" id="matricule" formControlName="matricule" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="model" class="form-label">Model :</label>
      <input type="text" id="model" formControlName="model" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="userId" class="form-label">L'utilisateur :</label>
      <input type="number" id="userId" formControlName="userId" class="form-control">
    </div>
    <div class="mb-3">
      <label for="abonnement_id" class="form-label">L'abonnement :</label>
      <input type="number" id="abonnement_id" formControlName="abonnement_id" class="form-control">
    </div>
    <button type="submit" class="btn btn-primary">Ajouter la voiture</button>
  </form>
</div>

  `,
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent { 
   
  route : ActivatedRoute = inject(ActivatedRoute) ; 
  vehicleService : VehiculeService  = inject(VehiculeService) ; 

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
