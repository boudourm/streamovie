import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { MovieGenre, MovieResponse } from '../tmdb-data/Movie';
import { CastResponse } from '../tmdb-data/Cast';
import { PanierService } from '../panier.service';
import { Achat } from '../dataInterfaces/achat';
import { ListeService } from '../liste.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '../snack-bar.service';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {

  public genres: MovieGenre[];
  public movie: MovieResponse;
  public myFavoriteMovieID: number[];
  public cast: CastResponse[];
  public videoUrl: string;
  public posterUrl: string;
  public backdropUrl: string;
  public similarMovie: MovieResponse[];
  public ok = false;
  public isWishlist = false;

  constructor(
    public _snackBar: MatSnackBar,
    public route: ActivatedRoute,
    public tmdb: TmdbService,
    public panier: PanierService,
    public ls: ListeService,
    public auth: AuthService,
    public snackBar: SnackBarService
  ) {
    this.ok = false;
  }


  async ngOnInit() {


  }

  // tslint:disable-next-line:use-life-cycle-interface
  async ngAfterViewInit() {
    this.route.params.subscribe(async routeParams => {
      this.movie = await this.tmdb.getMovie(+routeParams.id);
      // this.movie = this.tmdb.getMyMovie();

      this.posterUrl = 'http://image.tmdb.org/t/p/w300_and_h450_bestv2/' + this.movie.poster_path;
      this.backdropUrl = 'http://image.tmdb.org/t/p/w1400_and_h450_face/' + this.movie.backdrop_path;
      this.videoUrl = this.tmdb.getVideo(this.movie.id)[0];
      this.similarMovie = await this.tmdb.getSimilarMovie(this.movie.id);
      this.similarMovie = this.similarMovie.slice(0, 7);
      /*
        this.similarMovie = this.similarMovie.splice(0,3);

        */
      /*
      await this.tmdb.getGenres().then(data => {
        this.genres = data['genres'].filter((g) => this.movie.genre_ids.includes(g.id));
        this.movie.genres = this.genres;
      });
      */
      this.ok = false;
      this.cast = await this.tmdb.getCredits(this.movie.id);
      this.cast = this.cast.splice(0, 5);
      const date = new Date(this.movie.release_date);
      this.movie.release_date = date.getFullYear().toString();


      const elementBackDrop: HTMLElement = document.querySelector('#backdrop');
      elementBackDrop.style.backgroundImage = 'url(' + this.backdropUrl + ')';
    });
    //  elementContainerBackDrop.style.backgroundImage =
    //  'radial-gradient(circle at 20% 50%, rgba('+r1+'%, '+g1+'%,'+b1+'%, 0.98) 0%, rgba('+r2+'%,'+g2+'%,'+b2+'%, 0.88) 100%)';
  }



  getBackDropURL(movie: MovieResponse) {
    return 'http://image.tmdb.org/t/p/w1400_and_h450_face/' + movie.backdrop_path;
  }

  getPosterURL(movie: MovieResponse) {
    return 'http://image.tmdb.org/t/p/w300_and_h450_bestv2/' + movie.poster_path;
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
