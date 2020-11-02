import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonsService {

  uf: any = [
      {nome: "Acre",                sigla: "AC", itbiEscritura: 0.05},
      {nome: "Alagoas",             sigla: "AL", itbiEscritura: 0.05},
      {nome: "Amapá",               sigla: "AP", itbiEscritura: 0.05},
      {nome: "Amazonas",            sigla: "AM", itbiEscritura: 0.05},
      {nome: "Bahia",               sigla: "BA", itbiEscritura: 0.05},
      {nome: "Ceará",               sigla: "CE", itbiEscritura: 0.05},
      {nome: "Distrito Federal",    sigla: "DF", itbiEscritura: 0.05},
      {nome: "Espírito Santo",      sigla: "ES", itbiEscritura: 0.05},
      {nome: "Goiás",               sigla: "GO", itbiEscritura: 0.05},
      {nome: "Maranhão",            sigla: "MA", itbiEscritura: 0.05},
      {nome: "Mato Grosso",         sigla: "MT", itbiEscritura: 0.05},
      {nome: "Mato Grosso do Sul",  sigla: "MS", itbiEscritura: 0.05},
      {nome: "Minas Gerais",        sigla: "MG", itbiEscritura: 0.05},
      {nome: "Pará",                sigla: "PA", itbiEscritura: 0.05},
      {nome: "Paraíba",             sigla: "PB", itbiEscritura: 0.05},
      {nome: "Paraná",              sigla: "PR", itbiEscritura: 0.05},
      {nome: "Pernambuco",          sigla: "PE", itbiEscritura: 0.05},
      {nome: "Piauí",               sigla: "PI", itbiEscritura: 0.05},
      {nome: "Rio de Janeiro",      sigla: "RJ", itbiEscritura: 0.05},
      {nome: "Rio Grande do Norte", sigla: "RN", itbiEscritura: 0.05},
      {nome: "Rio Grande do Sul",   sigla: "RS", itbiEscritura: 0.05},
      {nome: "Rondônia",            sigla: "RO", itbiEscritura: 0.05},
      {nome: "Roraima",             sigla: "RR", itbiEscritura: 0.05},
      {nome: "Santa Catarina",      sigla: "SC", itbiEscritura: 0.05},
      {nome: "São Paulo",           sigla: "SP", itbiEscritura: 0.05},
      {nome: "Sergipe",             sigla: "SE", itbiEscritura: 0.05},
      {nome: "Tocantins",           sigla: "TO", itbiEscritura: 0.05}
  ];
  
  constructor() { }
}
