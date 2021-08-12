import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack-bar-panier',
  templateUrl: './snack-bar-panier.component.html',
  styleUrls: ['./snack-bar-panier.component.css']
})
export class SnackBarPanierComponent implements OnInit {
  public mode: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.mode = data;

  }

  ngOnInit() {
  }

}
