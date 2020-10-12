import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  constructor() { }

  /**
   * Converte código dos resultados da consulta anterior para parametro
   * Usado para preencher os dados de consulta anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-08-2020
   * @version 1.0
   * @param num: string
   * @param tipo: string //med, ocu, exa e enc
   */
  parametroConclusao(num: string, tipo: string) {
    let resul: string = null;
    if (tipo === 'med') {
        switch (num) {
            case '1':
                return resul = 'Normal';
            case '0':
                return resul = 'Alterado';
        }
    }
    if (tipo === 'ocu') {
        switch (num) {
            case '1':
                return resul = 'Ocupacional';
            case '0':
                return resul = 'Não Ocupacional';
        }
    }
    if (tipo === 'exa') {
        switch (num) {
            case '1':
                return resul = 'Apto';
            case '2':
                return resul = 'Inapto';
            case '3':
                return resul = 'Apto com Restrição';
            case '4':
                return resul = 'Aguardando Resposta';
        }
    }
    if (tipo === 'enc') {
        switch (num) {
            case '1':
                return resul = '1 - Encaminho ao especialista (PS)';
            case '2':
                return resul = '2 - 1º vez que encaminhamento ao INSS.';
            case '3':
                return resul = '3 - Reencaminhamento ao INSS.';
            case '4':
                return resul = '4 - Orientação Verbal';
        }
    }
    return resul;
  }

}
