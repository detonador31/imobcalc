import { CidModalComponent } from './../../component/cid-modal/cid-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormConsultaPageRoutingModule } from './form-consulta-routing.module';

import { FormConsultaPage } from './form-consulta.page';
// Mascara para campos padrão PT-BR
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormConsultaPageRoutingModule,
    // Mascara para campos padrão PT-BR
    BrMaskerModule
  ],
  declarations: [FormConsultaPage, CidModalComponent],
  entryComponents: [CidModalComponent]
})
export class FormConsultaPageModule {}
