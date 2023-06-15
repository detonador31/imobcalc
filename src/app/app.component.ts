import { DatabaseService } from './services/entity/database.service';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AdMob, AdMobInitializationOptions } from '@capacitor-community/admob';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  // Código para o Menu de lateral, desativado para não impactar no desempenho
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '',
      icon: 'home'
    },
    {
      title: 'Cadastro de Bancos e Taxas',
      url: 'banco-taxas',
      icon: 'bar-chart'
    },
    {
      title: 'Financiamento Imobiliario',
      url: 'finan-imovel',
      icon: 'calculator'
    },
    {
      title: 'Lista de Financiamentos Imobiliarios Salvos',
      url: 'finan-imovel-calc-list',
      icon: 'list'
    },
    {
      title: 'Configuração',
      url: 'config',
      icon: 'cog'
    },
    {
      title: 'UF Taxas',
      url: 'uf-taxas',
      icon: 'bar-chart' 
    }               
  ];

  constructor(
    private platform: Platform,
    // private statusBar: StatusBar,
    private dbProvider: DatabaseService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setStyle({ style: Style.Default });
      SplashScreen.hide();
      this.dbProvider.openDatabase();  

      /**
       * initialize() require after platform.ready();
       */
       AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: ['ca-app-pub-7396406519933471~4948701046'],
        initializeForTesting: true,
      });   

    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

}
