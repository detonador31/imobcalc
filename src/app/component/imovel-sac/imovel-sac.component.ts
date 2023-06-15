import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imovel-sac',
  templateUrl: './imovel-sac.component.html',
  styleUrls: ['./imovel-sac.component.scss'],
})
export class ImovelSacComponent implements OnInit {

  constructor(
    public  router: Router,
    private modalCtrl: ModalController    
  ) { }

  ngOnInit() {}

  direcionar(rota: String) {
    this.router.navigate(['/'+ rota ]);
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
