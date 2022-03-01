import { Injectable } from '@angular/core';
import { HelperService } from 'src/app/services/outros/helper.service';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
const { FileSystem} = Plugins;
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { ParcelasTaxasService } from 'src/app/services/outros/parcelas-taxas.service';
import { FinanImovel } from 'src/app/classes/finan_imovel';

@Injectable({
  providedIn: 'root'
})
export class GeraPdfService {
  pdfObj = null;
  data: any = null;
  finan: any = null;

  constructor(
    private helper:      HelperService,
    private plt:         Platform,
    private fileOpener:  FileOpener,
    private file:        File, 
    private parcelaServ: ParcelasTaxasService
  ) { }

  async gerarPdf(data, pdfName) {
    let documento: any;

    switch (pdfName) {
      case 'finanImovel':
        documento = await this.geraFinamImovel(data);
        return documento;
      case 'emprestimo':
        documento = await this.geraEmprestimo(data);
        return documento;
    }

  }  

  async geraFinamImovel(data) {
    const parcelas      = data['parcelas'];
    const finan         = data['finan'];
    const titulo        = finan.primeira_parcela === undefined ? "PRICE" : "SAC";
    const finanPdfArray = await this.finanArrayToPdf(finan);
    const parcelasPdfArray = await this.parcelaServ.parcelasForPdf(parcelas);
    const styles: any =
      {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        tableParcelas: {
          fontSize: 10
        }
      };

    const documento = {
      content: [
        {text: 'Financiamento Imobiliário (' + titulo + ')', style: 'header'},
 /*        {text: '', style: 'subheader'}, */
      
        'Este documento tem como objetivo esclarecer um financiamento baseado na tabela ' + titulo + '.'           +
        ' As taxas e juros aqui simulados são baseados em simuladores de instituições bancarias pré-selecionadas.' +
        ' Não podemos garantir que serão os mesmos juros ou taxas no ato de uma contratação.',
        ' Os valores de seguros e taxas podem variar de acordo com a idade do cliente e outras definições no ato' +
        ' do pedido de crédito.',
        {text: 'Informações Gerais', style: 'subheader'},
        {text: '', style: 'subheader'},        
        {
          style: '',
          table: {
            body: finanPdfArray
          }
        },
        {text: 'Parcelamento em detalhes', style: 'subheader'},
        {text: '', style: 'subheader'},
        {
          style: 'tableParcelas',
          table: {
            body: parcelasPdfArray
          }
        },
      ],
      styles
    };

    this.pdfObj = pdfMake.createPdf(documento);

    this.download(this.pdfObj);
  }  

  async geraEmprestimo(data) {
  }
  
  download(pdfObj) {
    if (this.plt.is('android')) { 

      pdfObj.getBuffer((buffer) => {
        let utf8 = new Uint8Array(buffer);
        // let binaryArray = utf8.buffer;
        let binaryArray = new Blob([buffer], {type: 'application/pdf'});
        let fileName = `simulacao_${Date.now()}.pdf`;
        this.saveToDevice(binaryArray, fileName);
      });
    } else {
      pdfObj.open();
    }
  }

  saveToDevice(binaryArray: any, saveFile: any) {
    this.file.writeFile(this.file.dataDirectory, saveFile, binaryArray, { replace:true })
      .then((response) => {
        //this.helper.toast('Mensagem', 'Arquivo Salvo com sucesso', 'success', 'middle', 3000);
        this.fileOpener.open(`${response.nativeURL}`, 'application/pdf');
      })
      .catch((error) => {
        console.log('Erro!', error);
      });
  }  

  async finanArrayToPdf(finan: FinanImovel) {
    let finamPdfArray = [];
    finamPdfArray.push(['Valor do Imóvel',          'R$ ' + this.helper.numberToCurrency( finan.total_imovel_val)]);
    finamPdfArray.push(['Entrada',                  'R$ ' + this.helper.numberToCurrency( finan.entrada_val)]);
    finamPdfArray.push(['ITBI + Escritura',         'R$ ' + this.helper.numberToCurrency( finan.itbi_escritura_val)]);
    finamPdfArray.push(['Avaliação de Garantia',    'R$ ' + this.helper.numberToCurrency( finan.avaliacao_garantia_val)]);
    finamPdfArray.push(['Saldo Devedor',            'R$ ' + this.helper.numberToCurrency( finan.saldo_devedor_val)]);
    finamPdfArray.push(['Parcelas',                  finan.qtd_parcelas_meses]);
    if(finan.amortizacao_mensal_val) {
      finan.amortizacao_mensal_val = this.helper.arredondarPraCima(finan.amortizacao_mensal_val, 2);
      finamPdfArray.push(['Amortização Mensal',       'R$ ' + this.helper.numberToCurrency(finan.amortizacao_mensal_val)]);
    }
    finamPdfArray.push(['Juros Anuais',             this.helper.convertPorcentagemDecimal(finan.percent_juros_anual, 2) + '%']);
    finamPdfArray.push(['Juros Mensais',            this.helper.convertPorcentagemDecimal(finan.percent_juros_mensal, 3) + '%']);
    finamPdfArray = await this.taxasMensais(finamPdfArray, finan, 'mensal');
    finamPdfArray.push(['Total Prestações',         'R$ ' + this.helper.numberToCurrency( finan.total_imovel_parcelado_val)]);
    finamPdfArray.push(['Total Juros',              'R$ ' + this.helper.numberToCurrency( finan.total_juros_somados_val)]);
    finamPdfArray = await this.taxasMensais(finamPdfArray, finan, 'totalMeses');
    finamPdfArray.push(['Total Juros + Taxas',      'R$ ' + this.helper.numberToCurrency( finan.total_perdas_somados_val)]);
    finamPdfArray.push(['Salário',     'R$ ' + this.helper.numberToCurrency( finan.salario)]);
    finamPdfArray.push(['Percentagem Máxima',       30 + '%']);
    finamPdfArray.push(['Valor Máximo de parcela',  'R$ ' + this.helper.numberToCurrency( finan.salario_parcela_val)]);

    return finamPdfArray;
  }  

  async taxasMensais(finamPdfArray: any, finan: FinanImovel, tipo: string) {
    for (let i = 1; i < 6; i++) {
      const fieldLabel = 'taxa' + i + '_mensal';
      const fieldVal = 'taxa' + i + '_mensal_val';
      const fieldPorcent = 'taxa' + i + '_mensal_porcent';
      const fieldTotalVal = 'total_taxa' + i + '_val';
      if (finan[fieldLabel] && tipo === 'mensal') {
        if (finan[fieldVal]) {
          finamPdfArray.push([finan[fieldLabel] + ' Mensal',  'R$ ' + this.helper.numberToCurrency(finan[fieldVal])]);
        } else {
          finamPdfArray.push([finan[fieldLabel] + ' Mensal',  this.helper.convertPorcentagemDecimal(finan[fieldPorcent], 3) + '%']);
        }
      }
      if (finan[fieldLabel] && tipo === 'totalMeses') {
        const totalTaxa = this.helper.numberToCurrency(finan[fieldTotalVal]);
        finamPdfArray.push(['Total ' + finan[fieldLabel],  'R$ ' + totalTaxa]);
      }
    }
    return finamPdfArray;
  }      
}
