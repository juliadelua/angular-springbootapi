import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';

interface Auth {
  token: string;
  username: string;
  profile: Array<string>;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'SpringBooty';
  site = 'https://glacial-scrubland-11809.herokuapp.com/';

  login = 'ricardo.larguesa@fatec.sp.gov.br';
  password = '123456';

  list = null;

  auth = null; // objeto para armazenar os dados, variavel de controle, colocar em if para mostrar o form de autenticação ou o site

  constructor(private http: HttpClient) {}

  postLogin() {
    // atribue o auth
    this.http
      .post<Auth>(this.site + 'login', {
        login: this.login,
        senha: this.password,
      })
      .subscribe((data) => {
        this.auth = data;
      });
  }

  postLogout() {
    // nulifica o auth
    this.auth = null;
  }

  getPessoas() {
    this.http
      .get<any>(this.site + 'pessoas_fisicas', {
        headers: { Authorization: 'Bearer ' + this.auth.token },
      })
      .subscribe((data) => {
        this.list = data;
      });
  }
}
