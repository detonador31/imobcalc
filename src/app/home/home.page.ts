import { ImovelSacComponent } from './../component/imovel-sac/imovel-sac.component';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HelperService } from './../services/outros/helper.service';
// Para armazenar Cookie no aplicativo
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, OnDestroy } from '@angular/core';
// Usado para Status de conexão de rede
import { Plugins, PluginListenerHandle } from '@capacitor/core';
import { ImovelPriceComponent } from '../component/imovel-price/imovel-price.component';
import { Network } from '@capacitor/network';
import { AdmobService } from '../services/outros/admob.service';
import { TutorialComponent } from '../component/tutorial/tutorial.component';

const { Network2 } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  private readonly listenerHandlers: PluginListenerHandle[] = [];
  public isLoading = false;  

  // tslint:disable: no-string-literal
  networkStatus: any;
  networkListener: PluginListenerHandle;
  status: string;
  statusClass: string;
  loading: any; 
  router: Router; 
  isModalOpen: Boolean = false;

  ngOnDestroy() {
    this.networkListener.remove();
  }

  constructor(
    private cookie: CookieService,
    private helper: HelperService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    public admobService: AdmobService,
  ) {
    this.statusClass = null;
  }

  async ngOnInit() {
  }

  ionViewWillEnter() {
    this.admobService.showBottomBanner();
    this.networkListener = Network.addListener('networkStatusChange', status => {
      this.networkStatus = status;
    });

    this.getNetworkStatus();
    this.deleteCookies();
    this.helper.setColors( '#0000FF', '#0000FF'); // Exemplo de cores para status e navigation bar    
    this.openTutorialModal();
  }

  ionViewWillLeave(){
    this.admobService.removeBanner();
  }

  /**
   * Remove o cookie não iniciado
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 04-09-2020
   * @version 1.0
   */
  deleteCookies() {
    this.cookie.delete('PHPSESSID');
  }

  /**
   * Fecha o app
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 04-09-2020
   * @version 1.0
   */
  fechaApp() {
    navigator['app'].exitApp();
  }

  /**
   * Verifica status de conexão
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 04-09-2020
   * @version 1.0
   */
  async getNetworkStatus() {
    this.networkStatus = await Network.getStatus();
    this.status = this.networkStatus.connected ? 'Online' : 'OffLine';
    this.statusClass = this.status === 'Online' ? 'success' : 'danger';
  }

  /**
   * Se online abre tela de login ou emite mensagem caso esteja sem internet
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 04-09-2020
   * @version 1.0
   */
  async beforeRedirect() {
    if (this.status === 'Online') {
      this.router.navigate(['/login']);
    } else {
      await this.helper.toast('Falha', 'Sem conexão com a Internet.' +
      ' Verifique o Wi-fi ou a Rede Móvel (3G, 4G ou 5G)', 'danger', 'middle', 3000);
    }
  }

  /**
   * Abre Modal de Obs no checkOut caso todos os funcionários não sejam atendidos
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param finanData any
   */
   async openSacModal() {
    // this.isModalOpen = true;
    this.loading = await this.loadingCtrl.create({message: 'Abrindo...'});
    await this.loading.present();

    const modal = await this.modalCtrl.create({
      component: ImovelSacComponent,
      cssClass: 'transparent-modal',
      /*       componentProps: {
            }, */
    });
    this.loading.dismiss();
    await modal.present();
    // const data = await modal.onWillDismiss(); 
  }  

  async fechaSacModal() {
    this.isModalOpen = false;
  }   

  /**
   * Abre Modal de Obs no checkOut caso todos os funcionários não sejam atendidos
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param finanData any
   */
   async openPriceModal() {
    this.loading = await this.loadingCtrl.create({message: 'Abrindo...'});
    await this.loading.present();

    const modal = await this.modalCtrl.create({
      component: ImovelPriceComponent,
      componentProps: {
      },
      cssClass: 'transparent-modal'
    });
    this.loading.dismiss();
    await modal.present();
    const data = await modal.onWillDismiss();
  }   

  /**
   * Abre o Modal de Tutorial somente uma vez
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 08/12/2024
   * @version 1.0
   */
  async openTutorialModal() {
    this.loading = await this.loadingCtrl.create({message: 'Abrindo...'});
    await this.loading.present();

    const modal = await this.modalCtrl.create({
      component: TutorialComponent,
      backdropDismiss: false, // Evita que o usuário feche sem completar      
      componentProps: {
      },
      //cssClass: 'transparent-modal'
    });
    this.loading.dismiss();
    await modal.present();
    const data = await modal.onWillDismiss();
  }     

}
