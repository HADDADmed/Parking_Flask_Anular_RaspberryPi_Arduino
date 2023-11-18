import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl , FormGroup ,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-vehicle',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './add-vehicle.component.html',
  styleUrl: './add-vehicle.component.css'
})
export class AddVehicleComponent {
  route : ActivatedRoute = inject(ActivatedRoute) ;

  applyForm = new FormGroup({
    matricule : new FormControl('') ,
    model : new FormControl(''),
    userId : new FormControl(0),
    abonnement_id : new FormControl(0)
  })

  saveVehicle() {
    console.log("this.applyForm.value :") ;
    console.log(this.applyForm.value) ;

    // this.vehicleService.SaveVehicle(
    //   this.applyForm.value.matricule ?? " ",
    //   this.applyForm.value.model ?? " " ,
    //   this.applyForm.value.userId ?? 0 ,
    //   this.applyForm.value.abonnement_id ?? 0
    //   );
    //   this.applyForm.reset() ;
   }
}
