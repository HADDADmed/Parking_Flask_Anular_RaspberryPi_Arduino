// vehicle.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'] // Utilisez 'styleUrls' au lieu de 'styleUrl'
})
export class VehicleComponent {
  
  matricule: string = '';
  model: string = '';
  userId: number = 0;
  abonnementId: number = 0;

  constructor(private http: HttpClient) {}

  saveVehicle() {
    const data = {
      matricule: this.matricule,
      model: this.model,
      userId: this.userId,
      abonnement_id: this.abonnementId
    };

    this.http.post('http://localhost:5000/saveVehicule', data)
      .subscribe((response) => {
        console.log(response);
        // Réinitialisez le formulaire ou effectuez d'autres actions si nécessaire
      }, (error) => {
        console.error(error);
      });
  }
}
