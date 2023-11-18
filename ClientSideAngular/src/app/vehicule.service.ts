import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  url  = "http://localhost:5000" ;

  constructor(private http :HttpClient) {}

  SaveVehicle(matricule :string  , model :string , userId :Number , abonnement_id : Number)
  {
     const data = {
      matrecule: matricule,
      model: model,
      userId: userId,
      abonnement_id: abonnement_id
    };
       this.http.post(this.url+'/saveVehicule', data)
      .subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.error(error);
      });
     
  }
}
