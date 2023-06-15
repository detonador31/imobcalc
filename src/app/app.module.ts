import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

// Serviço para armazenar cookie
import { CookieService } from 'ngx-cookie-service';

// HttpClientModule necessário para funcionar conexão com API rest
import { HttpClientModule } from '@angular/common/http';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/File/ngx';

// Dependências para o SQlite
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';

// Serviço para mascaras para inputs diversas
import { BrMaskerModule } from 'br-mask';
import { DatePipe, CurrencyPipe } from '@angular/common';

// Tudo isso pra usar valor monetário em reais!
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localePt, 'pt');


@NgModule({
  declarations: [AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RouterModule,
    AppRoutingModule,    
    CookieService,
    HttpClientModule,
    SQLite,
    SQLitePorter,
    BrMaskerModule,

    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FileOpener,
    DatePipe,
    CurrencyPipe,
    {provide: LOCALE_ID, useValue: 'pt'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
