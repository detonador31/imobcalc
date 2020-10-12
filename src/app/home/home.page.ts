import { Router } from '@angular/router';
import { HelperService } from './../services/outros/helper.service';
// Para armazenar Cookie no aplicativo
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
// Usado para Status de conexão de rede
import { Plugins, PluginListenerHandle, NetworkStatus } from '@capacitor/core';

const { Network } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  // tslint:disable: no-string-literal
  networkStatus: NetworkStatus;
  networkListener: PluginListenerHandle;
  status: string;

  ngOnDestroy() {
    this.networkListener.remove();
  }

  constructor(
    public  router: Router,
    private cookie: CookieService,
    private helper: HelperService
  ) {
  }

  async ngOnInit() {
  }

  ionViewWillEnter() {
    this.networkListener = Network.addListener('networkStatusChange', status => {
      this.networkStatus = status;
    });
    this.getNetworkStatus();
    this.deleteCookies();
  }

  /**
   * Remove o cookie não iniciado
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 04-09-2020
   * @version 1.0
   */
  deleteCookies() {
    this.cookie.remove('PHPSESSID');
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

}
