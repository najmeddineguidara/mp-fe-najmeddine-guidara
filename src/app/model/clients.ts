// client.model.ts
export default class Client {
  public id: number | undefined;
  public nom: string | undefined;
  public prenom: string | undefined;
  public numero: string | undefined;
  public adresse: string | undefined;
  public actif: boolean | undefined;
  public chiffreAffaires: number | undefined;
  public dateInscription: Date | undefined;
  public factures: Facture[] | undefined;
  static dateinscription: string | number | Date;

  constructor() {
    // Add any additional initialization logic if needed
  }
}

export interface Facture {
  id?: number;
  numeroFacture: string;
  montant: number;
  dateFacturation: Date;
  client: Client;  // Link to the associated client
  // ... other properties
}
