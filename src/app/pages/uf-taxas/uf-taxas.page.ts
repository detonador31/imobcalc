import { ApiAgendaService } from './../../services/api/api-agenda.service';
//import { JsonsService } from './../../services/outros/jsons.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EntUfTaxasService } from 'src/app/services/entity/ent-uf_taxas.service';
import { UfTaxas } from 'src/app/classes/uf_taxas';
import { HelperService } from 'src/app/services/outros/helper.service';
import { UfTaxasFormComponent } from 'src/app/component/uf-taxas-form/uf-taxas-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uf-taxas',
  templateUrl: './uf-taxas.page.html',
  styleUrls: ['./uf-taxas.page.scss'],
})
export class UfTaxasPage implements OnInit {

  ufTaxa:    UfTaxas   = new UfTaxas();
  ufTaxas:   UfTaxas[] = [];
  taxas:     any[]     = [];  

  constructor(
    private helper: HelperService,    
    // private navCtr: NavController,
    private entUfTaxas: EntUfTaxasService,
    private modalCtrl: ModalController,
    private router: Router,
    // private jsonsService: JsonsService,
    private apiAgenda: ApiAgendaService    
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getAllUfTaxas();
  } 

  async getAllUfTaxas() {
    this.ufTaxas = await this.entUfTaxas.getAll();

    // Lê arquivo Json e salva no BD taxas caso tabela banco_taxa esteja vazia
    if(this.ufTaxas.length < 1) {
      this.apiAgenda.jsonUfTaxas().subscribe(
        async resul => {
          const result: any = resul;
          if(result) {
            result.forEach(item => {
              this.entUfTaxas.save(item);
            });
          } 
        },
      ); 
      this.ufTaxas = await this.entUfTaxas.getAll();
    }

    // Gera um Json Apartir de um array de taxas bancarias
    // this.geraJsonFromBd(this.ufTaxas);

    // Busca um array de banco taxas para gravar no BD, segunda opção
    // const bancoJson = this.jsonsService.taxas;
  }

  async salvar(ufTaxas: UfTaxas) {
    await this.entUfTaxas.save(ufTaxas);
    setTimeout(async () =>{
      this.getAllUfTaxas();
    }, 2000);
  }

  async stringToNumber(field: string) {
    if ( this.ufTaxas[field] !== undefined && this.ufTaxas[field] && typeof this.ufTaxas[field] === 'string') {
      this.ufTaxas[field] = this.helper.formataFloat(this.ufTaxas[field]);
    }
  } 
  
  delete(ufTaxas: UfTaxas) {
    this.entUfTaxas.delete(ufTaxas.id);
    setTimeout(async () =>{
      this.getAllUfTaxas();
    }, 2000);    
  }

  /**
   * Abre Modal para cadastrar nova ufTaxa
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param bItemId number
   */
  async openFormModal(ufTaxas: UfTaxas = null) {
    const ufTaxa = Object.assign({}, ufTaxas);
    const modal = await this.modalCtrl.create({
      component: UfTaxasFormComponent,
      componentProps: {
        data: ufTaxa
      },
      cssClass: 'banco-taxas-modal-css'
    });
    await modal.present();
    const data = await modal.onWillDismiss();
    if (data) {
      this.getAllUfTaxas();
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
  geraJsonFromBd(ufTaxas: UfTaxas[]) {
    let arrayUfTaxas = [];
    const ufTaxaObj = new UfTaxas();
    ufTaxas.forEach(bk => {
      let array = {};
      Object.keys(ufTaxaObj).forEach(key =>{
        array[key] = bk[key];
      });
      arrayUfTaxas.push(array);
    });
    console.log(JSON.stringify(arrayUfTaxas));  
  }    

}
