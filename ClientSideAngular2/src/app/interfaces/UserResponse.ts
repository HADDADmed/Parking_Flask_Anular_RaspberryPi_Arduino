import { User } from "../models/User";

export interface UserResponse {
  status: number;
  message: string;
  isAdmin: boolean;
  user: User;
}
