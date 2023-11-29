import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import { USER_ADD_URL } from '../../constants/URLS';
import { USERS_URL} from '../../constants/URLS';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(
    private http: HttpClient
  ) { }


   getAllUsers() : Observable<{ users: User[] }>
    {
      return this.http.get<{ users: User[] }>(USERS_URL);
}
saveUser(userData: any): Observable<any> {
  return this.http.post(USER_ADD_URL, userData);
}

getUserFromLocalStorage () : User {
  return JSON.parse(localStorage.getItem('user') ?? '{}') ;
}
}
