import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImovelPdfPageRoutingModule } from './imovel-pdf-routing.module';

import { ImovelPdfPage } from './imovel-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImovelPdfPageRoutingModule
  ],
  declarations: [ImovelPdfPage]
})
export class ImovelPdfPageModule {}
