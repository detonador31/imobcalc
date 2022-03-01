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
    private router: Router
  ) { 
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.getAllBancoTaxas();
  } 

  async getAllBancoTaxas() {
    this.bancoTaxas = await this.entBancoTaxas.getAll();
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

}
