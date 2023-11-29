import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Dashboard } from '../interfaces/dashboard';
import { HttpClient } from '@angular/common/http';
import { DASHBOARD_URL } from '../constants/URLS';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // dashboard variable
  dashboard: Dashboard = {
    nbr_vehicles: 0,
    nbr_users: 0,
    nbr_subscriptions: 0,
    nbr_statuss: 0,
    nbr_statussVehicule: 0,
    availablePlaces: 0
  };

  constructor(private http :HttpClient) {


  }

  getAllDashboardStats() :Observable<{ dashboard: Dashboard }> {
    return this.http.get<{ dashboard: Dashboard }>(DASHBOARD_URL);
  }

}
