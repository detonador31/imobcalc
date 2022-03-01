import { EntFinanImovelPriceService } from './../../../services/entity/ent-finan_imovel_price';
import { ParcelasTaxasPriceService } from './../../../services/outros/parcelas-taxas-price.service';
import { FinanImovelPrice } from 'src/app/classes/finan_imovel_price';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { FinanImovel } from 'src/app/classes/finan_imovel';
import { HelperService } from 'src/app/services/outros/helper.service';
import { GeraPdfService } from 'src/app/services/outros/gera-pdf.service';
import { FinanDetalhePriceModalComponent } from 'src/app/component/finan-detalhe-price-modal/finan-detalhe-price-modal.component';

@Component({
  selector: 'app-price-calc',
  templateUrl: './price-calc.page.html',
  styleUrls: ['./price-calc.page.scss'],
})
export class PriceCalcPage implements OnInit {

  finanPrice:  FinanImovelPrice = new FinanImovelPrice();
  finanTosave: FinanImovelPrice = new FinanImovelPrice();
  parcelas: any[] = [];
  loading: any;  

  constructor(
    private helper: HelperService,
    private navCtr: NavController,
    private platform: Platform,
    private modalCtrl: ModalController,
    private geraPDF: GeraPdfService,
    private geraParcelas: ParcelasTaxasPriceService,
    private loadingCtrl: LoadingController,
    private EntfinanImovelPrice: EntFinanImovelPriceService,
    private route: ActivatedRoute
  ) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backPage();
    });    
   }

   async ngOnInit() {
    // Gera Nova Consulta ou abre consulta salva para edição
    const finanId  = parseFloat(this.route.snapshot.paramMap.get('finanId'));

    this.loading = await this.loadingCtrl.create({message: 'Calculando...'});
    await this.loading.present();

    if(finanId) {
      this.finanPrice = await this.getFinanImovebyId(finanId);
    } else {
      this.finanPrice = await this.helper.getLocaStoragetoObject('finan');
    }
    await this.calculosIniciais();
    this.finanPrice = await this.stringToNumber(this.finanPrice);
/*     console.log('Total', this.finanPrice.total_imovel_val);
    console.log('Entrada', this.finanPrice.entrada_val);
    console.log('Itbi + Escritura', this.finanPrice.itbi_escritura_val);
    console.log('Total Parcelado', this.finanPrice.total_imovel_parcelado_val);
    console.log(this.finanPrice); */

    this.loading.dismiss();
    
  }


  /**
   * Calcula valores totais do financiamento e parcelas em detalhes
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 31-10-2020
   * @version 1.0
   */   
   async calculosIniciais() {
    this.finanPrice.salario_parcela_val      = this.finanPrice.salario * 0.3;
    this.finanPrice.percent_juros_mensal     = this.finanPrice.percent_juros_anual ? (Math.pow(1 + this.finanPrice.percent_juros_anual, 1 / 12)) -1 : null;
    this.finanPrice.itbi_escritura_val       = !this.finanPrice.itbi_escritura_val ? 0 : this.finanPrice.itbi_escritura_val;
    this.finanPrice.avaliacao_garantia_val   = !this.finanPrice.avaliacao_garantia_val ? 0 : this.finanPrice.avaliacao_garantia_val;
    this.finanPrice.total_somas              = this.finanPrice.total_imovel_val + this.finanPrice.itbi_escritura_val + this.finanPrice.avaliacao_garantia_val;
    this.finanPrice.saldo_devedor_val        = this.finanPrice.total_somas - this.finanPrice.entrada_val;
    // this.finanPrice.amortizacao_mensal_val   = this.finanPrice.saldo_devedor_val / this.finanPrice.qtd_parcelas_meses;
    const data                          = await this.geraParcelas.calculaParcelas(this.finanPrice);
    this.parcelas = data ? data['parcelas'] : null;
    this.finanPrice = data ? data['finan'] : this.finanPrice;
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

  /**
   * Mostra uma prévia das parcelas
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 31-10-2020
   * @version 1.0
   * @param finan: FinanImovel
   */   
  async exibirParcelas(finan: FinanImovel) {
    let data: any[] = []
    data['finan'] = finan;
    data['parcelas'] = this.parcelas;
    await this.openParcelasModal(data);
  }  


  /**
   * Abre Modal de Obs no checkOut caso todos os funcionários não sejam atendidos
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param finanData any
   */
  async openParcelasModal(finanData: any) {
    this.loading = await this.loadingCtrl.create({message: 'Calculando...'});
    await this.loading.present();

    const modal = await this.modalCtrl.create({
      component: FinanDetalhePriceModalComponent,
      componentProps: {
        dataDetalhe: finanData
      },
      cssClass: 'finan-detalhe-modal-css'
    });
    this.loading.dismiss();
    await modal.present();
    const data = await modal.onWillDismiss();
    if (data) {
      const result = data.data;
    }
  }

  /**
   * Gera PDF com detalhes sobre o financiamento e parcelas
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 31-10-2020
   * @version 1.0
   * @param finan: FinanImovel
   * @param parcelas: any
   */   
  async gerarPdf(finan: FinanImovelPrice, parcelas: any) {
    this.loading = await this.loadingCtrl.create({message: 'Gerando PDF...'});
    await this.loading.present();

    const data:any = [];
    data['finan'] = finan;
    data['parcelas'] = parcelas;
    await this.geraPDF.gerarPdf(data, 'finanImovel');

    this.loading.dismiss();
  }  

  /**
   * Salva dados preenchidos para novo calculo
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 12-12-2021
   * @version 1.0
   * @param finan: FinanImovel
   * @return boolean
   */   
   async salvarCalc(finan: FinanImovelPrice) {
    this.loading = await this.loadingCtrl.create({message: 'Salvando...'});
    await this.loading.present();
    await this.EntfinanImovelPrice.save(finan);
    await this.calculosIniciais();
    await this.helper.toast('Sucesso', 'Consulta Salva com sucesso!', 'success', 'middle', 3000);
    await this.loading.dismiss();
  }    

  /**
   * Salva dados preenchidos para novo calculo
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 12-12-2021
   * @version 1.0
   * @param finan: FinanImovel
   * @return boolean
   */   
   async getFinanImovebyId(finanId: any) {
    const finanImovel = this.EntfinanImovelPrice.getItem(finanId);
    return finanImovel;
  }   
  
  /**
   * Trata dados de string para números antes de fazer os calculos
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 01-11-2020
   * @version 1.0
   * @param finan: FinanImovel
   */   
   async stringToNumber(finan: FinanImovelPrice) {

    finan.total_imovel_val    = parseInt(finan.total_imovel_val);
    finan.itbi_escritura_val  = parseInt(finan.itbi_escritura_val)
    return finan;
  }  


}
