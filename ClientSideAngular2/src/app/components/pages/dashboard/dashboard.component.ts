import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../partials/side-bar/side-bar.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [CommonModule, SideBarComponent]
})
export class DashboardComponent {

}
