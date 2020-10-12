import { ListBlocoEmpresasComponent } from './../../component/list-bloco-empresas/list-bloco-empresas.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';

// Dependências do Ionic2-calendar
import localeDe from '@angular/common/locales/pt';
registerLocaleData(localeDe);
import { NgCalendarModule } from 'ionic2-calendar';

// Calendar UI Module
// import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    // CalendarModule,
    NgCalendarModule
  ],
  declarations: [CalendarPage, ListBlocoEmpresasComponent],
  entryComponents: [ListBlocoEmpresasComponent],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt'}
  ]
})
export class CalendarPageModule {}
