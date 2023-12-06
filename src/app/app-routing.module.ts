import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ClientsComponent } from './clients/clients.component';
import { AjoutClientComponent } from './ajout-client/ajout-client.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'clients', component: ClientsComponent }, // Adjusted the path to 'clients'
  { path: 'ajouterClient', component: AjoutClientComponent }, // Adjusted the path to 'ajouterClient'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
