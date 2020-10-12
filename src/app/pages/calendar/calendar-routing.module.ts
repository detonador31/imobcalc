import { NgCalendarModule } from 'ionic2-calendar';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarPage } from './calendar.page';

const routes: Routes = [
  {
    path: '',
    component: CalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
            NgCalendarModule
          ],
  exports: [RouterModule],
})
export class CalendarPageRoutingModule {}
