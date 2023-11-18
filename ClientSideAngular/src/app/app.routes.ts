import { Routes } from '@angular/router';
import {AuthComponent} from './components/pages/auth/auth.component';
import {HomePageComponent} from './components/pages/home-page/home-page.component';

export const routes: Routes = [
  {path:'auth', component: AuthComponent},
  {path: '', component: HomePageComponent},
];

