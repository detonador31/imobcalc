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

  taxas: any = [
    {avaliacao_garantia: 3400, banco: "Bradesco",        created_at: "2022-02-28 18:23", id: null, juros_anuais: 0.099,taxa1_mensal: "CESH", taxa1_mensal_check: "true", taxa1_mensal_porcent: null, taxa1_mensal_val: 30.61, taxa2_mensal: "CET", taxa2_mensal_check: "true", taxa2_mensal_porcent: null, taxa2_mensal_val: 37.52, taxa3_mensal: null, taxa3_mensal_check: null, taxa3_mensal_porcent: null, taxa3_mensal_val: null, taxa4_mensal: null, taxa4_mensal_check: null, taxa4_mensal_porcent: null, taxa4_mensal_val: null, taxa5_mensal: null, taxa5_mensal_check: null, taxa5_mensal_porcent: null, taxa5_mensal_val: null, tipo_finam: "imobiliario_price", updated_at: null},
    {avaliacao_garantia: 2500, banco: "Banco Inter",     created_at: "2022-02-27 15:27", id: null, juros_anuais: 0.11, taxa1_mensal: "taxa", taxa1_mensal_check: null,   taxa1_mensal_porcent: null, taxa1_mensal_val: 55, taxa2_mensal: "mvc", taxa2_mensal_check: null, taxa2_mensal_porcent: 0.00005, taxa2_mensal_val: null, taxa3_mensal: "mvr", taxa3_mensal_check: null, taxa3_mensal_porcent: null, taxa3_mensal_val: 45, taxa4_mensal: null, taxa4_mensal_check: null, taxa4_mensal_porcent: null, taxa4_mensal_val: null, taxa5_mensal: null, taxa5_mensal_check: null, taxa5_mensal_porcent: null, taxa5_mensal_val: null, tipo_finam: "imobiliario_price", updated_at: "2022-02-27 23:22"},
    {avaliacao_garantia: 3100, banco: "Bradesco",        created_at: "2022-02-27 11:44", id: null, juros_anuais: 0.12, taxa1_mensal: "taxa", taxa1_mensal_check: "true", taxa1_mensal_porcent: null, taxa1_mensal_val: 70, taxa2_mensal: "mrv", taxa2_mensal_check: null, taxa2_mensal_porcent: 0.00003, taxa2_mensal_val: null, taxa3_mensal: "mvc", taxa3_mensal_check: null, taxa3_mensal_porcent: null, taxa3_mensal_val: 60, taxa4_mensal: null, taxa4_mensal_check: null, taxa4_mensal_porcent: null, taxa4_mensal_val: null, taxa5_mensal: null, taxa5_mensal_check: null, taxa5_mensal_porcent: null, taxa5_mensal_val: null, tipo_finam: "imobiliario_sac", updated_at: "2022-03-01 12:16"},
    {avaliacao_garantia: 3500, banco: "Caixa Economica", created_at: "2022-02-27 10:36", id: null, juros_anuais: 0.11, taxa1_mensal: "Taxa", taxa1_mensal_check: null,   taxa1_mensal_porcent: null, taxa1_mensal_val: 75, taxa2_mensal: "mrc", taxa2_mensal_check: null, taxa2_mensal_porcent: 0.00005, taxa2_mensal_val: null, taxa3_mensal: "mvc", taxa3_mensal_check: null, taxa3_mensal_porcent: null, taxa3_mensal_val: 20, taxa4_mensal: null, taxa4_mensal_check: null, taxa4_mensal_porcent: null, taxa4_mensal_val: null, taxa5_mensal: null, taxa5_mensal_check: null, taxa5_mensal_porcent: null, taxa5_mensal_val: null, tipo_finam: "imobiliario_sac", updated_at: "2022-03-01 12:16"},
    {avaliacao_garantia: 3100, banco: "Itaú",            created_at: "2022-02-27 10:33", id: null, juros_anuais: 0.12, taxa1_mensal: "Taxa", taxa1_mensal_check: null,   taxa1_mensal_porcent: null, taxa1_mensal_val: 70, taxa2_mensal: "mvc", taxa2_mensal_check: null, taxa2_mensal_porcent: 0.00003, taxa2_mensal_val: null, taxa3_mensal: "mrc", taxa3_mensal_check: null, taxa3_mensal_porcent: null, taxa3_mensal_val: 50, taxa4_mensal: null, taxa4_mensal_check: null, taxa4_mensal_porcent: null, taxa4_mensal_val: null, taxa5_mensal: null, taxa5_mensal_check: null, taxa5_mensal_porcent: null, taxa5_mensal_val: null, tipo_finam: "imobiliario_sac", updated_at: "2022-03-01 12:16"}
  ];
  
  constructor() { }
}
