import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/app';
import { _firebaseAppFactory } from '@angular/fire';
import { Observable } from 'rxjs';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { Client } from './dataInterfaces/client';
import { HttpsHelperService } from './https-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<firebase.User>;
  public userDetails: firebase.User = null;
  public client: Client = null;


  constructor(
    public _firebaseAuth: AngularFireAuth,
    public router: Router,
    public httpsHelper: HttpsHelperService
  ) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );

  }

  isLoggedIn(): boolean {
    if (this.client == null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    this._firebaseAuth.auth.signOut().then(res => this.router.navigate(['/']));
    this.client = null;
  }

  getUserName() {
    if (this.userDetails != null) {
      return this.userDetails.displayName;
    }
  }

  getUID() {
    if (this.userDetails != null) {
      return this.userDetails.uid;
    }
  }

  getUserEmail() {
    if (this.userDetails != null) {
      return this.userDetails.email;
    }
  }

  getUserPhoto() {
    if (this.client && this.client.photo !== '') {
      return this.client.photo;
    } else if (this.userDetails != null) {
      return this.userDetails.photoURL;
    }
  }

  public async loginClientBD(
    idUtilisateur: string,
    nom: string,
    prenom: string,
    mail: string
  ): Promise<boolean> {
    try {
      const params: { [key: string]: string } = {};
      params.idUtilisateur = idUtilisateur;
      const utilisateur = await this.httpsHelper.GET('/utilisateurs', params);
      this.client = {
        id: utilisateur.data.idUtilisateur,
        nom: utilisateur.data.nom,
        prenom: utilisateur.data.prenom,
        mail: utilisateur.data.mail,
        telephone: utilisateur.data.telephone,
        photo: utilisateur.data.photo
      };

      return true;
    } catch (err) {
      try {
        const data = {
          idUtilisateur,
          nom,
          prenom,
          mail,
          telephone: '',
          photo: ''
        };

        await this.httpsHelper.POST('/utilisateurs', data);
        this.client = {
          id: idUtilisateur,
          nom,
          prenom,
          mail,
          telephone: '',
          photo: ''
        };



        return true;
      } catch (err) {



        return false;
      }
    }
  }




  public async deleteClient(
  ): Promise<boolean> {
    try {
      const params: { [key: string]: string } = {};
      params.idUtilisateur = this.client.id;
      this.client = null;
      this.httpsHelper.DELETE('/commandes', params);
      this.httpsHelper.DELETE('/favoris', params);
      this.httpsHelper.DELETE('/utilisateurs', params);
      this._firebaseAuth.auth.currentUser.delete();
      return true;
    } catch (err) {

      return false;
    }
  }


}
