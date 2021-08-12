import { Component, Input, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { Achat } from '../dataInterfaces/achat';
import { PanierService } from '../panier.service';
import { ListeService } from '../liste.service';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../snack-bar.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() public movie: MovieResponse;
  public posterUrl: string;
  public isCollapsed = true;
  public article: Achat;
  public ok: boolean;
  public isWishlist = false;
  public shortOverview = '';

  constructor(
    public _snackBar: MatSnackBar,
    public tmdb: TmdbService,
    public panier: PanierService,
    public ls: ListeService,
    public auth: AuthService,
    public snackBar: SnackBarService
  ) { }

  ngOnInit() {
    this.posterUrl = 'http://image.tmdb.org/t/p/w185/' + this.movie.poster_path;
    const lengthOfExtraction = 150;
    this.shortOverview = this.movie.overview.slice(0, lengthOfExtraction);
    if (this.movie.overview.length > lengthOfExtraction) {
      this.shortOverview = this.shortOverview + '...';

    }
  }



  thisMovieIsInMyFavorite(): boolean {
    return this.ls.favoris.includes(this.movie.id);
  }



  ajoutPanier() {

    const article: Achat = {
      id: String(this.movie.id),
      nom: this.movie.title,
      overview: this.movie.overview,
      photo: this.posterUrl,
      quantite: 1,
      isMovie: 1,
      prix: 5
    };

    this.panier.ajoutPanier(article);
  }

  supprimerArticleDuPanier() {
    const article: Achat = {
      id: String(this.movie.id),
      nom: this.movie.title,
      overview: this.movie.overview,
      photo: this.posterUrl,
      quantite: 1,
      isMovie: 1,
      prix: 5
    };
    this.panier.supprimerArticleDuPanier(article);
  }


}
