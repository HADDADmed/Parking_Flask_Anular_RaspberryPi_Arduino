import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AddUserComponent } from './components/pages/user/add-user/add-user.component';
import { AddVehicleComponent } from './components/pages/vehicle/add-vehicle/add-vehicle.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { UsersListComponent } from './components/pages/user/users-list/users-list.component';
import { VehiclesListComponent } from './components/pages/vehicle/vehicles-list/vehicles-list.component';
import { UserDashboardComponent } from './components/pages/user-dashboard/user-dashboard.component';
export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/add-user', component: AddUserComponent },
  { path: 'user/users-list', component: UsersListComponent },
  { path: 'vehicle/add-vehicle', component: AddVehicleComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vehicle/vehicles-list', component: VehiclesListComponent },
  { path: 'user-dashboard', component: UserDashboardComponent}

];
