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
  constructor(private userService: UserService) {


  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      data => {
        console.log('Received data:', data);
  
        if (data && Array.isArray(data.users)) {
          this.users = data.users;
        } else {
          console.error('Invalid data structure:', data);
        }
  
        // Other logic...
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
  
  
  
}
