import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-finan-detalhe-price-modal',
  templateUrl: './finan-detalhe-price-modal.component.html',
  styleUrls: ['./finan-detalhe-price-modal.component.scss'],
})
export class FinanDetalhePriceModalComponent implements OnInit {
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
