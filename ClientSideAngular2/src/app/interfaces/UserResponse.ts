import { User } from './../../../../ClientSideAngular/src/shared/models/User';
export interface UserResponse {
  status: number;
  message: string;
  isAdmin: boolean;
  user: User;
}
