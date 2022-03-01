import { DatabaseService } from './services/entity/database.service';
import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      title: 'Nova Página Inicial',
      url: 'inicial',
      icon: 'business' 
    }               
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dbProvider: DatabaseService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.dbProvider.openDatabase();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

}
