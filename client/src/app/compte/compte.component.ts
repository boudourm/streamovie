import { Component, OnInit, Directive } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommandeService } from '../commande.service';
import { ListeService } from '../liste.service';

import { TmdbService } from '../tmdb.service';




@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})

export class CompteComponent implements OnInit {
  public inputTelephone: string;
  public inputAdresse: string;
  public inputPhoto: string;
  public saveBool = false;
  public panelOpenState = false;

  constructor(
    public tmdb: TmdbService,
    public auth: AuthService,
    public com: CommandeService,
    public liste: ListeService
  ) { }

  ngOnInit() {
    this.com.getCommandes();
  }






}
