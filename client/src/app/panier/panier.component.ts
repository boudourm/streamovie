import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';
import { CommandeService } from '../commande.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  public idfact;
  public issShown = false;
  public valDelete = 'supprimer';
  public isLinear = true;
  public cmdDone;


  constructor(
    public panier: PanierService,
    public commande: CommandeService,
    public route: Router,
    public auth: AuthService
  ) { }


  ngOnInit() {
    this.cmdDone = false;
  }

  async passerCommande() {
    this.idfact = await this.commande.enregistrerCommande();
    //this.route.navigate(['/facture/' + this.idfact]);
    this.cmdDone = true;
    this.panier.commande = [];

  }
  get isShown(): boolean {
    return this.issShown;
  }
  showDeletes() {
    if (this.issShown === false) {
      this.issShown = true;
      this.valDelete = 'valider';
    } else {
      this.issShown = false;
      this.valDelete = 'supprimer';
    }
  }

}
