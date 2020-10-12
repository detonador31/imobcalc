import { DatePipe } from '@angular/common';
import { HelperService } from './../../services/outros/helper.service';
import { BlocoItem } from './../../classes/bloco_item';
import { EntBlocoItemService } from './../../services/entity/ent-bloco_item.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss'],
})
export class CheckoutModalComponent implements OnInit {

  @Input() blocoItemId: number;
  blocoItem: BlocoItem = new BlocoItem();
  tittle = 'Menos consultas atendidas do que a quantidade de funcionários: Por favor, Justifique.';

  constructor(
    private modalCtrl: ModalController,
    private entBlocoItem: EntBlocoItemService,
    private helper: HelperService,
    private datepipe: DatePipe
  ) { }

  async ngOnInit() {
    this.blocoItem = await this.entBlocoItem.getItem(this.blocoItemId);
    if (!this.blocoItem.obs_check) {
      const dataHora = this.helper.dateTime();
      this.blocoItem.check_out = this.datepipe.transform(dataHora, 'dd/MM/yyyy hh:mm');
    } else {
      this.tittle = 'Editar justificativa';
    }
  }

  fecharModal() {
    this.modalCtrl.dismiss();
  }

  async aplicaObs(blocoItem: BlocoItem) {
    const array = {
      status: 'ok'
    };
    if (blocoItem.obs_check) {
      await this.entBlocoItem.save(blocoItem);
    } else {
      await this.helper.toast('Atenção', 'Digite uma justificativa antes de fazer Check-Out', 'warning', 'middle', 3000);
    }
    this.modalCtrl.dismiss(array);
  }

}
