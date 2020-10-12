import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OptionsTcmedPageRoutingModule } from './options-tcmed-routing.module';

import { OptionsTcmedPage } from './options-tcmed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OptionsTcmedPageRoutingModule
  ],
  declarations: [OptionsTcmedPage]
})
export class OptionsTcmedPageModule {}
