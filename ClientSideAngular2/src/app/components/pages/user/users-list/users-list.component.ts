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
    // Move the logic inside the subscribe block to ensure data is fetched before logging or using it
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;

        console.log("users 1");
        console.log(data);

        // Build an iterable array

         


        console.log("users 2");
        console.log(this.users);
      }
    );

    // Logging here won't give the expected result as the request is asynchronous
    // console.log("users 3");
    // console.log(this.users);
  }
}
