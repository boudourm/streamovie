import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpsHelperService {

  URL_API = 'https://api-streamovie-m1-miage.firebaseapp.com/api/v1';


  constructor(
    public _http: HttpClient
  ) { }


  public GET(url, params: { [key: string]: string }): Promise<any> {
    const P = new HttpParams({ fromObject: params });


    return this._http
      .get(this.URL_API + url, {
        params: P
      })
      .toPromise();
  }


  public POST(url, object
  ): Promise<any> {
    return this._http
      .post(this.URL_API + url, object)
      .toPromise();
  }


  public DELETE(url, params: { [key: string]: string }): Promise<any> {
    const P = new HttpParams({ fromObject: params });
    return this._http
      .delete(this.URL_API + url, {
        params: P
      })
      .toPromise();
  }


}
