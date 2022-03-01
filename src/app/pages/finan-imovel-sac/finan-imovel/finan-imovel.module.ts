import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinanImovelPageRoutingModule } from './finan-imovel-routing.module';

import { FinanImovelPage } from './finan-imovel.page';

// Mascara para campos padrão PT-BR
import { BrMaskerModule } from 'br-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinanImovelPageRoutingModule,
    // Mascara para campos padrão PT-BR
    BrMaskerModule    
  ],
  declarations: [FinanImovelPage]
})
export class FinanImovelPageModule {}
