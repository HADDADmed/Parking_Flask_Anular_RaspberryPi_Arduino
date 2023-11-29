import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
import { User } from '../../../models/User';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content } from 'pdfmake/interfaces';
import { Vehicle } from '../../../models/Vehicle';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

  @Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})

export class SideBarComponent {

    user : User;

    vehicles : Vehicle[] = [];
    constructor(
      private router: Router,
      private vehicleService : VehicleService

  ) {

    if (typeof localStorage !== 'undefined') {
      // Use localStorage
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      // Fallback if localStorage is not available
      this.user = new User( '', '', '', 1, 1);
    }
    
    this.vehicleService.getVehiclesByUserId(this.user.id?this.user.id:1).subscribe({
      next: (data: { vehicles: Vehicle[] }) => {
        console.log('Received vehicle data:', data);

        if (data && Array.isArray(data.vehicles)) {
          this.vehicles = data.vehicles;
        } else {
          console.error('Invalid vehicle data structure:', data);
        }

        // Other logic...
      },
      error: (error: any) => {
        console.error('Error fetching vehicles:', error);
      },
      complete: () => {
        // Optional: logic to execute on completion
      }
    });


}

  redirectTo( path: string){
    this.router.navigate([path]);
  }



  generatePdfAllvehils() {
    // Define the document content array to store content for all vehicles
    const allVehiclesContent: Content[] = [];

    // Iterate through all vehicles
    this.vehicles.forEach((vehicle) => {
      // Define the data for the main table (vehicle details)
      const mainTableData = [
        ['Name', vehicle.name || 'N/A'],
        ['Matricule', vehicle.matricule || 'N/A'],
        ['Model', vehicle.model || 'N/A'],
        ['Abonnement', vehicle.subscription ? vehicle.subscription.type : 'N/A'],
        ['Utilisateur', vehicle.user_id || 'N/A'],
        // Add other properties as needed
      ];

      // Define the layout and style for the main table
      const mainTable = {
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: mainTableData,
        },
      };

      // Define the data for the statuses table
      const statusesTableData = [
        ['#id', 'Date', 'Status', 'Time Left in Hours'],
        ...vehicle.statuses.map((status) => [
          status.id,
          status.date,
          status.status_type,
          status.time_left_in_hours,
        ]),
      ];

      // Define the layout and style for the statuses table
      const statusesTable = {
        table: {
          headerRows: 1,
          widths: ['auto', 'auto', 'auto', 'auto'],
          body: statusesTableData,
        },
      };

      // Add content for the current vehicle to the allVehiclesContent array
      allVehiclesContent.push(
        { text: 'Vehicle Report', style: 'title' },
        mainTable,
        { text: 'Statuses', style: 'subtitle' },
        statusesTable
      );
    });

    // Define the document styles
    const styles = {
      title: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10] as [number, number, number, number],
      },
      subtitle: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5] as [number, number, number, number],
      },
    };

    // Define the document definition with content for all vehicles
    const documentDefinition = {
      content: allVehiclesContent,
      styles,
    };

    // Generate and open the PDF
    pdfMake.createPdf(documentDefinition).open();
  }
 }

