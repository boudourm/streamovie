import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TmdbService } from '../tmdb.service';
import { MovieGenre, MovieResponse } from '../tmdb-data/Movie';
import { MovieResult, SearchMovieResponse } from '../tmdb-data/searchMovie';
import { NgxHmCarouselBreakPointUp } from 'ngx-hm-carousel';
import { PanierService } from '../panier.service';
import { ListeService } from '../liste.service';
import { AuthService } from '../auth.service';
import { Achat } from '../dataInterfaces/achat';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public popularMovies: SearchMovieResponse;
  public popularMovie: MovieResult[];
  public popularMovieSize: number;
  public currentMovie: MovieResponse;
  public currentMovieGenres: MovieGenre[];
  public conditionCarousel: string;
  public currentMovieId: string;
  public fiveFirstLoadedMovies: MovieResult[];
  public restOfLoadedMovies: MovieResult[];
  public currentMovieSynopsis: string;
  public currentMoviePopularity: number;
  public posterUrl: string;
  public backdropUrl: string;


  public currentIndex = 0;
  public speed = 5000;
  public infinite = true;
  public direction = 'right';
  public directionToggle = true;
  public autoplay = true;
  public avatars = '1234567891234'.split('').map((x, i) => {
    const num = i;
    // const num = Math.floor(Math.random() * 1000);
    return {
      url: `https://picsum.photos/600/400/?${num}`,
      title: `${num}`
    };
  });

  public breakpoint: NgxHmCarouselBreakPointUp[] = [
    {
      width: 500,
      number: 1
    },
    {
      width: 800,
      number: 2
    },
    {
      width: 1024,
      number: 4
    },
  ];

  constructor(
    public tmdb: TmdbService,
    public panier: PanierService,
    public ls: ListeService,
    public auth: AuthService,
    public snackBar: SnackBarService
  ) {
    this.init();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.shiftCenter();

    }, 1500);


  }

  thisMovieIsInMyFavorite(): boolean {
    return this.ls.favoris.includes(this.currentMovie.id);
  }


  ajoutPanier() {

    const article: Achat = {
      id: String(this.currentMovie.id),
      nom: this.currentMovie.title,
      overview: this.currentMovie.overview,
      photo: this.posterUrl,
      quantite: 1,
      isMovie: 1,
      prix: 5
    };

    this.panier.ajoutPanier(article);
  }

  supprimerArticleDuPanier() {
    const article: Achat = {
      id: String(this.currentMovie.id),
      nom: this.currentMovie.title,
      overview: this.currentMovie.overview,
      photo: this.posterUrl,
      quantite: 1,
      isMovie: 1,
      prix: 5
    };
    this.panier.supprimerArticleDuPanier(article);
  }





  async setCurrentMovie() {
    while (true) {
      this.currentMovieId = document.getElementById('middle-id-value').innerHTML;
      this.conditionCarousel = document.getElementById('wait-condition-span').innerHTML;
      if (this.conditionCarousel === '1') {
        this.currentMovie = await this.tmdb.getMovie(+this.currentMovieId, {
          language: 'fr'
        });
        this.currentMovieGenres = this.currentMovie.genres;
        this.tronquerSynopsis();
        this.currentMoviePopularity = Math.floor((this.currentMovie.popularity / 500) * 100);
        this.posterUrl = 'http://image.tmdb.org/t/p/w300_and_h450_bestv2/' + this.currentMovie.poster_path;
        this.backdropUrl = 'http://image.tmdb.org/t/p/original/' + this.currentMovie.backdrop_path;
        document.getElementById('wait-condition-span').innerHTML = '0';
        const elementBackDrop: HTMLElement = document.querySelector('#backdrop');
        elementBackDrop.style.backgroundImage = 'url(' + this.backdropUrl + ')';
        break;
      }
    }

  }
  setMovieId(box) {
    const movieId = box.id;
    const span = document.getElementById('middle-id-value');
    // span.removeChild(span.lastChild);
    const textNode = document.createTextNode(movieId);
    span.innerHTML = movieId.toString();
    document.getElementById('wait-condition-span').innerHTML = '1';

  }
  shiftLeft() {
    const boxes = document.querySelectorAll('.box');
    const tmpNode = boxes[0];
    boxes[0].className = 'box move-out-from-left';

    setTimeout(() => {
      if (boxes.length > 5) {
        tmpNode.classList.add('box--hide');
        boxes[5].className = 'box move-to-position5-from-left';
      }
      boxes[1].className = 'box move-to-position1-from-left';
      boxes[2].className = 'box move-to-position2-from-left';
      boxes[3].className = 'box move-to-position3-from-left';
      boxes[4].className = 'box move-to-position4-from-left';
      boxes[0].remove();

      document.querySelector('.cards__container').appendChild(tmpNode);
      this.setMovieId(boxes[3]);
      this.setCurrentMovie();
    }, 500);


  }

  shiftRight() {
    const boxes = document.querySelectorAll('.box');
    boxes[4].className = 'box move-out-from-right';
    setTimeout(() => {
      const noOfCards = boxes.length;
      if (noOfCards > 4) {
        boxes[4].className = 'box box--hide';
      }

      const tmpNode = boxes[noOfCards - 1];
      tmpNode.classList.remove('box--hide');
      boxes[noOfCards - 1].remove();
      const parentObj = document.querySelector('.cards__container');
      parentObj.insertBefore(tmpNode, parentObj.firstChild);
      tmpNode.className = 'box move-to-position1-from-right';
      boxes[0].className = 'box move-to-position2-from-right';
      boxes[1].className = 'box move-to-position3-from-right';
      boxes[2].className = 'box move-to-position4-from-right';
      boxes[3].className = 'box move-to-position5-from-right';
      this.setMovieId(boxes[1]);
      this.setCurrentMovie();
    }, 500);
  }
  shiftCenter() {
    const boxes = document.querySelectorAll('li:not(.box--hide)');
    this.setMovieId(boxes[4]);
    this.setCurrentMovie();
  }

  tronquerSynopsis() {
    this.currentMovieSynopsis = this.currentMovie.overview.slice(0, 309) + '...';
  }

  async init() {
    this.tmdb.init(environment.tmdbKey);
    this.tmdb.searchPop2(this.tmdb);

    this.popularMovies = await this.tmdb.searchPop({
      language: 'fr'
    });
    this.popularMovie = this.popularMovies.results;
    this.popularMovies = await this.tmdb.searchPop({
      language: 'fr'
    });
    this.fiveFirstLoadedMovies = this.popularMovies.results;
    this.popularMovies = await this.tmdb.searchPop({
      language: 'fr'
    });

    this.restOfLoadedMovies = this.popularMovies.results;
    this.popularMovieSize = this.popularMovie.length;
    const x = this.popularMovieSize - 5;
    this.popularMovie.splice(5, x);
    this.fiveFirstLoadedMovies.splice(5, this.fiveFirstLoadedMovies.length - 5);
    this.restOfLoadedMovies.splice(0, 5);
  }







}
