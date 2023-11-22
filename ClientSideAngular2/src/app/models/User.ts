import { Vehicle } from "./Vehicle";

export class User {
  id: number = 0;
  name: string;
  username: string;
  age: number;
  password: string;
  phone: number;
  vehicles: Vehicle[];
  isAdmin: boolean;

  constructor(name: string, username: string, password: string, age: number, phone: number) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.age = age;
    this.phone = phone;
    this.vehicles = []; // Assuming you want to initialize vehicles as an empty array
    this.isAdmin = false; // Assuming you want to initialize isAdmin as false
  }
}
