import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';

@Component({
  selector: 'app-panier-over',
  templateUrl: './panier-over.component.html',
  styleUrls: ['./panier-over.component.css']
})
export class PanierOverComponent implements OnInit {

  public displayedColumns: string[] = ['Affiche', 'Nom'];
  constructor(
    public panier: PanierService
  ) { }

  ngOnInit() {
  }

}
