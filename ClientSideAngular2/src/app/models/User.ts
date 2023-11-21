import { Vehicle } from "./Vehicle";

export interface User {
  id: number;
  name: string;
  username: string;
  age : number;
  password: string;
  vehicles: Vehicle[];
}
