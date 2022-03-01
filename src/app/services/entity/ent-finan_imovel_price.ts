import { FinanImovelPrice } from 'src/app/classes/finan_imovel_price';
import { DatePipe } from '@angular/common';
import { EntEntity } from './ent-entity';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { HelperService } from '../outros/helper.service';

@Injectable({
  providedIn: 'root'
})

  /**
   * Métodos para interação com a tabela FinanImovelPrice
   * @author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
export class EntFinanImovelPriceService extends EntEntity {

  constructor(
    public db: DatabaseService,
    public datepipe: DatePipe,
    public helper: HelperService
  ) {
    super();
    this.tableName = 'finan_imovel_price';
    this.entObject = new FinanImovelPrice();
  }


}

