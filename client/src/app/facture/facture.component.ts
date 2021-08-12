import { Component, OnInit } from '@angular/core';
import { Facture } from '../dataInterfaces/facture';
import { ActivatedRoute } from '@angular/router';
import { CommandeService } from '../commande.service';
import { AuthService } from '../auth.service';
import { TmdbService } from '../tmdb.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  public facture: Facture = {};
  public titreFilm: string[] = [];
  constructor(
    public route: ActivatedRoute,
    public cmd: CommandeService,
    public auth: AuthService,
    public tmdb: TmdbService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id_facture;

    this.facture = this.cmd.factures[id - 1];

    this.facture.films.forEach(film =>
      this.tmdb.getMovie(film).then(movieResponse => this.titreFilm.push(movieResponse.title)));
  }


}
