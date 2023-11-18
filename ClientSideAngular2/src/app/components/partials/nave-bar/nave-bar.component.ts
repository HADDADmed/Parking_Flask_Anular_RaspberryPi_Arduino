import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nave-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nave-bar.component.html',
  styleUrl: './nave-bar.component.css'
})
export class NaveBarComponent {

  public isCollapsed = true;


     

}
