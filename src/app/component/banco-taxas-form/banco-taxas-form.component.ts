import { Component, Input, OnInit } from '@angular/core';
import { EntBancoTaxasService } from 'src/app/services/entity/ent-banco_taxas';
import { BancoTaxas } from 'src/app/classes/banco_taxas';
import { HelperService } from 'src/app/services/outros/helper.service';
import { ModalController } from '@ionic/angular';
import { isUndefined } from 'util';
import { DatePipe } from '@angular/common';
import { ParcelasTaxasService } from 'src/app/services/outros/parcelas-taxas.service';

@Component({
  selector: 'app-banco-taxas-form',
  templateUrl: './banco-taxas-form.component.html',
  styleUrls: ['./banco-taxas-form.component.scss'],
})
export class BancoTaxasFormComponent implements OnInit {
  @Input() data: any;
  bancoTaxa: BancoTaxas;
  title = "Nova Definição Bancaria";

  constructor(
    private helper: HelperService,    
    private entBancoTaxas: EntBancoTaxasService,
    private modalCtrl: ModalController,
    private datepipe: DatePipe,
    private parcelaTaxa: ParcelasTaxasService
  ) { }

  async ngOnInit() {
    this.bancoTaxa = this.data ? this.data : new BancoTaxas();
    if(!isUndefined(this.bancoTaxa.id)) {
      this.title = "Editar Definição Bancaria";
    }
    this.bancoTaxa = this.bancoTaxa.id === undefined ? this.bancoTaxa :
    await this.parcelaTaxa.taxasMensaisFinam(this.bancoTaxa, null, 'banco');    
  }

  async salvar(bancoTaxa: BancoTaxas) {
    const valida: any = await this.validarDados(bancoTaxa);
    if (valida) {
      bancoTaxa =  await this.trataData(bancoTaxa);
      console.log(bancoTaxa);
      await this.entBancoTaxas.save(bancoTaxa);
      await this.helper.toast('Sucesso!', 'Taxa bancária salva com sucesso', 'success', 'middle', 3000);
      const array = {
        status: 'ok'
      };
      this.fecharModal(array);
    } 
  }  
  
  /**
   * Valida campos obrigatórios
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-10-2020
   * @version 1.0
   * @param bTaxa BancoTaxas
   */ 
  async validarDados(bTaxa: BancoTaxas) {
    if (!bTaxa.banco) {
      await this.helper.toast('Preenchimento!', 'Preecha o banco', 'danger', 'middle', 3000);
      return false
    }
    if (!bTaxa.tipo_finam) {
      await this.helper.toast('Preenchimento!', 'Escolha o tipo de financiamento', 'danger', 'middle', 3000);
      return false
    }    
    if (!bTaxa.juros_anuais) {
      await this.helper.toast('Preenchimento!', 'Preecha a taxa de juros anuais', 'danger', 'middle', 3000);
      return false
    }
    if (!bTaxa.avaliacao_garantia) {
      await this.helper.toast('Preenchimento!', 'Mesmo zero, preencha avaliação de garantia', 'danger', 'middle', 3000);
      return false
    }
    return true;
  }

  /**
   * Converte os dados de string para valores numericos ou porcentagem antes de salvar no sqLite
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-10-2020
   * @version 1.0
   * @param banco BancoTaxas
   */ 
  async trataData(banco: BancoTaxas) {
    banco.avaliacao_garantia = !banco.avaliacao_garantia ? '0,00' : banco.avaliacao_garantia;
    banco.avaliacao_garantia = this.helper.formataFloat(banco.avaliacao_garantia);
    banco.juros_anuais = this.helper.convertDecimalPorcentagem(banco.juros_anuais);
    banco = await this.parcelaTaxa.taxasStringToNumber(null, banco, 'banco');

    return banco;
  }

  /**
   * Para cada taxa impede que valor e porcentagem sejam preenchidos ao mesmo tempo
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param field string
   * @param tipo string
   */  
  taxaValOuPorcent(field: string, tipo: string){
    const fild_porcent = field + '_porcent';
    const fild_val     = field + '_val';
    if ((this.bancoTaxa[fild_porcent] && tipo !== 'val')  || (this.bancoTaxa[fild_val] && tipo === 'val')){
      if (tipo === 'val') {
        this.bancoTaxa[fild_porcent] = null;
      } else {
        this.bancoTaxa[fild_val] = null;
      }
    }
  }

  /**
   * Fecha o Modal
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */  
  fecharModal(array = {}) {
    this.modalCtrl.dismiss(array);
  }  

}
