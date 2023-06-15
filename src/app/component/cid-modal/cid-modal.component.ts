import { EntCidService } from './../../services/entity/ent-cid.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cid-modal',
  templateUrl: './cid-modal.component.html',
  styleUrls: ['./cid-modal.component.scss'],
})
export class CidModalComponent implements OnInit {
  @Input() fieldName: string;
  @Input() input: string;
  @Input() tipoInp: string;
  cids: any;

  constructor(
    private modalCtrl: ModalController,
    private entCid: EntCidService
  ) {
    this.cids = [];
  }

  ngOnInit() {
    if (this.input) {
      this.searchCid(this.input, this.tipoInp);
    }
  }

  fecharModal() {
    this.modalCtrl.dismiss();
  }

  // Autocomp é acionado ao digitar 2 caracteres para numero e 3 para descrição
  async doSearchBarChange($event: any, tipo: string) {
    const text = $event.target.value;
    await this.searchCid(text, tipo);
  }

  async searchCid(text: string, tipo: string) {

    if ((text && text.length >= 3 && tipo === 'descri') || (text && text.length >= 2 && tipo === 'numero')) {
      // Busca com o método filter o valor digitado
      this.cids = await this.entCid.filter(text , tipo);
    }
  }

  aplicaCid(num: string, descri: string) {
    const array = {
        numero: num,
        descricao: descri
    };

    localStorage.setItem('cidModal', JSON.stringify(array));
    this.modalCtrl.dismiss(
      array
    );
  }

  doSearchClear() {
    this.cids = [];
  }

}
