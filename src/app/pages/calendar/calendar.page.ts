import { ListBlocoEmpresasComponent } from './../../component/list-bloco-empresas/list-bloco-empresas.component';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
// Importa CalendarComponent do ionic2-calendar
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import { formatDate } from '@angular/common';
// Redirecionamento e captura de ids e valores em URLs
import { ActivatedRoute, Router } from '@angular/router';
// import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  date: string;
  type: 'string';
  title = 'Agenda de Atendimento';

  minDate = new Date().toISOString();

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle = '';
  eventSource = [];
  any: any = '';

  @ViewChild(CalendarComponent, {static: false}) myCal: CalendarComponent;

  constructor(
    private alertCtrl: AlertController,
    @Inject(LOCALE_ID) private locale: string,
    private modalCtrl: ModalController,
    public router: Router,
    private navCtr: NavController,
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backPage();
    });
  }

  ngOnInit() {
  }

  /**
   * Botão para avançar os meses
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 06-08-2020
   * @version 1.0
   */
  next() {
    this.myCal.slideNext();
  }

  /**
   * Botão para voltar os meses
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 06-08-2020
   * @version 1.0
   */
  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title: string) {
    this.viewTitle = title;
  }

  /**
   * Abre a listagem de blocos conforme data clicada
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 04-09-2020
   * @version 1.0
   * @param id number
   * @param sistema number (Hold)
   */
  onTimeSelected = (ev: { selectedTime: Date, events: any[] }) => {
    const e: any = ev.selectedTime.getTime();
    this.router.navigate(['list-bloco-item/list' , e]);
  }

  /**
   * Redireciona para a home
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 04-09-2020
   * @version 1.0
   */
  home() {
    this.router.navigate(['./home']);
  }

  /**
   * Volta para a página anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  backPage() {
    this.router.navigate(['/options-offline']);
  }

/*   async openBlocoEmpModal(ev: { selectedTime: Date, events: any[] }) {
    const date: any = ev.selectedTime.getTime();
    const modal = await this.modalCtrl.create({
      component: ListBlocoEmpresasComponent,
      componentProps: {
        dateBloco : date
      },
      cssClass: 'bloco-emp-modal-css'
    });
    await modal.present();
  } */
}
