import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from "../../../partials/side-bar/side-bar.component";
import { UserService } from '../../../../services/user/user.service';

@Component({
    selector: 'app-add-user',
    standalone: true,
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.css',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SideBarComponent]
})
export class AddUserComponent {

  addUserForm = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    age: new FormControl(''),
    phone: new FormControl(''),
  })

constructor(private userService: UserService) {}

  saveUser() {
    this.userService.saveUser({
      name: this.addUserForm.value.name ?? '',
      username: this.addUserForm.value.username ?? '',
      password: this.addUserForm.value.password ?? '',
      age: this.addUserForm.value.age ?? '',
      phone: this.addUserForm.value.phone ?? ''
    }).subscribe(
      response => {
        console.log(response); // Handle the response if needed
        this.addUserForm.reset();
      },
      error => {
        console.error('Error saving user:', error);
      }
    );
  }

}
