import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { FinanImovel } from 'src/app/classes/finan_imovel';
import { FinanDetalheModalComponent } from 'src/app/component/finan-detalhe-modal/finan-detalhe-modal.component';
import { HelperService } from 'src/app/services/outros/helper.service';
import { GeraPdfService } from 'src/app/services/outros/gera-pdf.service';
import { ParcelasTaxasService } from 'src/app/services/outros/parcelas-taxas.service';

@Component({
  selector: 'app-finan-imovel-calc',
  templateUrl: './finan-imovel-calc.page.html',
  styleUrls: ['./finan-imovel-calc.page.scss'],
})
export class FinanImovelCalcPage implements OnInit {

  finan: FinanImovel = new FinanImovel();
  parcelas: any[] = [];
  loading: any;

  constructor(
    private helper: HelperService,
    private navCtr: NavController,
    private platform: Platform,
    private modalCtrl: ModalController,
    private geraPDF: GeraPdfService,
    private geraParcelas: ParcelasTaxasService,
    private loadingCtrl: LoadingController
  ) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backPage();
    });
  }
  
  async ngOnInit() {
    this.loading = await this.loadingCtrl.create({message: 'Calculando...'});
    await this.loading.present();
    
    this.finan = await this.helper.getLocaStoragetoObject('finan');
    await this.calculosIniciais();
  }

  /**
   * Calcula valores totais do financiamento e parcelas em detalhes
   * author Silvio Watakabe <silvio@tcmed.com.br> 
   * @since 31-10-2020
   * @version 1.0
   */   
  async calculosIniciais() {
    this.finan.salario_parcela_val      = this.finan.salario * 0.3;
    this.finan.percent_juros_mensal     = this.finan.percent_juros_anual ? (Math.pow(1 + this.finan.percent_juros_anual, 1 / 12)) -1 : null;
    this.finan.itbi_escritura_val       = !this.finan.itbi_escritura_val ? 0 : this.finan.itbi_escritura_val;
    this.finan.avaliacao_garantia_val   = !this.finan.avaliacao_garantia_val ? 0 : this.finan.avaliacao_garantia_val;
    this.finan.total_somas              = this.finan.total_imovel_val + this.finan.itbi_escritura_val + this.finan.avaliacao_garantia_val;
    this.finan.saldo_devedor_val        = this.finan.total_somas - this.finan.entrada_val;
    this.finan.amortizacao_mensal_val   = this.finan.saldo_devedor_val / this.finan.qtd_parcelas_meses;
    const data                          = await this.geraParcelas.calculaParcelas(this.finan);
    this.parcelas = data ? data['parcelas'] : null;
    this.finan = data ? data['finan'] : this.finan;

    this.loading.dismiss();
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
      component: FinanDetalheModalComponent,
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
  async gerarPdf(finan: FinanImovel, parcelas: any) {
    this.loading = await this.loadingCtrl.create({message: 'Gerando PDF...'});
    await this.loading.present();

    const data:any = [];
    data['finan'] = finan;
    data['parcelas'] = parcelas;
    await this.geraPDF.gerarPdf(data, 'finanImovel');

    this.loading.dismiss();
  }  

}
