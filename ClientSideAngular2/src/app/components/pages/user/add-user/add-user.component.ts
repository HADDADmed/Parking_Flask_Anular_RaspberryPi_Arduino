import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from "../../../partials/side-bar/side-bar.component";

@Component({
    selector: 'app-add-user',
    standalone: true,
    templateUrl: './add-user.component.html',
    styleUrl: './add-user.component.css',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SideBarComponent]
})
export class AddUserComponent {

  addUserForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    genderM: new FormControl(''),
    genderF: new FormControl(''),
    age: new FormControl(''),
  })


    saveUser() {
      console.log("this.addUserForm.value :") ;
      console.log(this.addUserForm.value) ;
    }

}
