import { Component, OnInit, Input } from '@angular/core';
import { Achat } from '../dataInterfaces/achat';
import { PanierService } from '../panier.service';



@Component({
  selector: 'app-panier-item',
  templateUrl: './panier-item.component.html',
  styleUrls: ['./panier-item.component.css']
})
export class PanierItemComponent implements OnInit {
  @Input() public produit: Achat;
  @Input() public isShown: boolean;

  constructor(
    public panier: PanierService
  ) {
  }

  ngOnInit() {
  }

  supp() {
    this.panier.supprimerArticleDuPanier(this.produit);
  }

  //
}
