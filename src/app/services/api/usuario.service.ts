import { HelperService } from './../outros/helper.service';
import { Injectable } from '@angular/core';
// Importa configurações personalizados do projeto, aplicável em qualquer serviço
import { hold } from './../../../environments/environment';
// Responsável pela conexão com a API rest, cabeçalho e erros
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Classe com as variáveis dos campos de Usuarios
import { Usuario } from './../../classes/usuario';
// Faz tratamento de erros
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  holdVila: number = hold.vila;
  holdTcmed: number = hold.tcmed;

  constructor(
    public http: HttpClient,
    private helper: HelperService,
  ) {
  }

   // Opções para o Header enviado ao servidor
   httpOptions = this.helper.httpOptions;

  // Insere um novo registro
  create(item, sistema: number): Observable<Usuario> {
    const baseUrl = this.helper.defineUrl(sistema);
    return this.http
      .post<Usuario>(`${baseUrl}/register`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.helper.handleError));
  }

  // Faz login
  login(credentials: Usuario, sistema: number): Observable<string> {
    const baseUrl = this.helper.defineUrl(sistema);
    credentials.subOpcao = 'login';
    // return this.http.post<string>(`${this.baseUrl}/login`, JSON.stringify(credentials), this.httpOptions)
    return this.http.post<string>(`${baseUrl}`, JSON.stringify(credentials), this.httpOptions)
      .pipe(retry(10), catchError(this.helper.handleError));
  }

  // Busca todos os dados
  getAll(sistema: number): Observable<Usuario> {
    const baseUrl = this.helper.defineUrl(sistema);
    return this.http
      .get<Usuario>(baseUrl)
      .pipe(
        retry(2),
        catchError(this.helper.handleError)
      );
  }

  // Atualiza o registro por meio do ID
  update(id: number, item, sistema: number): Observable<Usuario> {
    const baseUrl = this.helper.defineUrl(sistema);
    return this.http
      .put<Usuario>(baseUrl + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.helper.handleError)
      );
  }

  // Exclui o registro pelo ID
  delete(id: number, sistema: number) {
    const baseUrl = this.helper.defineUrl(sistema);
    return this.http
      .delete<Usuario>(baseUrl + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.helper.handleError)
      );
  }

}
