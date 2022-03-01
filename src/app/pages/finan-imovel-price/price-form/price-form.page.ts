import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/outros/helper.service';
import { EntBancoTaxasService } from 'src/app/services/entity/ent-banco_taxas';
import { BancoTaxas } from 'src/app/classes/banco_taxas';
import { LoadingController, Platform, NavController } from '@ionic/angular';
import { ParcelasTaxasService } from 'src/app/services/outros/parcelas-taxas.service';
import { FinanImovelPrice } from 'src/app/classes/finan_imovel_price';


@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.page.html',
  styleUrls: ['./price-form.page.scss'],
})
export class PriceFormPage implements OnInit {

  finanImovelPrice: FinanImovelPrice = new FinanImovelPrice();
  ufs: any[] = [];
  bancoTaxas: BancoTaxas[] = [];
  loading: any;  

  constructor(
    private helper: HelperService,
    private router: Router,
    private entBancoTaxas: EntBancoTaxasService,
    private loadingCtrl: LoadingController,
    private taxasParcelas: ParcelasTaxasService,
    private platform: Platform,
    private navCtr: NavController,     
  ) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backPage();
    });        
   }


  async ngOnInit() {

    this.loading = await this.loadingCtrl.create({message: 'Carregando...'});
    await this.loading.present(); 

    this.bancoTaxas = await this.entBancoTaxas.getByType('imobiliario_price');
    this.loading.dismiss();
    // this.ufs = this.jsonsService.uf;
  }    

  /**
   * Executa tratamento, validação e armazena no local Storage antes de abrir a tela de calculos
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 01-11-2020
   * @version 1.0
   * @param finan: FinanImovel
   */      
   async calcular(finan: FinanImovelPrice) {
    let finanImovelPrice = Object.assign({}, finan);
    finanImovelPrice = await this.trataData(finanImovelPrice);
    const valida = await this.validarDados(finanImovelPrice);
    if (valida) {
      localStorage.setItem('finan', JSON.stringify(finanImovelPrice));
      this.router.navigate(['./price-calc']); 
    }
  }  

  /**
   * Aplica meses se digitado anos ou anos se digitado meses
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 01-11-2020
   * @version 1.0
   * @param digitado: string
   */      
  async mesesOuAnos(digitado: string) {
    let anos  = this.finanImovelPrice.qtd_parcelas_anos  !== undefined ? this.finanImovelPrice.qtd_parcelas_anos  : 0;
    let meses = this.finanImovelPrice.qtd_parcelas_meses !== undefined ? this.finanImovelPrice.qtd_parcelas_meses : 0;
    anos   = typeof anos   === 'string' ? this.helper.formataFloat(anos)  : anos;
    meses  = typeof meses  === 'string' ? this.helper.formataFloat(meses) : meses;
    this.finanImovelPrice.qtd_parcelas_meses = digitado === 'meses' ? meses : anos * 12;
    this.finanImovelPrice.qtd_parcelas_anos  = digitado === 'anos'  ? anos  : meses / 12;
    if ( this.finanImovelPrice.qtd_parcelas_meses === 0 && this.finanImovelPrice.qtd_parcelas_meses === 0) {
      this.finanImovelPrice.qtd_parcelas_meses = null;
      this.finanImovelPrice.qtd_parcelas_anos = null;
    } 
  }  

  /**
   * Atualiza Seleção de ITBI + Escritura
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 01-11-2020
   * @version 1.0
   * @param choice: string
   */    
  async atualizaItbi(choice: string) {
    let total_imovel_val   =  this.finanImovelPrice.total_imovel_val !== undefined   ? this.finanImovelPrice.total_imovel_val   : 0; 
    total_imovel_val   = typeof total_imovel_val   === 'string' ? this.helper.formataFloat(total_imovel_val) : total_imovel_val;

    if (choice === '1' && total_imovel_val > 0) {
      this.finanImovelPrice.itbi_escritura_val = this.helper.numberToCurrency(total_imovel_val * 0.05);
    } else {
      this.finanImovelPrice.itbi_escritura_val = null;
    }
  }


  /**
   * Aplica valores de juros, avaliação de garantia e taxas dos bancos selecionados
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 01-11-2020
   * @version 1.0
   * @param e: any event
   */   
  async aplicaBanco(e: any) {
    const id = e.detail.value;
    if (id) {
      let bancoTaxa: BancoTaxas = new BancoTaxas();
      bancoTaxa = await this.entBancoTaxas.getItem(id);
      this.finanImovelPrice = await this.taxasParcelas.taxasMensaisFinam(bancoTaxa, this.finanImovelPrice, 'finan');
    }
  }
  
  /**
   * Identifica nas taxas se foi preenchido valor ou porcentagem - impede que os dois campos sejam preenchidos ao mesmo tempo
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 01-11-2020
   * @version 1.0
   * @param finan: FinanImovel
   * @param tipo: string
   */  
  taxaValOuPorcent(field: string, tipo: string){
    const fild_porcent = field + '_porcent';
    const fild_val     = field + '_val';
    if ((this.finanImovelPrice[fild_porcent] && tipo !== 'val')  || (this.finanImovelPrice[fild_val] && tipo === 'val')){
      if (tipo === 'val') {
        this.finanImovelPrice[fild_porcent] = null;
      } else {
        this.finanImovelPrice[fild_val] = null;
      }
    }
  }  

  /**
   * Trata dados de string para números antes de fazer os calculos
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 01-11-2020
   * @version 1.0
   * @param finan: FinanImovel
   */   
  async trataData(finan: FinanImovelPrice) {
    finan.total_imovel_val         = finan.total_imovel_val ? this.helper.formataFloat(finan.total_imovel_val) : 0;
    finan.entrada_val              = finan.entrada_val ? this.helper.formataFloat(finan.entrada_val) : 0;
    finan.itbi_escritura_val       = finan.itbi_escritura_choice === '1' && finan.itbi_escritura_val ? 
      this.helper.formataFloat(finan.itbi_escritura_val) : 0;
    finan.avaliacao_garantia_val   = finan.avaliacao_garantia_choice === '1' && finan.avaliacao_garantia_val ? 
      this.helper.formataFloat(finan.avaliacao_garantia_val) : 0;
    finan.percent_juros_anual      = finan.percent_juros_anual ? this.helper.convertDecimalPorcentagem(finan.percent_juros_anual) : 0;
    finan.salario                  = finan.salario  ? this.helper.formataFloat(finan.salario) : 0;
    finan                          = await this.taxasParcelas.taxasStringToNumber(finan, null ,'finan');

    return finan;
  }

  /**
   * Valida campos obrigatórios
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 31-10-2020
   * @version 1.0
   * @param finan: FinanImovel
   */ 
  async validarDados(finan: FinanImovelPrice) {
    if (!finan.banco_id) {
      await this.helper.toast('Preenchimento!', 'Selecione o Banco', 'warning', 'middle', 3000);
      return false
    }
    
    if (!finan.total_imovel_val || finan.total_imovel_val  < 1) {
      await this.helper.toast('Preenchimento!', 'Digite o Valor do Imóvel', 'warning', 'middle', 3000);
      return false
    }  
    
    if (!finan.entrada_val || finan.entrada_val  < 1) {
      await this.helper.toast('Preenchimento!', 'Digite o Valor de entrada', 'warning', 'middle', 3000);
      return false
    }       

    if (!finan.itbi_escritura_choice) {
      await this.helper.toast('Preenchimento!', 'Incluir ITBI + EScritura? Selecione', 'warning', 'middle', 3000);
      return false
    }        
    if (!finan.avaliacao_garantia_choice) {
      await this.helper.toast('Preenchimento!', 'Incluir Avaliação de Garantia? Selecione', 'warning', 'middle', 3000);
      return false
    }     
    if (!finan.qtd_parcelas_anos || !finan.qtd_parcelas_meses) {
      await this.helper.toast('Preenchimento!', 'Preencha a quantidade de meses ou anos', 'warning', 'middle', 3000);
      return false
    }
    if (!finan.salario) {
      await this.helper.toast('Preenchimento!', 'Preencha a renda mensal familiar, servirá para calculo do valor máximo da parcela', 'warning', 'middle', 3000);
      return false
    }
    return true;
  }

  /**
   * Volta para a página anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
   backPage() {
    this.navCtr.back();
  }    

}
