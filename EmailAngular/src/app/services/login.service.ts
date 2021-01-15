import { Injectable, NgZone } from '@angular/core';
import * as _ from "lodash";
import { GoogleAuthService } from 'ng-gapi';
import GoogleUser = gapi.auth2.GoogleUser;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public static readonly SESSION_STORAGE_KEY: string = "usuarioGoogle";

  infoUser: SessionUser;

  constructor(private googleAuthService: GoogleAuthService, private ngZone: NgZone) { 
    if(this.isUserSignedIn()){
      this.setUser(this.getSessionUser());
    } 
    if(!this.infoUser)
      this.infoUser = new SessionUser();
  }

  private setUser(user: SessionUser) {
    console.log(user);
    this.infoUser = user;
  }

  public getSessionUser(): SessionUser {
    let user: string = sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY);
    if (!user) {
      throw new Error("no token set , authentication required");
    }
    return JSON.parse(user);
  }

  public signIn() {
    this.googleAuthService.getAuth().subscribe((auth) => {
      auth.signIn().then(
        res => this.signInSuccessHandler(res),
        err => this.signInErrorHandler(err));
    });
  }

  public signOut(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
      try {
        auth.signOut();
        this.infoUser.tokenUser = undefined;
        this.infoUser.userId = undefined;
        this.infoUser.nombre = undefined;
        this.infoUser.email = undefined;
      } catch (e) {
        console.error(e);
      }
      sessionStorage.removeItem(LoginService.SESSION_STORAGE_KEY);
    });
  }

  public isUserSignedIn(): boolean {
    return !_.isEmpty(sessionStorage.getItem(LoginService.SESSION_STORAGE_KEY));
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.ngZone.run(() => {
      console.log(JSON.stringify(res));
      this.infoUser.tokenUser = res.getAuthResponse().access_token;
      this.infoUser.userId = res.getId();
      this.infoUser.nombre = res.getBasicProfile().getName();
      this.infoUser.email = res.getBasicProfile().getEmail();
      sessionStorage.setItem(
        LoginService.SESSION_STORAGE_KEY, JSON.stringify(this.infoUser)
      );
    });
  }

  private signInErrorHandler(err) {
    console.warn(err);
  }
}

class SessionUser {
  tokenUser: string;
  userId: string;
  nombre: string;
  email: string;

  constructor() {
    this.tokenUser = undefined;
    this.userId = undefined;
    this.nombre = undefined;
    this.email = undefined;
  }
}
