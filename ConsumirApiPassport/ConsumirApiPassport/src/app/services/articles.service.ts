import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {


  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn())
      router.navigate(['']);
  }

  /**
   * Petición get para obtener los artículos
   */
  public getArticles = () => {
    const url = "http://localhost:8000/api/articles";

    console.log(this.loginService.user.access_token);
    let headers = new HttpHeaders({ Authorization: `Bearer ${this.loginService.user.access_token}` });

    return this.http.get(url, { headers: headers });
  };


}
