import { Subscription } from './Subscription';
import { StatussVehicle } from "./StatussVehicle";
import { User } from "./User";


export interface Vehicle {
  id: number;
  name: string;
  model: string;
  matricule: string;
  user: User;
  statuses: StatussVehicle[],
  subscription: Subscription;
  user_id: number;

}


