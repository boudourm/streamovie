import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TmdbService } from './tmdb.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { FormsModule } from '@angular/forms';
import { CompteComponent } from './compte/compte.component';
import { HomeComponent } from './home/home.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { PanierComponent } from './panier/panier.component';
import { PanierItemComponent } from './panier-item/panier-item.component';
import { FactureComponent } from './facture/facture.component';
import { FactureListComponent } from './facture-list/facture-list.component';
import { tri } from './tri';
import { FavorisComponent } from './favoris/favoris.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SnackBarFavoriteComponent } from './snack-bar-favorite/snack-bar-favorite.component';
import { SnackBarPanierComponent } from './snack-bar-panier/snack-bar-panier.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { OwlModule } from 'ngx-owl-carousel';
import { ReactiveFormsModule } from '@angular/forms';


import { MatStepperModule } from '@angular/material/stepper';

import { PanierOverComponent } from './panier-over/panier-over.component';
import { MatTableModule } from '@angular/material/table';

import { MatMenuModule } from '@angular/material/menu';
import { MovieAsListComponent } from './movie-as-list/movie-as-list.component';
import { IdToGenrePipe } from './id-to-genre.pipe';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatExpansionModule,
  MatInputModule,
  MatRippleModule
} from '@angular/material';
import { NgxHmCarouselModule } from 'ngx-hm-carousel';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MovieComponent,
    MovieListComponent,
    CompteComponent,
    HomeComponent,
    MovieDetailComponent,
    PanierComponent,
    PanierItemComponent,
    FactureComponent,
    FactureListComponent,
    tri,
    FavorisComponent,
    SnackBarFavoriteComponent,
    SnackBarPanierComponent,
    PanierOverComponent,
    MovieAsListComponent,
    IdToGenrePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase,
      'my-app-name'),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatMenuModule,
    OwlModule,
    MatTableModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatListModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatRippleModule,
    MatInputModule,
    MatCardModule,
    NgxHmCarouselModule

  ],
  entryComponents: [SnackBarFavoriteComponent, SnackBarPanierComponent],
  providers: [
    TmdbService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
