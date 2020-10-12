import { Consulta } from './../../classes/consulta';
import { HelperService } from './../outros/helper.service';
import { Injectable } from '@angular/core';
// Importa configurações personalizados do projeto, aplicável em qualquer serviço
import { environment, hold } from './../../../environments/environment';
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
export class ApiAgendaService {

  // Define se acesso é Local ou Online para aplicar Urls, alterar no arquivo "environment"
  tipoAcesso: string = environment.tipoAcesso;

  // URL da API Rest
  vilaBaseUrl: string = environment.tipoAcesso === 'dev' ? environment.vilaUrl : environment.vilaUrlDev;
  tcmedBaseUrl: string = environment.tipoAcesso === 'dev' ? environment.tcmedUrl : environment.tcmedUrlDev;
  holdVila: number = hold.vila;
  holdTcmed: number = hold.tcmed;

  constructor(
    public http: HttpClient,
    private helper: HelperService
  ) { }

   // Opções para o Header enviado ao servidor
   httpOptions = this.helper.httpOptions;

  // Carrega a agenda do médico Logado
  sincronizaAgenda(credentials: Usuario, sistema: number): Observable<string> {
    const baseUrl = this.helper.defineUrl(sistema);
    credentials.subOpcao = 'loadData';
    credentials.metodo = 'loadAgenda';
    credentials.idMedico = sistema === this.holdVila ? credentials.idMedicoVila : credentials.idMedicoTcmed;
    credentials.email = credentials.nickname && credentials.referencia;
    return this.http.post<string>(`${baseUrl}`, JSON.stringify(credentials), this.httpOptions)
      .pipe(retry(10), catchError(this.helper.handleError));
  }

  // Carrega a agenda do médico Logado
  sincronizaHistorico(credentials: Usuario, sistema: number): Observable<string> {
    const baseUrl = this.helper.defineUrl(sistema);
    credentials.subOpcao = 'loadData';
    credentials.metodo = 'loadConsultas';
    credentials.idMedico = sistema === this.holdVila ? credentials.idMedicoVila : credentials.idMedicoTcmed;
    credentials.email = credentials.nickname && credentials.referencia;
    return this.http.post<string>(`${baseUrl}`, JSON.stringify(credentials), this.httpOptions)
      .pipe(retry(10), catchError(this.helper.handleError));
  }

  // Salva uma consulta enviar por vez
  create(item, credentials, sistema: number): Observable<any> {
    const baseUrl = this.helper.defineUrl(sistema);
    item.id = null;
    item.created_by = null;
    let data: any;
    credentials.subOpcao = 'loadData';
    credentials.metodo = 'insertConsulta';
    credentials.idMedico = sistema === this.holdVila ? credentials.idMedicoVila : credentials.idMedicoTcmed;
    credentials.email = credentials.nickname && credentials.referencia;
    data = credentials;
    data.consulta = item;
    return this.http.post<string>(`${baseUrl}`, JSON.stringify(data), this.httpOptions)
      .pipe(retry(3), catchError(this.helper.handleError));
  }

  // Sincroniza Cids na primeira vez que usuário loga
  sincronizaCids(credentials: Usuario, sistema: number): Observable<string> {
    const baseUrl = this.helper.defineUrl(sistema);
    credentials.subOpcao = 'loadData';
    credentials.metodo = 'loadCids';
    credentials.idMedico = sistema === this.holdVila ? credentials.idMedicoVila : credentials.idMedicoTcmed;
    credentials.email = credentials.nickname && credentials.referencia;
    return this.http.post<string>(`${baseUrl}`, JSON.stringify(credentials), this.httpOptions)
      .pipe(retry(10), catchError(this.helper.handleError));
  }

}
