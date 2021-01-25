import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/services/articles.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  articles: any[];

  constructor(private articleService: ArticlesService, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn())
      this.router.navigate(['']);
    this.articles = [];
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.articleService.getArticles().subscribe(
      (response: any) => {
        const articles = response;
        articles.forEach((element: { id: any; title: any; body: any; }) => {
          let article = {
            'id': element.id,
            'titulo': element.title,
            'cuerpo': element.body
          };
          this.articles.push(article);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  borrar(article: any) {
    console.log(article);
    //TODO
  }
}
