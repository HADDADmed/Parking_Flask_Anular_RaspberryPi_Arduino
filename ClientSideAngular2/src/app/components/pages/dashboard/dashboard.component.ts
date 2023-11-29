import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../partials/side-bar/side-bar.component";
import { DashboardService } from '../../../services/dashboard.service';
import { Dashboard } from '../../../interfaces/dashboard';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, SideBarComponent]
})
export class DashboardComponent {

  // dashboard variable
  dashboard: Dashboard = {
    nbr_vehicles: 0,
    nbr_users: 0,
    nbr_subscriptions: 0,
    nbr_statuss: 0,
    nbr_statussVehicule: 0,
    availablePlaces: 0
  };

 constructor(private dashboardService: DashboardService) {
  this.dashboardService.getAllDashboardStats().subscribe(
    {
      next: (data: { dashboard: any }) => {
        // Handle the data received from the service
        console.log('Dashboard stats:', data.dashboard);

        // You can perform additional logic or assign the data to a property
        // For example:
         this.dashboard = data.dashboard;
         console.log("this.dashboard :" )
         console.log(this.dashboard )
      },
      error: (error: any) => {
        console.error('Error fetching dashboard stats:', error);
      },
      complete: () => {
        // Optional: logic to execute on completion
        console.log('Dashboard stats fetching completed.');
      }
    }
  );
}




}
