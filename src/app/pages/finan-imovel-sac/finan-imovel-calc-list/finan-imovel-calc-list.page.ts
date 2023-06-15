import { AdmobService } from './../../../services/outros/admob.service';
import { Router } from '@angular/router';
import { EntFinanImovelService } from './../../../services/entity/ent-finan_imovel';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { FinanImovel } from 'src/app/classes/finan_imovel';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';


@Component({
  selector: 'app-finan-imovel-calc-list',
  templateUrl: './finan-imovel-calc-list.page.html',
  styleUrls: ['./finan-imovel-calc-list.page.scss'],
})
export class FinanImovelCalcListPage implements OnInit, OnDestroy {

  finanImovels: FinanImovel[] = [];
  loading: any;

  constructor(
    private navCtr: NavController,
    private platform: Platform,
    private entfinanImovel: EntFinanImovelService,
    private alertCrt: AlertController,
    public router: Router,
    private admobSrv: AdmobService

  ) {   
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backPage();
    });
  }
  
  async ngOnInit() {
    this.list();
    setTimeout(async () => { await this.admobSrv.showBottomBanner();}, 500                                                                        );    
      
  }

  ngOnDestroy() {
    this.admobSrv.removeBanner();
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
  async delete(finanImovel: FinanImovel) {
    const alert = await this.alertCrt.create({
      header: 'Remover?',
      message:  `O registro será excluído, deseja continuar?`,
      buttons: [
        { text: 'não', role: 'cancel'},
        { text: 'sim', handler: () => {
            this.entfinanImovel.delete(finanImovel.id);
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
    this.finanImovels = await this.entfinanImovel.getAll();
    console.log(this.finanImovels);
  }   


}
