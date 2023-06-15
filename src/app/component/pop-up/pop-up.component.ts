import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
})
export class PopUpComponent implements OnInit {

  @Input() message: any;
  constructor(
    private modalCtrl: ModalController
  ) {   
  }

  ngOnInit() {
  }

  fecharModal() {
    this.modalCtrl.dismiss();
  }  

}
