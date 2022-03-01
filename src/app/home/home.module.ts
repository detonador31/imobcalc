import { ImovelPriceComponent } from './../component/imovel-price/imovel-price.component';
import { ImovelSacComponent } from './../component/imovel-sac/imovel-sac.component';
import { MenuComponent } from './../component/menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,
  MenuComponent, ImovelSacComponent, ImovelPriceComponent],
  entryComponents: [ImovelSacComponent, ImovelPriceComponent]
})
export class HomePageModule {}
