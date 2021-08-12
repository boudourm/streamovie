import { Component, Input, OnInit } from '@angular/core';
import { MovieResponse } from '../tmdb-data/Movie';
import { TmdbService } from '../tmdb.service';
import { Achat } from '../dataInterfaces/achat';
import { PanierService } from '../panier.service';
import { SnackBarService } from '../snack-bar.service';
import { ListeService } from '../liste.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-movie-as-list',
  templateUrl: './movie-as-list.component.html',
  styleUrls: ['./movie-as-list.component.css']
})
export class MovieAsListComponent implements OnInit {

  @Input() public movie: MovieResponse;
  public poster_path = 'https://image.tmdb.org/t/p/w92/';

  constructor(
    public tmbd: TmdbService,
    public panier: PanierService,
    public snackBar: SnackBarService,
    public ls: ListeService,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  setSearch() {
    this.tmbd.searching = true;
  }

  thisMovieIsInMyFavorite(): boolean {
    return this.ls.favoris.includes(this.movie.id);
  }

  ajoutPanier() {
    (this.movie);
    const article: Achat = {
      id: String(this.movie.id),
      nom: this.movie.title,
      overview: this.movie.overview,
      photo: this.poster_path + this.movie.poster_path,
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
      photo: this.poster_path + this.movie.poster_path,
      quantite: 1,
      isMovie: 1,
      prix: 5
    };
    this.panier.supprimerArticleDuPanier(article);
  }
}
