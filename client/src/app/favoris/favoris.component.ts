import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../tmdb.service';
import { ListeService } from '../liste.service';
import { MovieResponse } from '../tmdb-data/Movie';
import { HttpsHelperService } from './../https-helper.service';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {

  constructor(
    public liste: ListeService,
    public tmdb: TmdbService,
    public httpsHelper: HttpsHelperService,
    public auth: AuthService
  ) {
    this.liste.getFilmsFavoris();
  }

  async ngOnInit() { }






}
