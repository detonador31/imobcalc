import { hold } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Faz tratamento de erros
import { retry, catchError } from 'rxjs/operators';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class TcmedCookieService {

  holdVila: number = hold.vila;
  holdTcmed: number = hold.tcmed;
  private coki: any;

  constructor(
    private cookie: CookieService,
    public http: HttpClient,
    private helper: HelperService
  ) { }

   // Opções para o Header enviado ao servidor
   httpOptions = this.helper.httpOptions;

  setCookies(sistema: number) {
    const baseUrl = this.helper.defineUrl(sistema);
    this.setCookieFunction(baseUrl, '').subscribe(
      (response) => {
        this.coki = response;
        this.cookie.put('PHPSESSID', this.coki.PHPSESSID);
      },
      async () => {
        await this.helper.toast('Falha', 'Erro na conexão entre API e Servidor', 'danger', 'bottom', 3000);
      }
    );
  }

  setCookieFunction(url: string, object: any): Observable<any> {
    return this.http.post(url, object, this.httpOptions)
    .pipe(retry(2), catchError(this.helper.handleError));
  }

  getCookies() {
    return this.cookie.get('PHPSESSID');
  }

  deleteCookies() {
    this.cookie.remove('PHPSESSID');
  }

}
