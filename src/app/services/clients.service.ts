  // clients.service.ts
  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, catchError } from 'rxjs';
  import Client from '../model/clients';

  @Injectable({
    providedIn: 'root'
  })
  export class ClientsService {
    // Update the apiUrl based on your backend URL
    private apiUrl = 'http://localhost:8081/clients';

    constructor(private http: HttpClient) {}
    getChiffreAffaires(): Observable<Client[]> {
      return this.http.get<Client[]>(`${this.apiUrl}/chiffreAffaires`)
        .pipe(
          catchError(error => {
            console.error('GET Chiffre Affaires Error:', error);
            throw error; // Rethrow the error for further handling
          })
        );
    }
    searchClientsWithChiffreAffaires(nom: string): Observable<Client[]> {
      return this.http.get<Client[]>(`${this.apiUrl}/searchWithChiffreAffaires?nom=${nom}`);
    }

    getClients(): Observable<Client[]> {
      return this.http.get<Client[]>(this.apiUrl, {
        headers: { 'Access-Control-Allow-Origin': '*', Accept: 'application/json' }
      });
    }

    getClientsWithActifStatus(): Observable<Client[]> {
      return this.http.get<Client[]>(`${this.apiUrl}/statutActivite`);
    }

    addClient(newClient: Client): Observable<Client[]> {
      return this.http.post<Client[]>(this.apiUrl, newClient);
    }

    updateClient(id: number | undefined, updatedClient: Client): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, updatedClient);
    }

    deleteClient(id: number | undefined): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`)
        .pipe(
          catchError(error => {
            console.error('DELETE Error:', error);
            throw error; // Rethrow the error for further handling
          })
        );
    }
    searchClientsByName(nom: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/search?nom=${nom}`);
    }
    getActiveClients(): Observable<Client[]> {
      return this.http.get<Client[]>(`${this.apiUrl}/actif`);
    }
    
    getInactiveClients(): Observable<Client[]> {
      return this.http.get<Client[]>(`${this.apiUrl}/inactif`);
    }
      getClientsWithChiffreAffaires(): Observable<Client[]> {
        return this.http.get<Client[]>(`${this.apiUrl}/clientsWithChiffreAffaires`);
      }
      
  }
