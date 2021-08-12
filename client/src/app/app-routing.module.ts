import { Routes, RouterModule } from '@angular/router';
import { CompteComponent } from './compte/compte.component';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FactureComponent } from './facture/facture.component';
import { NgModule } from '@angular/core';
import { FactureListComponent } from './facture-list/facture-list.component';
import { FavorisComponent } from './favoris/favoris.component';
import { PanierComponent } from './panier/panier.component';

import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'compte', component: CompteComponent },
  { path: 'home', component: HomeComponent },
  { path: 'recherche', component: MovieComponent },
  { path: 'film/:id/:nom', component: MovieDetailComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'factures', component: FactureListComponent },
  { path: 'favoris', component: FavorisComponent },
  { path: 'facture/:id_facture', component: FactureComponent },
  { path: 'films', component: MovieListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
