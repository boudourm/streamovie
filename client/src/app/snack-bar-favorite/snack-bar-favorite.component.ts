import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack-bar-favorite',
  templateUrl: './snack-bar-favorite.component.html',
  styleUrls: ['./snack-bar-favorite.component.css']
})
export class SnackBarFavoriteComponent implements OnInit {

  public mode: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.mode = data;

  }

  ngOnInit() {
  }

}
