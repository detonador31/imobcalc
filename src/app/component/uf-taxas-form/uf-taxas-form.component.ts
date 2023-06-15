import { Component, Input, OnInit } from '@angular/core';
import { EntUfTaxasService } from 'src/app/services/entity/ent-uf_taxas.service'; 
import { UfTaxas } from 'src/app/classes/uf_taxas'; 
import { HelperService } from 'src/app/services/outros/helper.service';
import { ModalController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-uf-taxas-form',
  templateUrl: './uf-taxas-form.component.html',
  styleUrls: ['./uf-taxas-form.component.scss'],
})
export class UfTaxasFormComponent implements OnInit {

  @Input() data: any;
  ufTaxa: UfTaxas;
  title = "Nova Definição de Taxa Estadual";

  constructor(
    private helper: HelperService,    
    private entUfTaxas: EntUfTaxasService,
    private modalCtrl: ModalController,
    private datepipe: DatePipe,
  ) { }

  async ngOnInit() {
    this.ufTaxa = this.data ? this.data : new UfTaxas();
    if(this.ufTaxa.id !== undefined) {
      this.title = "Editar Taxa Estadual";
      this.loadData(this.ufTaxa);
    }
  }

  /**
   * Salva as definições bancárias, antes disso valida e trata os dados
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-10-2020
   * @version 1.0
   * @param ufTaxa ufTaxas
   */   
  async salvar(ufTaxa: UfTaxas) {
    const valida: any = await this.validarDados(ufTaxa);
    if (valida) {
      ufTaxa =  await this.trataData(ufTaxa);
      await this.entUfTaxas.save(ufTaxa);
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
   * @param bTaxa ufTaxas
   */ 
  async validarDados(ufTaxa: UfTaxas) {
    if (!ufTaxa.uf) {
      await this.helper.toast('Preenchimento!', 'Preecha a UF', 'danger', 'middle', 3000);
      return false
    }
    if (!ufTaxa.itbi) {
      await this.helper.toast('Preenchimento!', 'Preencha a porcentagem do ITBI', 'danger', 'middle', 3000);
      return false
    }    
    if (!ufTaxa.cartorio) {
      await this.helper.toast('Preenchimento!', 'Preencha a porcentagem de despesas com Escritura', 'danger', 'middle', 3000);
      return false
    }    

    return true;
  }

  /**
   * Converte os dados de string para valores numericos ou porcentagem antes de salvar no sqLite
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-10-2020
   * @version 1.0
   * @param banco ufTaxas
   */ 
  async trataData(ufTaxa: UfTaxas) {
    ufTaxa.itbi     = ufTaxa.itbi ? this.helper.convertDecimalPorcentagem(ufTaxa.itbi) : 0;
    ufTaxa.cartorio = ufTaxa.cartorio ? this.helper.convertDecimalPorcentagem(ufTaxa.cartorio) : 0;

    return ufTaxa;
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
  async loadData(ufTaxa: UfTaxas) {
    // Copia do array banco Taxa os valores para finan e converte em string para edição
    ufTaxa.itbi     = this.helper.convertPorcentagemDecimal(ufTaxa.itbi , 2); 
    ufTaxa.cartorio = this.helper.convertPorcentagemDecimal(ufTaxa.cartorio , 2); 
  } 

}
