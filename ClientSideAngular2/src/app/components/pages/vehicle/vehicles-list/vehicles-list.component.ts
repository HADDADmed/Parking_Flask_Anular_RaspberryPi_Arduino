import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../../partials/side-bar/side-bar.component";

@Component({
    selector: 'app-vehicles-list',
    standalone: true,
    templateUrl: './vehicles-list.component.html',
    styleUrl: './vehicles-list.component.css',
    imports: [CommonModule, SideBarComponent]
})
export class VehiclesListComponent {

}
