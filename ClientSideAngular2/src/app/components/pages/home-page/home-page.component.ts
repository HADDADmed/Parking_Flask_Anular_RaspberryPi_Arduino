import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaveBarComponent } from "../../partials/nave-bar/nave-bar.component";
import { SideBarComponent } from "../../partials/side-bar/side-bar.component";

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
    imports: [CommonModule, NaveBarComponent, SideBarComponent]
})
export class HomePageComponent {

}
