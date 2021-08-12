import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TmdbService } from '../tmdb.service';
import { environment } from 'src/environments/environment';
import { PanierService } from '../panier.service';
import { ListeService } from '../liste.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  public name: string;
  public logbool = false;
  public photo = '';

  constructor(
    public ls: ListeService,
    public auth: AuthService,
    public tmdb: TmdbService,
    public panier: PanierService,
    public router: Router
  ) { }

  async ngOnInit() {
    this.tmdb.init(environment.tmdbKey);
    this.photo = await this.auth.getUserPhoto();
  }

  async loginGoogle() {
    await this.auth.signInWithGoogle();
    this.logbool = await this.auth.loginClientBD(
      this.auth.getUID(),
      this.auth.getUserName().split(' ')[0],
      this.auth.getUserName().split(' ')[1],
      this.auth.getUserEmail()
    );
    this.loggedIn();
  }

  loggedIn() {
    if (this.logbool) {
      this.name = this.getName().split(' ')[0];
      setTimeout(() => {
        this.ls.getListeId();
      }, 1000);

    }
  }

  logout() {
    this.auth.logout();
    this.logbool = false;

  }

  getName() {
    return this.auth.getUserName();
  }

  async search() {
    this.tmdb.searching = true;
    this.router.navigateByUrl('/films');
    if (this.tmdb.searchStr.length !== 0) {
      await this.tmdb.filmSearch(this.tmdb);
    } else {
      this.tmdb.searching = false;
      this.tmdb.resultResearch = [];
      this.setArrowCarousel();
    }
  }

  resetSearch() {
    this.tmdb.searching = false;
    this.tmdb.resultResearch = [];
    this.tmdb.searchStr = '';
  }

  setArrowCarousel() {
    setTimeout(() => {
      const owlNavArray = document.querySelectorAll('owl-carousel .owl-nav');
      const owlButtonNextArray = document.querySelectorAll('owl-carousel .owl-nav button.owl-next');
      const owlButtonPrevArray = document.querySelectorAll('owl-carousel .owl-nav button.owl-prev');
      owlNavArray.forEach((element: HTMLElement) => {
        element.style.width = '75vw';
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

  goBack() {
    this.router.navigateByUrl('/films');
    if (this.tmdb.searchStr.length !== 0 && this.tmdb.resultResearch.length === 0) {
      this.tmdb.searching = false;
    }
  }

  isOnDetailAfterSearch(): boolean {
    if (this.router.url.search('/film/') !== -1 && this.tmdb.searchStr.length !== 0) {
      return this.tmdb.searching;
    }
  }

}
