import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from '../../models/Vehicle';
import { Observable } from 'rxjs';

import { VEHICLE_ADD_URL } from '../../constants/URLS';
import { VEHICLES_URL } from '../../constants/URLS';
import { VEHICLE_BY_ID_URL } from '../../constants/URLS';
import { VEHICLES_BY_USER_ID_URL } from '../../constants/URLS';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http :HttpClient) {}

  SaveVehicle(matricule :string  , model :string , userId :Number , abonnement_id : Number)
  {
     const data = {
      matrecule: matricule,
      model: model,
      userId: userId,
      abonnement_id: abonnement_id
    };
    console.log(data);
       this.http.post(VEHICLE_ADD_URL, data ).subscribe(
      responseData => {
        console.log(responseData);

      }
    );
  }

  getAllVehicles(): Observable<{ vehicles: Vehicle[] }> {
    return this.http.get<{ vehicles: Vehicle[] }>(VEHICLES_URL);
  }

  getVehiculeById(id: number): Observable<{ vehicle: Vehicle }> {

    return this.http.get<{ vehicle: Vehicle }>(VEHICLE_BY_ID_URL+ id);

  }
  getVehiclesByUserId(id: number): Observable<{ vehicles: Vehicle[] }> {
    console.log("VEHICLES_BY_USER_ID_URL + id :");
    console.log(VEHICLES_BY_USER_ID_URL + id);

    if(id == 1)
    {

      return this. getAllVehicles();

    }else
    {
      return this.http.get<{ vehicles: Vehicle[] }>(VEHICLES_BY_USER_ID_URL + id);

    }

}
}
