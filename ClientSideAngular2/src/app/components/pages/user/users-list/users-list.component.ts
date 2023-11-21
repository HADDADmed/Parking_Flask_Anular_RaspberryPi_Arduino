import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../../partials/side-bar/side-bar.component";
import { UserService } from '../../../../services/user/user.service';
import { User } from '../../../../models/User';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'], // Use styleUrls instead of styleUrl
  imports: [CommonModule, SideBarComponent]
})

export class UsersListComponent implements OnInit {

  users: User[] = [];
  users2: any[] = [];

  constructor(private userService: UserService) {


  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data: any) => {
        // Check if the returned data is an array or an object
        if (Array.isArray(data)) {
          this.users = data;
        } else if (typeof data === 'object' && data !== null) {
          // If it's an object, convert it to an array (assuming an array is present in the object structure)
          this.users = Object.values(data);
        }

        console.log("users 1");
        console.log(data);

        this.users2 = data;
        console.log("users 2");
        console.log(this.users);
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
