import { Injectable } from '@angular/core';
import { MovieGenre, MovieQuery, MovieResponse, SimilarMovie, MoviesGenres } from './tmdb-data/Movie';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PersonQuery, PersonResponse } from './tmdb-data/Person';
import { SearchMovieQuery, SearchMovieResponse } from './tmdb-data/searchMovie';
import { SearchPeopleQuery, SearchPeopleResponse } from './tmdb-data/SearchPeople';
import { TVQuery, TVResponse } from './tmdb-data/TV';
import { SearchTVQuery, SearchTVResponse } from './tmdb-data/SearchTV';
import { CastResponse, CreditResponse } from './tmdb-data/Cast';


const tmdbApi = 'https://api.themoviedb.org/3';
type HTTP_METHOD = 'GET' | 'POST' | 'DELETE' | 'PUT';


function AlxToObjectString(data?: object): { [key: string]: string } {
  const res = {};
  for (const k of Object.keys(data || {})) {
    const v = data[k];
    res[k] = typeof v === 'string' ? v : JSON.stringify(v);
  }
  return res;
}

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  public apiKey: string;
  public resultResearch: MovieResponse[];
  public searchStr = '';
  public searching = false;
  public movie: MovieResponse;
  public filmsByGenres: SearchMovieResponse[] = [];
  public query: MovieQuery = {};
  public genres: MoviesGenres =  {genres : []};

  getMyMovie(): MovieResponse {
    return this.movie;
  }

  public async get<T>(url: string, data: object): Promise<HttpResponse<T>> {
    return this.http
      .get<T>(url, {
        observe: 'response',
        params: { ...AlxToObjectString(data), api_key: this.apiKey }
      })
      .toPromise();
  }

  constructor(public http: HttpClient) {
    this.resultResearch = [];
  }

  init(key: string): this {
    this.apiKey = key;
    return this;
  }

  // _______________________________________________________________________________________________________________________________________
  // Movies ________________________________________________________________________________________________________________________________
  // _______________________________________________________________________________________________________________________________________

  async getGenres(options?: MovieQuery): Promise<MoviesGenres> {
    const url = `${tmdbApi}/genre/movie/list`;
    const res = await this.get<MoviesGenres>(url, options);
    return res.body;
  }

  async getMovie(id: number, options?: MovieQuery): Promise<MovieResponse> {
    const url = `${tmdbApi}/movie/${id}`;
    const res = await this.get<MovieResponse>(url, { language: 'fr' });
    return res.body;
  }

  async getSimilarMovie(id: number, options?: MovieQuery): Promise<MovieResponse[]> {
    const url = `${tmdbApi}/movie/${id}/similar`;
    const res = await this.get<SimilarMovie>(url, { language: 'fr' });

    return res.body.results;
  }

  async getVideo(id: number): Promise<any> {
    const url = `${tmdbApi}/movie/${id}/videos`;
    const res = await this.get<MovieResponse>(url, { language: 'fr' });

    return res.body;
  }

  async getCredits(id: number): Promise<CastResponse[]> {
    const url = `${tmdbApi}/movie/${id}/credits`;
    const res = await this.get<CreditResponse>(url, { language: 'fr' });

    return res.body.cast;
  }

  async searchMovie(query: SearchMovieQuery): Promise<SearchMovieResponse> {
    const url = `${tmdbApi}/search/movie`;
    const res = await this.get<SearchMovieResponse>(url, query);
    return res.body;
  }

  async searchPop(options?: MovieQuery) {
    const url = `${tmdbApi}/discover/movie?api_key=${this.apiKey}`;
    const res = await this.get<SearchMovieResponse>(url, options);
    return res.body;
  }

  async searchPop2(tmdb: TmdbService, options?: MovieQuery) {
    this.resultResearch = [];
    const respQuery = tmdb.searchPop(
      {
        language: 'fr'
      }
    );
    await respQuery.then(response =>
      response.results.forEach(element => {
        this.resultResearch.push(element);
      })
    );
  }

  async filmSearch(tmdb: TmdbService) {
    if (this.searchStr.length !== 0) {
      this.resultResearch = [];
      const popQuery = {
        language: 'fr-FR',
        query: this.searchStr,
        region: 'FR'
      };
      const respQuery = tmdb.searchMovie(popQuery);
      await respQuery.then(reponse =>
        reponse.results.forEach(element => {
          this.resultResearch.push(element);
        })
      );
    }

  }

  // _______________________________________________________________________________________________________________________________________
  // Person / People _______________________________________________________________________________________________________________________
  // _______________________________________________________________________________________________________________________________________
  async getPerson(id: number, options?: PersonQuery): Promise<PersonResponse> {
    const url = `${tmdbApi}/person/${id}`;
    const res = await this.get<PersonResponse>(url, options);
    return res.body;
  }

  async searchPerson(query: SearchPeopleQuery): Promise<SearchPeopleResponse> {
    const url = `${tmdbApi}/search/person`;
    const res = await this.get<SearchPeopleResponse>(url, query);
    return res.body;
  }

  // _______________________________________________________________________________________________________________________________________
  // TV ____________________________________________________________________________________________________________________________________
  // _______________________________________________________________________________________________________________________________________
  async getTV(id: number, options?: TVQuery): Promise<TVResponse> {
    const url = `${tmdbApi}/tv/${id}`;
    const res = await this.get<TVResponse>(url, options);
    return res.body;
  }

  async searchTV(query: SearchTVQuery): Promise<SearchTVResponse> {
    const url = `${tmdbApi}/search/tv`;
    const res = await this.get<SearchTVResponse>(url, query);
    return res.body;
  }

  async getFilmsByGenres(): Promise<SearchMovieResponse[]> {
    this.filmsByGenres = [];
    this.genres = { genres: [] };
    this.query.language = 'fr';
    this.genres.genres = (await this.getGenres(this.query)).genres;
    const genresDisponible: MovieGenre[] = [];
    genresDisponible.push(this.genres.genres[0]);
    genresDisponible.push(this.genres.genres[3]);
    genresDisponible.push(this.genres.genres[6]);
    genresDisponible.push(this.genres.genres[9]);
    genresDisponible.push(this.genres.genres[12]);
    // Génère un tableau avec tout une liste de films par genre
    genresDisponible.forEach(async element => {
      this.query.with_genres = String(element.id);
      const res = await this.searchPop(this.query);
      this.filmsByGenres.push(res);
    });
    return this.filmsByGenres;
  }
}
