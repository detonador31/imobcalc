import { CheckoutModalComponent } from './../../component/checkout-modal/checkout-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListBlocoItemPageRoutingModule } from './list-bloco-item-routing.module';

import { ListBlocoItemPage } from './list-bloco-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBlocoItemPageRoutingModule
  ],
  declarations: [ListBlocoItemPage, CheckoutModalComponent],
  entryComponents: [CheckoutModalComponent]
})
export class ListBlocoItemPageModule {}
