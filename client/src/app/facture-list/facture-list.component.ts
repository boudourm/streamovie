import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../commande.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {
  constructor(
    public cmd: CommandeService,
    public auth: AuthService
  ) {
  }

  ngOnInit() {
    if (!this.cmd.userID) {
      this.cmd.getCommandes();
    } else {
      if (this.auth.client.id !== this.cmd.userID || this.cmd.factures.length === 0) {
        this.cmd.getCommandes();
      }
    }

  }

}
