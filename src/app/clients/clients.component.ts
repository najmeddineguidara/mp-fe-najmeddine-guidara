// clients.component.ts
import { Component, OnInit } from '@angular/core';
import Client from '../model/clients';
import { NgForm } from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Array<Client> = [];
  clientCourant = new Client();
  modeEdition = false;
  searchTerm = '';  

  constructor(private clientsService: ClientsService , private router: Router) {}

  ngOnInit(): void {
    // Load all clients by default
    this.loadClientsWithChiffreAffaires();
    this.updateActifStatus(); // Update the client status when the component initializes
  }

  editClient(c: Client) {
    this.clientCourant.id = c.id;
    this.clientCourant.nom = c.nom;
    this.clientCourant.prenom = c.prenom;
    this.clientCourant.numero = c.numero;
    this.clientCourant.adresse = c.adresse;
    this.clientCourant.actif = c.actif;
    this.clientCourant.chiffreAffaires = c.chiffreAffaires;
    this.clientCourant.dateInscription = c.dateInscription;

    this.modeEdition = true;
  }

  validateForm(form: NgForm) {
    console.log(form.value);
    let isNew: boolean = true;
    let index = 0;
    do {
      let c = this.clients[index];
      console.log(
        c.nom + ': ' +
        c.prenom);
      if (c.id == form.value.id) {
        isNew = false;
        console.log('Existing client');
        let response: boolean = confirm("Existing client. Do you confirm the update for: " + c.nom + "?");
        if (response) {
          this.updateClient(form.value, c);
          this.modeEdition = false;
        } else {
          console.log("Update canceled");
        }
        return;
      } else {
        index++;
      }
    } while (isNew && index < this.clients.length);
  }

  updateClient(updated: Client, current: Client) {
    this.clientsService.updateClient(current.id, updated)
      .subscribe({
        next: modifiedClient => {
          console.log("PUT Success");
          current.nom = updated.nom;
          current.prenom = updated.prenom;
          current.numero = updated.numero;
          current.adresse = updated.adresse;
          current.chiffreAffaires = updated.chiffreAffaires;
          current.dateInscription = updated.dateInscription;

          console.log('Update of the client: ' + current.nom);
        },
        error: err => {
          console.log("PUT Error");
        }
      });
  }

  updateActifStatus() {
    const currentYear = new Date().getUTCFullYear();
    this.clients.forEach((client) => {
      const yearOfInscription = new Date(Client.dateinscription).getUTCFullYear();
      client.actif = yearOfInscription === currentYear;
    });
  }

  deleteClient(c: Client) {
    let response: boolean = confirm("Do you want to delete the client: " + c.nom + "?");
    if (response) {
      this.clientsService.deleteClient(c.id)
        .subscribe({
          next: () => {
            const index: number = this.clients.indexOf(c);
            if (index !== -1) {
              this.clients.splice(index, 1);
              console.log("Deletion of the client: " + c.nom);
              
              // Reload the current route (refresh the page)
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.navigate([this.router.url]);
            } else {
              console.log("Client not found in the local array.");
            }
          },
          error: err => {
            console.log("DELETE Error", err);
          }
        });
        window.location.reload()
    } else {
      console.log("Deletion canceled.");
    }
  }

  performSearch() {
    if (this.searchTerm) {
      this.clientsService.searchClientsWithChiffreAffaires(this.searchTerm).subscribe(
        (data) => {
          this.clients = data;
          this.updateActifStatus(); // Update the client status after performing search
        },
        (error) => {
          console.error('Error fetching clients:', error);
        }
      );
    } else {
      // If the search term is empty, fetch all clients
      this.clientsService.getClientsWithChiffreAffaires().subscribe(
        (data) => {
          this.clients = data;
          this.updateActifStatus(); // Update the client status after fetching all clients
        },
        (error) => {
          console.error('Error fetching clients:', error);
        }
      );
    }
  }

  filterClients(actif: boolean) {
    if (actif) {
      // Filter active clients
      this.clients = this.clients.filter((client) => client.actif === true);
    } else {
      // Filter inactive clients
      this.clients = this.clients.filter((client) => client.actif === false);
    }
  }

  loadClientsWithChiffreAffaires() {
    this.clientsService.getChiffreAffaires().subscribe(
      (data: Client[]) => {
        this.clients = data;
        this.updateActifStatus(); // Update the client status after loading clients with Chiffre Affaires
      },
      (error) => {
        console.error('Error loading clients with Chiffre Affaires:', error);
      }
    );
  }
}
