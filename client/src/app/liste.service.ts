import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'firebase/app';
import { AuthService } from './auth.service';
import { HttpsHelperService } from './https-helper.service';
import { MovieResponse } from './tmdb-data/Movie';
import { TmdbService } from './tmdb.service';


@Injectable({
  providedIn: 'root'
})
export class ListeService {

  favoris: Array<number>;
  filmsFavoris: Array<MovieResponse>;

  constructor(
    public _http: HttpClient,
    public auth: AuthService,
    public httpsHelper: HttpsHelperService,
    public tmdb: TmdbService
  ) {
    this.favoris = [];
    this.filmsFavoris = [];
  }

  deleteAllFavoris() {
    this.favoris = [];
    this.filmsFavoris = [];
  }

  getFilmsFavoris() {
    //this.getListeId();
    const filmsFavoris_tmp = [];
    this.favoris.forEach((a) => this.tmdb.getMovie(+a).then((data) => {
      filmsFavoris_tmp.push(data);
    }));
    this.filmsFavoris = filmsFavoris_tmp
  }

  async ajoutListe(movieId: number) {
    try {
      const liste_tmp = this.favoris;
      liste_tmp.push(movieId);


      const data = {
        idUtilisateur: this.auth.client.id,
        films: liste_tmp
      };

      await this.httpsHelper.POST('/favoris', data);
      this.favoris = liste_tmp;
      this.getFilmsFavoris();


    } catch (err) {

    }
  }

  async removeListe(movieId: number) {
    try {
      const liste_tmp = this.favoris.filter(function(idFilm) {
        return idFilm !== movieId;
      });

      const data = {
        idUtilisateur: this.auth.client.id,
        films: liste_tmp
      };

      this.httpsHelper.POST('/favoris', data);
      this.favoris = liste_tmp;
      this.getFilmsFavoris();
      return this.favoris;
    } catch (err) {

    }
  }

  async getListeId() {
    if (this.auth.client == null) {

      return [];
    } else {
      try {
        const params: { [key: string]: string } = {};
        params.idUtilisateur = this.auth.client.id;
        const resFilmsID = await this.httpsHelper.GET('/favoris', params);
        this.favoris = resFilmsID.data.films;
        this.getFilmsFavoris();
      } catch (err) {
        try {
          const data = {
            idUtilisateur: this.auth.client.id,
            films: []
          };
          await this.httpsHelper.POST('/favoris', data);
        } catch (err) {

        }
      }
    }
  }


  getIDFilmsFavoris() {
    return this.favoris;
  }

  getNombresDeFilmsFavoris() {
    return this.favoris.length;
  }





}
