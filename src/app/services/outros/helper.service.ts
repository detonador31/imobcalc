import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
// Responsável pelas mensagens emitidas ao salvar, editar ou excluir
import { ToastController } from '@ionic/angular';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { hold } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  // URL da API Rest
  vilaBaseUrl: string = environment.tipoAcesso === 'dev' ? environment.vilaUrlDev : environment.vilaUrl;
  tcmedBaseUrl: string = environment.tipoAcesso === 'dev' ?  environment.tcmedUrlDev : environment.tcmedUrl;
  holdVila: number = hold.vila;
  holdTcmed: number = hold.tcmed;

  constructor(
    private toastCtrl: ToastController
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
     }),
    withCredentials: true
  };

  /**
   * Manipula erros da API
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param error HttpErrorResponse
   * @return String Mensagem
   */
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Manipula erros conforme ocorridos no client ou rede
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      // Código de falha é retornado do servidor back
      // O corpo da resposta deverá conter dicas de falha
      console.error(
        `O servidor retorno o código ${error.status}, ` +
        `body veio: ${error.error}`);
    }
    // retorna um observable com uma mensagem de erro amigável
    return throwError(
      'Algo errado aconteceu; tente novamente mais tarde.');
  }

  /**
   * Manipula erros da API
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @campoNome string
   * @return Boolean
   */
  async messageCampoBranco(campoNome: string) {
    const toast = this.toast('Preenchimento', 'Preencha o campo ' + campoNome, 'danger', 'bottom', 3000);
    return true;
  }

  /**
   * Gera as mensagens toast
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param head string
   * @param mess string mensagem
   * @param colo string cor
   * @param posit number posição
   * @param num number tempo em milissegundos
   * @return String
   */
  async toast(head: string, mess: string, colo: string, posit, num: number) {
    const toast = await this.toastCtrl.create({
      header: head,
      message: mess,
      color: colo,
      position: posit,
      duration: num,
      cssClass: 'toast'
    });
    (toast).present();
  }

  /**
   * Remove últimos caracteres de uma string
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param varString string
   * @param num number
   * @return String
   */
  removeUltimosCaracteres(varString: string, num: number) {
    return varString.substring( 0 , varString.length - num);
  }

  /**
   * Gera uma data e Hora com fuso de São Paulo
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @return Date
   */
  dateTime() {
    const dateString = new Date().toLocaleTimeString('en-US', {timeZone: 'America/Sao_Paulo'});
    const date: Date = new Date();
    console.log(date);
    // tslint:disable-next-line: radix
    date.setHours(parseInt(dateString.substring(0 , 2)));
    // tslint:disable-next-line: radix
    date.setMinutes(parseInt(dateString.substring(3 , 5)));

    return date;
  }

  /**
   * Data padrão americano
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 21-07-2020
   * @version 1.0
   * @param date string
   * @param type string 'br' or 'us'
   * @return Date
   */
  dateBrToUsOrUsToBr(date: any, type: string) {
    let resul = '';
    if (type === 'br') {
      const dia = date.substr(0, 2);
      const mes = date.substr(3, 2);
      const ano = date.substr(6, 10);
      resul = ano + '-' + mes + '-' + dia;
    }
    if (type === 'us') {
      const ano = date.substr(0, 4);
      const mes = date.substr(5, 2);
      const dia = date.substr(8, 10);
      resul = dia + '/' + mes + '/' + ano;
    }

    return resul;
  }

  /**
   * Apaga storage com os dados do Usuário
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param sistema number (Hold)
   */
  defineUrl(sistema: number) {
    switch (sistema) {
      case this.holdVila:
        return this.vilaBaseUrl;
      case this.holdTcmed:
        return this.tcmedBaseUrl;
    }
  }

  /**
   * Apaga storage com os dados do Usuário
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param key string
   */
  async deleteLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Resgata dados do Usuario no Storage do APP
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param key string
   * return array Json
   */
  async getLocaStoragetoObject(key: string) {
    const ret = localStorage.getItem(key);
    const retorno: any = ret;

    return await JSON.parse(retorno);
  }

  /**
   * Concatena código da Hold * 10 + ID
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param id number
   * @return resul number
   */
  holdAndId(id: number, sistema: number) {
    sistema = sistema * 10;
    // tslint:disable-next-line: radix
    const resul = parseInt(sistema.toString() + id.toString());
    return resul;
  }

  /**
   * Remove código da Hold do Id
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param id number
   * @return resul number
   */
  removeHoldFromId(id: number) {
    const numLength = id.toString().length;
    // tslint:disable-next-line: radix
    const resul = parseInt(id.toString().substring(2, numLength));
    return resul;
  }

/**
   * Converte uma string moeda ou valor decimal em número flutuante
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param valor any aceita string como R$00,00 ou 00,00
   * @return resul number
   */
  formataFloat(valor: any) {
    // Remove todos os .
    valor = valor.replace(/\./g, '');
    // Remove R$
    valor = valor.replace('R$', '');
    // Troca todas as , por .
    valor = valor.replace(',', '.');
    // Converte para float
    valor = parseFloat(valor);
    valor = parseFloat(valor) || 0.0;
    return valor;
  }

  /**
   * Converte numero em string monetário para edição
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param valor any
   * @return resul number
   */
  numberToCurrency(valor: any) {
    // Troca todas os . por ,
    valor = valor.toString();
    valor =  valor.indexOf('.') > 1 ? valor.replace('.', ',') : valor + ',00';
    const array = valor.split(',', 2);
    if (array.length === 2) {
      valor = array[1].length < 2 ? valor + '0' : valor;
    }

    return valor;
  }

  /**
   * Converte decimal(String) em valor de porcentagem(numero) para o Sqlite
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 28-10-2020
   * @version 1.0
   * @param valor any aceita string como R$00,00 ou 00,00
   * @return resul number
   */
  convertDecimalPorcentagem(valor: any) {
    // Remove todos os .
    valor = valor.replace(/\./g, '');
    // Remove R$
    valor = valor.replace('R$', '');
    // Troca todas as , por .
    valor = valor.replace(',', '.');
    // Converte para float
    valor = parseFloat(valor) / 100;
    return valor;
  }

  /**
   * Converte numero Porcentagem em string decimal para edição
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 28-10-2020
   * @version 1.0
   * @param valor any aceita string como R$00,00 ou 00,00
   * @return resul string
   */
  convertPorcentagemDecimal(valor: any, decimais) {
    valor = valor * 100;
    valor = (parseFloat(valor).toFixed(decimais));    
    // Troca todas as , por .
    valor = valor.toString().replace('.', ',');
    
    return valor;
  }

  arredondarPraCima(val: number, casas: number) {
    const casasDecimais = Math.pow(10, casas);
    var arrendondar = Math.round(val * casasDecimais);
    var resul = Math.ceil(arrendondar)/casasDecimais;
    return resul;
  }

  /**
   * Calcula Idade conforme data de nascimento
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param nascimento:string Ex: 10/02/1980
   * @param tipo:string Ex: 'br' ou 'us'
   * @return number
   */
  calculaIdade(nascimento: string, tipo: string) {
    if (!nascimento) {
      return null;
    }
    const nascimentoData = new Date(this.dateBrToUsOrUsToBr(nascimento, 'br'));
    const hoje = this.dateTime();
    const anoNascimento = nascimentoData.getFullYear();
    const anoHoje       = hoje.getFullYear();
    return anoHoje - anoNascimento;
  }

}
