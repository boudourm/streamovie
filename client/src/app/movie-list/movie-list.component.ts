import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { SearchMovieResponse } from '../tmdb-data/searchMovie';
import { MovieQuery } from '../tmdb-data/Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  constructor(
    protected tmdb: TmdbService
  ) { }
  public filmsByGenres: SearchMovieResponse[] = [];
  public loading = true;
  public carouselOptions = {
    items: 5,
    margin: 5,
    nav: true,
    loop: true,
    navSpeed: 500,
    mouseDrag: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 5
      }
    }
  };
  public viewAsList = true;
  public filtreListMovie: SearchMovieResponse = {};
  public filter = false;
  public page = 1;




  async ngOnInit() {
    if (this.filmsByGenres.length === 0) {
      this.filmsByGenres = await this.tmdb.getFilmsByGenres();

    }
    this.loading = false;
  }

  ngAfterViewInit() {
    this.setArrowCarousel();
  }

  async searchOnGenre(genre, page: number) {
    this.filter = true;
    if (genre.length !== 0) {

      const q: MovieQuery = {};
      this.page = page;
      q.page = this.page;
      q.sort_by = 'popularity.desc';
      q.language = 'fr-FR';
      genre.forEach(value => {
        if (q.with_genres === undefined) {
          q.with_genres = value;
        } else {
          q.with_genres += ', ' + value;
        }
      });

      this.filtreListMovie = await this.tmdb.searchPop(q);

    } else {
      this.filtreListMovie = {};
      this.filter = false;
      this.setArrowCarousel();
    }
  }

  setArrowCarousel() {
    setTimeout(() => {
      const owlNavArray = document.querySelectorAll('owl-carousel .owl-nav');
      const owlButtonNextArray = document.querySelectorAll('owl-carousel .owl-nav button.owl-next');
      const owlButtonPrevArray = document.querySelectorAll('owl-carousel .owl-nav button.owl-prev');
      owlNavArray.forEach((element: HTMLElement) => {
        element.style.width = '78.5vw';
        element.style.textAlign = 'center';
      });
      owlButtonNextArray.forEach((element: HTMLElement) => {
        element.style.fontSize = '50px';
        element.style.outline = '0';
      });
      owlButtonPrevArray.forEach((element: HTMLElement) => {
        element.style.fontSize = '50px';
        element.style.outline = '0';

      });

    }, 1000);
  }

}
