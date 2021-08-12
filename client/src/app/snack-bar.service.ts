import { Injectable } from '@angular/core';
import { SnackBarFavoriteComponent } from './snack-bar-favorite/snack-bar-favorite.component';
import { SnackBarPanierComponent } from './snack-bar-panier/snack-bar-panier.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(
    public _snackBar: MatSnackBar
  ) { }

  openSnackBarAddFavorite() {
    this._snackBar.openFromComponent(SnackBarFavoriteComponent, {
      data: 'add',
      duration: 4000
    });
  }

  openSnackBarDeleteFavorite() {
    this._snackBar.openFromComponent(SnackBarFavoriteComponent, {
      data: 'delete',
      duration: 4000
    });
  }

  openSnackBarAddPanier() {
    this._snackBar.openFromComponent(SnackBarPanierComponent, {
      data: 'add',
      duration: 4000
    });
  }

  openSnackBarDeletePanier() {
    this._snackBar.openFromComponent(SnackBarPanierComponent, {
      data: 'delete',
      duration: 4000
    });
  }

}
