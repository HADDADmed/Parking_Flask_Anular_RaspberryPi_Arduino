import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../../partials/side-bar/side-bar.component";

@Component({
    selector: 'app-users-list',
    standalone: true,
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.css',
    imports: [CommonModule, SideBarComponent]
})
export class UsersListComponent {

}
