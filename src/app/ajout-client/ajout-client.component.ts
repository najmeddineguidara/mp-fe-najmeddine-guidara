// ajout-client.component.ts
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import Client from '../model/clients';

@Component({
  selector: 'app-ajout-client',
  templateUrl: './ajout-client.component.html',
  styleUrls: ['./ajout-client.component.css']
})
export class AjoutClientComponent {

  nouveauClient = new Client();

  constructor(private clientsService: ClientsService) {}

  validerFormulaire(form: NgForm) {
    if (form.valid) {
      // Set automatic values before adding a new client
      this.nouveauClient.dateInscription = new Date(); // Set current date
      this.nouveauClient.chiffreAffaires = this.calculateChiffreAffaires(); // Calculate chiffreAffaires
      this.nouveauClient.actif = false; // Set default value for actif

      // Call the service to add a new client
      this.clientsService.addClient(this.nouveauClient)
        .subscribe(
          (response) => {
            console.log('Client added successfully:', response);
            // Reset the form and clear the new client data
            form.reset();
            this.nouveauClient = new Client();
          },
          (error) => {
            console.error('Error adding client:', error);
          }
        );
    } else {
      console.log('Form is not valid. Please check your input.');
    }
  }

  private calculateChiffreAffaires(): number {
    // Implement your logic to calculate chiffreAffaires
    // For example, you can generate a random value or calculate based on other factors.
    // Here, I'm just returning a random value as an example.
    return Math.floor(Math.random() * 100000);
  }
}
