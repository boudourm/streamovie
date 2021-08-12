import { Injectable } from '@angular/core';
import { Commande } from './dataInterfaces/commande';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { PanierService } from './panier.service';
import { Facture, FactureWithName } from './dataInterfaces/facture';
import { TmdbService } from './tmdb.service';
import { HttpsHelperService } from './https-helper.service';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  public commandes: Commande[];
  public factures: Facture[];
  public factureWithName: FactureWithName[];
  public userID: string;

  constructor(
    public http: HttpClient,
    public auth: AuthService,
    public panier: PanierService,
    public httpsHelper: HttpsHelperService,
    public tmdb: TmdbService
  ) {
    this.commandes = [];
    this.factures = [];
    this.factureWithName = [];
  }

  async getCommandes() {
    this.factureWithName = [];
    this.factures = [];
    this.userID = this.auth.client.id;
    const params: { [key: string]: string } = {};
    params.idUtilisateur = this.auth.client.id;
    const res = await this.httpsHelper.GET('/commandes', params);
    this.factures = res.data.achats;
    if (this.factures !== undefined) {
      let index = 0;
      this.factures.forEach((value) => {
        const f: FactureWithName = { films: [] };
        f.date = value.date;
        value.films.forEach(async (value1) => {
          f.films.push((await this.tmdb.getMovie(value1)).title);
        });
        this.factureWithName.push(f);
        index++;
      });
    }

  }


  async enregistrerCommande() {

    const date = new Date();

    const idFilmsPanier = this.panier.commande.map(film => {
      return film.id;
    });

    const data = {
      idUtilisateur: this.auth.client.id,
      films: idFilmsPanier,
      date: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear() + ' ' + date.getHours() + 'h' + date.getMinutes() + 'm'
    };



    const res = await this.httpsHelper.POST('/commandes', data);
    return res.achats.achats.length;
  }



}
