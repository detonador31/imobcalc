import { Injectable } from '@angular/core';
import { FinanImovel } from 'src/app/classes/finan_imovel';
import { isUndefined } from 'util';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class ParcelasTaxasService {

  constructor(
    private helper: HelperService
  ) { }


  /**
   * Calcula Parcelas e outros campos de Financiamento e preenche array de parcelas e Finam
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31/10/2020
   * @version 1.0
   * @param parcela any Somente Array de Parcelas
   * @return parcelaArray
   */    
  async calculaParcelas(finan: FinanImovel) {
    let parcelas: any[] = [];
    
    let qtdMeses = finan.qtd_parcelas_meses + 1;
    finan.total_imovel_parcelado_val  = 0;
    finan.total_juros_somados_val  = 0;
    finan.total_taxas_somados_val  = 0;
    finan.total_perdas_somados_val  = 0;

    for (var i = 0; i < (finan.qtd_parcelas_meses + 1); i++) {
      let parcela: any = [];
      parcela.perdaVal = 0;
      parcela.numParcela = i;

      if (i > 0) {
        parcela.amortizacao = finan.amortizacao_mensal_val;
        let saldoDevedorParcela = parcela.amortizacao * qtdMeses;
        parcela.juros= saldoDevedorParcela * finan.percent_juros_mensal;
        parcela.saldoDevedor = (parcela.amortizacao * qtdMeses) - parcela.amortizacao;

        parcela.juros= this.helper.arredondarPraCima(parcela.juros, 2);
        parcela.saldoDevedor = this.helper.arredondarPraCima(parcela.saldoDevedor, 2);
      } else {
        // Calculo diferenciado para parcela zero
        parcela.amortizacao = 0;
        parcela.saldoDevedor = finan.amortizacao_mensal_val * (qtdMeses - 1);
        parcela.juros= 0;

        parcela.saldoDevedor = this.helper.arredondarPraCima(parcela.saldoDevedor, 0);
      }

      parcela = await this.taxasPorParcela(parcela, finan);
      finan = await this.taxasTotaisFinam(finan, parcela);
      parcela.perdaVal = parcela.juros + parcela.somaTaxas;
      parcela.total = parcela.amortizacao + parcela.perdaVal;

      parcela.amortizacao = this.helper.arredondarPraCima(parcela.amortizacao, 2);
      parcela.perdaVal= this.helper.arredondarPraCima(parcela.perdaVal, 2);
      parcela.total = this.helper.arredondarPraCima(parcela.total, 2);;
      // Valor da Primeira Parcela
      if (parcela.numParcela === 1) {
        finan.primeira_parcela = parcela.total;
      }
      // Valor da Última Parcela
      if (i === finan.qtd_parcelas_meses) {
        finan.ultima_parcela = parcela.total;
      }
      qtdMeses--;

      finan.total_imovel_parcelado_val += parcela.total;
      finan.total_juros_somados_val    += parcela.juros;
      finan.total_perdas_somados_val   += (parcela.somaTaxas + parcela.juros);

      parcelas.push(parcela);
    }
    // Arredonda dizimas pediódicas
    finan.primeira_parcela            = this.helper.arredondarPraCima(finan.primeira_parcela, 0);
    finan.ultima_parcela              = this.helper.arredondarPraCima(finan.ultima_parcela, 0);
    finan.total_imovel_parcelado_val  = this.helper.arredondarPraCima(finan.total_imovel_parcelado_val, 0);
    finan.total_juros_somados_val     = this.helper.arredondarPraCima(finan.total_juros_somados_val, 0);
    finan.total_taxas_somados_val     = this.helper.arredondarPraCima(finan.total_taxas_somados_val, 0);
    finan.total_perdas_somados_val    = this.helper.arredondarPraCima(finan.total_perdas_somados_val, 0);
    const data:any = [];
    data['finan'] = finan;
    data['parcelas'] = parcelas;

    return data;
  }

  /**
   * Soma os totais de cada taxa para o PDF detalhado
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31/10/2020
   * @version 1.0
   * @param finan FinanImovel
   * @param parcela any
   * @return parcela
   */     
  async taxasPorParcela(parcela: any, finan: FinanImovel) {
    parcela.somaTaxas = 0;
    for (var i = 1; i < 6; i++) { 
      const fieldLabel   = 'taxa' + i + '_mensal';
      const fieldVal     = 'taxa' + i + '_mensal_val';
      const fieldPorcent = 'taxa' + i + '_mensal_porcent';
      const fieldCheck   = 'taxa' + i + '_mensal_check';
      if (finan[fieldLabel]) {
        parcela[fieldLabel] = finan[fieldLabel];
        parcela[fieldVal] = finan[fieldPorcent] ? this.helper.arredondarPraCima(
          parcela.saldoDevedor * finan[fieldPorcent] , 2) : finan[fieldVal] ;
        if (parcela.numParcela === 0 && finan[fieldCheck] === 'false'){
          parcela[fieldVal] = 0;
        }
        if (parcela.numParcela === finan.qtd_parcelas_meses && finan[fieldCheck] === true){
          parcela[fieldVal] = 0;
        }
        parcela.somaTaxas += parcela[fieldVal];
      }
    }
    return parcela;
  }

  /**
   * Soma os totais de cada taxa para o PDF detalhado
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31/10/2020
   * @version 1.0
   * @param finan FinanImovel
   * @param parcela any
   * @return finan
   */    
  async taxasTotaisFinam(finan: FinanImovel, parcela: any) {
    for (var i = 1; i < 6; i++) {
      const fieldLabel    = 'taxa' + i + '_mensal';
      const fieldVal      = 'taxa' + i + '_mensal_val';
      const fieldValTotal = 'total_taxa' + i + '_val';
      if (finan[fieldLabel]) {
        finan[fieldValTotal] = finan[fieldValTotal] ? finan[fieldValTotal] + parcela[fieldVal] :
          parcela[fieldVal];
        finan[fieldValTotal] = this.helper.arredondarPraCima(finan[fieldValTotal], 2);
      }
      finan.total_taxas_somados_val = parcela[fieldVal] ? finan.total_taxas_somados_val +
        parcela[fieldVal] : finan.total_taxas_somados_val;
    }
    return finan;
  }  

  /**
   * Compoe Array de Parcelas para montar as linhas do PDF
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31/10/2020
   * @version 1.0
   * @param parcela any Somente Array de Parcelas
   * @return parcelaArray
   */    
  async parcelasForPdf(parcela: any) {
    let parcelaArray = [];
    if (parcela.length > 0) {
      let i = 0;
      for (const item of parcela) {
        if (i === 0) {
          // Cabeçalho da tabela
          let head = [  
                 'Par.',
             'Amortiz.',
                'Juros',
          (!isUndefined(item.taxa1_mensal) ? item.taxa1_mensal : null) ,
          (!isUndefined(item.taxa2_mensal) ? item.taxa2_mensal : null) ,
          (!isUndefined(item.taxa3_mensal) ? item.taxa3_mensal : null) ,
          (!isUndefined(item.taxa4_mensal) ? item.taxa4_mensal : null) ,
          (!isUndefined(item.taxa5_mensal) ? item.taxa5_mensal : null) ,
              'Juros+Tax',
                'Total Parc.',
           'Sal. Dev.'
          ];
          head = head.filter(  (el) => { return el !== null });
          parcelaArray.push(head);
        }
        // COnteúdo com parcelas da tabela
        let parc = [                                        item.numParcela,
                     'R$ ' + this.helper.numberToCurrency(item.amortizacao),
                           'R$ ' + this.helper.numberToCurrency(item.juros),
        (!isUndefined(item.taxa1_mensal_val) ? 'R$ ' + this.helper.numberToCurrency(item.taxa1_mensal_val) : null) ,
        (!isUndefined(item.taxa2_mensal_val) ? 'R$ ' + this.helper.numberToCurrency(item.taxa2_mensal_val) : null) ,
        (!isUndefined(item.taxa3_mensal_val) ? 'R$ ' + this.helper.numberToCurrency(item.taxa3_mensal_val) : null) ,
        (!isUndefined(item.taxa4_mensal_val) ? 'R$ ' + this.helper.numberToCurrency(item.taxa4_mensal_val) : null) ,
        (!isUndefined(item.taxa5_mensal_val) ? 'R$ ' + this.helper.numberToCurrency(item.taxa5_mensal_val) : null) ,
                        'R$ ' + this.helper.numberToCurrency(item.perdaVal),
                           'R$ ' + this.helper.numberToCurrency(item.total),
                    'R$ ' + this.helper.numberToCurrency(item.saldoDevedor)
        ];  
        
        parc = parc.filter( (el) => {return el !== null});        
        parcelaArray.push(parc);
        i++;
      }
    }
    return parcelaArray;
  }  

  /**
   * Converte taxas de string para número
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31/10/2020
   * @version 1.0
   * @param bancoTaxa any Somente Array de BancoTaxas ou  Null
   * @param finan any Somente Array de FinanImovel ou  Null
   * @param tipo string tipo de valor para conversão
   * @return resul Array ou null
   */  
  async taxasStringToNumber(finan: any, banco: any, tipo: string) {
    // Converte Array Finan nos campos de taxas de String para número
    if (tipo === 'finan'){
      for (var i = 1; i < 6; i++) {
        const fieldLabel   = 'taxa' + i + '_mensal';
        const fieldVal     = 'taxa' + i + '_mensal_val';
        const fieldPorcent = 'taxa' + i + '_mensal_porcent';
        if (finan[fieldLabel]) {
          finan[fieldVal]       = finan[fieldVal] && finan[fieldVal] !== undefined ? 
            this.helper.formataFloat(finan[fieldVal]) : finan[fieldVal];
          finan[fieldPorcent]   = finan[fieldPorcent] && finan[fieldPorcent] !== undefined ?
            this.helper.convertDecimalPorcentagem(finan[fieldPorcent]) : finan[fieldPorcent];
        }
      }
      return finan;
    }

    // Converte Array bancoTaxas nos campos de taxas de String para número
    if (tipo === 'banco'){
      for (var i = 1; i < 6; i++) {
        const fieldLabel   = 'taxa' + i + '_mensal';
        const fieldVal     = 'taxa' + i + '_mensal_val';
        const fieldPorcent = 'taxa' + i + '_mensal_porcent';
        if (banco[fieldLabel]) {
          banco[fieldVal]       = banco[fieldVal] && banco[fieldVal] !== undefined ?
            this.helper.formataFloat(banco[fieldVal]) : banco[fieldVal];
          banco[fieldPorcent]   = banco[fieldPorcent] && banco[fieldPorcent] !== undefined ?
            this.helper.convertDecimalPorcentagem(banco[fieldPorcent]): banco[fieldPorcent];
        }
      }
      return banco;
    }
    return null;
  }  


  /**
   * Converte taxas de número para string de exibição
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31/10/2020
   * @version 1.0
   * @param bancoTaxa any Somente Array de BancoTaxas ou  Null
   * @param finan any Somente Array de FinanImovel ou  Null
   * @param tipo string tipo de valor para conversão
   * @return resul string
   */  
  async taxasMensaisFinam(bancoTaxa: any, finan: any, tipo: string) {
    // Copia do array banco Taxa os valores para finan e converte em string para edição
    if(tipo === 'finan'){
      finan.banco_id    = bancoTaxa.id;   
      finan.banco_nome  = bancoTaxa.banco;
      finan.avaliacao_garantia_val = this.helper.numberToCurrency(bancoTaxa.avaliacao_garantia);
      finan.percent_juros_anual = this.helper.convertPorcentagemDecimal(bancoTaxa.juros_anuais, 2);
      for (var i = 1; i < 6; i++) {
        const fieldLabel   = 'taxa' + i + '_mensal';
        const fieldVal     = 'taxa' + i + '_mensal_val';
        const fieldCheck   = 'taxa' + i + '_mensal_check';
        const fieldPorcent = 'taxa' + i + '_mensal_porcent';
        if (bancoTaxa[fieldLabel]) {
          finan[fieldLabel]     = bancoTaxa[fieldLabel];
          finan[fieldCheck]     = bancoTaxa[fieldCheck];
          finan[fieldVal]       = bancoTaxa[fieldVal] && bancoTaxa[fieldVal] !== undefined ?
          this.helper.numberToCurrency(bancoTaxa[fieldVal]) : bancoTaxa[fieldVal];
          finan[fieldPorcent]   = bancoTaxa[fieldPorcent] && bancoTaxa[fieldPorcent] !== undefined ?
          this.helper.convertPorcentagemDecimal(bancoTaxa[fieldPorcent], 3) : bancoTaxa[fieldPorcent];
        } else {
          finan[fieldLabel]     = null;
          finan[fieldCheck]     = null;
          finan[fieldVal]       = null;
          finan[fieldPorcent]   = null;  
        }
      }
      return finan;
    }
    // Converte array banco Taxa em string para edição
    if (tipo === 'banco') {
      bancoTaxa.avaliacao_garantia = !bancoTaxa.avaliacao_garantia ? '0,00' :
        this.helper.numberToCurrency(bancoTaxa.avaliacao_garantia);
      bancoTaxa.juros_anuais       = bancoTaxa.juros_anuais  ? this.helper.convertPorcentagemDecimal(bancoTaxa.juros_anuais , 2) :
        bancoTaxa.juros_anuais; 
      for (var i = 1; i < 6; i++) {
        const fieldVal     = 'taxa' + i + '_mensal_val';
        const fieldPorcent = 'taxa' + i + '_mensal_porcent';
        const fieldLabel   = 'taxa' + i + '_mensal';        
        if (bancoTaxa[fieldLabel]) {
          bancoTaxa[fieldVal]     = bancoTaxa[fieldVal] ? this.helper.numberToCurrency(bancoTaxa[fieldVal]) :
            bancoTaxa[fieldVal];
          bancoTaxa[fieldPorcent] = bancoTaxa[fieldPorcent]  ? this.helper.convertPorcentagemDecimal(bancoTaxa[fieldPorcent], 3) :
            bancoTaxa[fieldPorcent];
        }
      }
      return bancoTaxa;
    }
    return null;
  }  
  
}
