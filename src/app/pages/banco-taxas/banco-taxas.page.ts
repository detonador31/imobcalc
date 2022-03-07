import { ApiAgendaService } from './../../services/api/api-agenda.service';
import { JsonsService } from './../../services/outros/jsons.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { EntBancoTaxasService } from 'src/app/services/entity/ent-banco_taxas';
import { BancoTaxas } from 'src/app/classes/banco_taxas';
import { HelperService } from 'src/app/services/outros/helper.service';
import { isString, isUndefined } from 'util';
import { BancoTaxasFormComponent } from 'src/app/component/banco-taxas-form/banco-taxas-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banco-taxas',
  templateUrl: './banco-taxas.page.html',
  styleUrls: ['./banco-taxas.page.scss'],
})
export class BancoTaxasPage implements OnInit {

  bancoTaxa: BancoTaxas = new BancoTaxas();
  bancoTaxas: BancoTaxas[] = [];
  taxas: any[] = [];

  constructor(
    private helper: HelperService,    
    private navCtr: NavController,
    private entBancoTaxas: EntBancoTaxasService,
    private modalCtrl: ModalController,
    private router: Router,
    private jsonsService: JsonsService,
    private apiAgenda: ApiAgendaService
  ) { 
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.getAllBancoTaxas();
  } 

  async getAllBancoTaxas() {
    this.bancoTaxas = await this.entBancoTaxas.getAll();

    // Lê arquivo Json e salva no BD taxas caso tabela banco_taxa esteja vazia
    if(this.bancoTaxas.length < 1) {
      this.apiAgenda.jsonBancos().subscribe(
        async resul => {
          const result: any = resul;
          if(result) {
            result.forEach(item => {
              this.entBancoTaxas.save(item);
            });
          } 
        },
      ); 
    }

    // Gera um Json Apartir de um array de taxas bancarias
    // this.geraJsonFromBd(this.bancoTaxas);

    // Busca um array de banco taxas para gravar no BD, segunda opção
    // const bancoJson = this.jsonsService.taxas;
  }

  async salvar(bancoTaxa: BancoTaxas) {
    await this.entBancoTaxas.save(bancoTaxa);
    setTimeout(async () =>{
      this.getAllBancoTaxas();
    }, 2000);
  }

  async stringToNumber(field: string) {
    if ( !isUndefined(this.bancoTaxa[field]) && this.bancoTaxa[field] && isString(this.bancoTaxa[field])) {
      this.bancoTaxa[field] = this.helper.formataFloat(this.bancoTaxa[field]);
    }
  } 
  
  delete(bancoTaxa: BancoTaxas) {
    this.entBancoTaxas.delete(bancoTaxa.id);
    setTimeout(async () =>{
      this.getAllBancoTaxas();
    }, 2000);    
  }

  /**
   * Abre Modal de Obs no checkOut caso todos os funcionários não sejam atendidos
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param bItemId number
   */
  async openFormModal(bancoTaxa: BancoTaxas) {
    const banco = Object.assign({}, bancoTaxa);
    const modal = await this.modalCtrl.create({
      component: BancoTaxasFormComponent,
      componentProps: {
        data: banco
      },
      cssClass: 'banco-taxas-modal-css'
    });
    await modal.present();
    const data = await modal.onWillDismiss();
    if (data) {
      this.getAllBancoTaxas();
    }
  }  

/**
   * Volta para a página anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  backPage() {
    //this.navCtr.back();
    this.router.navigate(['']);
  }

/**
   * Lê a tabela banco_taxas e print uma string Json, para desenvolvimento
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  geraJsonFromBd(bancoTaxas: BancoTaxas[]) {
    let arrayTaxas = [];
    const bancoObj = new BancoTaxas();
    bancoTaxas.forEach(bk => {
      let array = {};
      Object.keys(bancoObj).forEach(key =>{
        array[key] = bk[key];
      });
      arrayTaxas.push(array);
    });
    console.log(JSON.stringify(arrayTaxas));  
  }  

}
