import { EntFinanImovelPriceService } from './../../../services/entity/ent-finan_imovel_price';
import { FinanImovelPrice } from 'src/app/classes/finan_imovel_price';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.page.html',
  styleUrls: ['./price-list.page.scss'],
})
export class PriceListPage implements OnInit {

  finanImovelPrices: FinanImovelPrice[] = [];
  loading: any;

  constructor(
    private navCtr: NavController,
    private platform: Platform,
    private entfinanImovelPrice: EntFinanImovelPriceService,
    private alertCrt: AlertController,
    public router: Router,

  ) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backPage();
    });

   }

   async ngOnInit() {
    this.list();
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
   * Volta para a página anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  async delete(finanImovel: FinanImovelPrice) {
    const alert = await this.alertCrt.create({
      header: 'Remover?',
      message:  `O registro será excluído, deseja continuar?`,
      buttons: [
        { text: 'não', role: 'cancel'},
        { text: 'sim', handler: () => {
            this.entfinanImovelPrice.delete(finanImovel.id);
            this.list();
          }
        }
      ]
    });
    alert.present();
  } 


  /**
   * Volta para a página anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
   async list() {
    this.finanImovelPrices = await this.entfinanImovelPrice.getAll();
  }   

}
