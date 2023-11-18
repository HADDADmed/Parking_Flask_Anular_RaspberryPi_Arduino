import { Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginComponent } from './components/pages/user/login/login.component';
import { AddUserComponent } from './components/pages/user/add-user/add-user.component';
import { AddVehicleComponent } from './components/pages/vehicle/add-vehicle/add-vehicle.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user/add-user', component: AddUserComponent },
  { path: 'vehicle/add-vehicle', component: AddVehicleComponent },

];
