import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-finan-detalhe-modal',
  templateUrl: './finan-detalhe-modal.component.html',
  styleUrls: ['./finan-detalhe-modal.component.scss'],
})
export class FinanDetalheModalComponent implements OnInit {
  @Input() dataDetalhe: any;
  parcelas: any;
  constructor(
    private modalCtrl: ModalController
  ) {   
  }

  ngOnInit() {
    this.parcelas = this.dataDetalhe.parcelas;
  }

  fecharModal() {
    this.modalCtrl.dismiss();
  }  

}
