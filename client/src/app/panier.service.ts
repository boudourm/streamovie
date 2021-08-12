import { Injectable } from '@angular/core';
import { Achat } from './dataInterfaces/achat';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  commande: Array<Achat>;
  visible = false;

  open = true;


  constructor() {
    this.commande = [];
  }

  ajoutPanier(article: Achat) {

    this.commande.push(article);
    this.visible = true;

  }

  viderPanier() {
    this.commande = [];
  }


  getNombresArticles() {
    return this.commande.length;
  }



  existeDejaDansPanier(id: number) {
    const match = this.commande.filter((a) => +a.id === id);
    if (match.length !== 0) {
      return true;
    } else {
      return false;
    }
  }

  // Incr la qt de 1
  updatePanier(article: Achat) {
    const _article = this.commande.filter((a) => a.id === article.id);
    _article[0].quantite++;

    // SUPPRESSION PUIS INSERTION DE L'ARTICLE AVEC UNE QT +1
    this.commande = this.commande.filter((a) => a.id !== _article[0].id);
    this.commande.push(_article[0]);
  }

  supprimerArticleDuPanier(article: Achat) {
    this.commande = this.commande.filter((a) => a.id !== article.id);
  }

  getFilms() {
    const films = this.commande.filter((a) => a.isMovie === 1);
    const idFilms: string[] = [];
    films.map((f) => {
      let x;
      for (x = 0; x < f.quantite; x++) {
        idFilms.push(f.id);
      }
    });
    return idFilms;
  }

  getPlats() {
    const plats = this.commande.filter((a) => a.isMovie === 0);
    const idPlats: string[] = [];
    plats.map((f) => {
      let x;
      for (x = 0; x < f.quantite; x++) {
        idPlats.push(f.id);
      }
    });
    return idPlats;
  }

  getMontant() {
    let montant = 0;
    this.commande.map((m) => montant = montant + m.prix);
    return montant;
  }

}
