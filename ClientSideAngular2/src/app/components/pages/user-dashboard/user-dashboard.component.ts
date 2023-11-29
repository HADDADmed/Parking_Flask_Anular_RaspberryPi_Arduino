import { Vehicle } from './../../../models/Vehicle';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../partials/side-bar/side-bar.component";
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { User } from '../../../models/User';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content } from 'pdfmake/interfaces';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
    selector: 'app-user-dashboard',
    standalone: true,
    templateUrl: './user-dashboard.component.html',
    styleUrl: './user-dashboard.component.css',
    imports: [CommonModule, SideBarComponent]
})
export class UserDashboardComponent {

  user : User;
  vehicles : Vehicle[] = [];
  constructor(
    private vehicleService : VehicleService
  ){

    if (typeof localStorage !== 'undefined') {
      // Use localStorage
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    } else {
      // Fallback if localStorage is not available
      this.user = new User( '1', '1', '', 1, 1);
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


  // generatePdf(vehicleId: number) {
  //   // Find the vehicle with the specified ID
  //   const selectedVehicle = this.vehicles.find((vehicle) => vehicle.id === vehicleId);

  //   console.log('Selected vehicle: ');
  //   console.log(selectedVehicle);
  //   if (selectedVehicle) {
  //     // Define your table data using selectedVehicle properties
  //     const tableData = [
  //       ['Name', selectedVehicle.name],
  //       ['Matricule', selectedVehicle.matricule],
  //       ['Model', selectedVehicle.model],
  //       ['Abonnement', selectedVehicle.subscription.type],
  //       ['Utilisateur', selectedVehicle.user_id],
  //       // Add other properties as needed
  //     ];

  //     // Define the table layout and style
  //     const table = {
  //       table: {
  //         headerRows: 1,
  //         widths: ['*', '*'],
  //         body: tableData,
  //       },
  //     };

  //     // Add a title and the table to the document definition
  //     const documentDefinition = {
  //       content: [
  //         { text: 'Vehicle Report', style: 'title' },
  //         table,
  //       ],
  //       styles: {
  //         title: {
  //           fontSize: 18,
  //           bold: true,
  //           margin: [0, 0, 0, 10] as [number, number, number, number],
  //         },
  //       },
  //     };

  //     // Generate and open the PDF
  //     pdfMake.createPdf(documentDefinition).open();
  //   } else {
  //     console.error('Vehicle not found for ID:', vehicleId);
  //   }
  // }
  generatePdf(vehicleId: number) {
    // Find the vehicle with the specified ID
    const selectedVehicle = this.vehicles.find((vehicle) => vehicle.id === vehicleId);

    if (!selectedVehicle) {
      console.error('Vehicle not found for ID:', vehicleId);
      return;
    }

    // Define the data for the main table (vehicle details)
    const mainTableData = [
      ['Name', selectedVehicle.name || 'N/A'],
      ['Matricule', selectedVehicle.matricule || 'N/A'],
      ['Model', selectedVehicle.model || 'N/A'],
      ['Abonnement', selectedVehicle.subscription ? selectedVehicle.subscription.type : 'N/A'],
      ['Utilisateur', selectedVehicle.user_id || 'N/A'],
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
      ...selectedVehicle.statuses.map((status) => [
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

    // Define the document content
    const content = [
      { text: 'Vehicle Report', style: 'title' },
      mainTable,
      { text: 'Statuses', style: 'subtitle' }, // Add a subtitle for the statuses table
      statusesTable,
    ];

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

    // Define the document definition
    const documentDefinition = {
      content,
      styles,
    };

    // Generate and open the PDF
    pdfMake.createPdf(documentDefinition).open();
  }


}
