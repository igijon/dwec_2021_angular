import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public login: LoginService) { }

  ngOnInit(): void {
  }

  signIn() {
    this.login.signIn();
  }

  signOut() {
    this.login.signOut();
  }

}
