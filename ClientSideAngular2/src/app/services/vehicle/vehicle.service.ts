import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../../models/Vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
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

  getAllVehicles(): Observable<{ vehicles: Vehicle[] }> {
    return this.http.get<{ vehicles: Vehicle[] }>(this.url + '/vehicles');
  }
}
