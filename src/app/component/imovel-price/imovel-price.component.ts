import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imovel-price',
  templateUrl: './imovel-price.component.html',
  styleUrls: ['./imovel-price.component.scss'],
})
export class ImovelPriceComponent implements OnInit {

  constructor(
    public  router: Router, 
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }  

  direcionar(rota: String) {
    this.router.navigate(['/'+ rota ]);
    this.dismiss();
  }


}
