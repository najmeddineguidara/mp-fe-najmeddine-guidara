import { Component } from '@angular/core';
import  Client  from './model/clients'; // Adjust the path based on your actual structure

// Rest of your code
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  actions: Array<any> = [
    { titre: "Accueil", route: "/accueil" },
    { titre: "Liste des clients", route: "/clients" }, // Updated to clients based on the model
    { titre: "Ajouter Client", route: "/ajouterClient" } // Updated to ajouterClient based on the model
  ];

  actionCourante: any;

  setActionCourante(a: any) {
    this.actionCourante = a;
  }
}
