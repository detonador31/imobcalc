import { BancoTaxas } from 'src/app/classes/banco_taxas';
import { formatDate, DatePipe } from '@angular/common';
import { EntEntity } from './ent-entity';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { HelperService } from '../outros/helper.service';

@Injectable({
  providedIn: 'root'
})

  /**
   * Métodos para interação com a tabela bancoTaxas
   * @author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
export class EntBancoTaxasService extends EntEntity {

  constructor(
    public db: DatabaseService,
    public datepipe: DatePipe,
    public helper: HelperService
  ) {
    super();
    this.tableName = 'banco_taxas';
    this.entObject = new BancoTaxas();
  }

  /**
   * Carrega um registro conforme Data
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param date Date
   */
  // tslint:disable-next-line: variable-name
  async getItemByDate(date: Date, id_medico: number, sistema: number) {
    const dateFormat = formatDate(date, 'yyyy-MM-dd', 'en-US');
    const sql = 'SELECT * FROM ' + this.tableName + ' where agendado_em = ? and medico_id = ? and hold = ?';
    const data = [dateFormat, id_medico, sistema];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const bancoTaxas = new BancoTaxas();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entObject).forEach((key) => {
        bancoTaxas[key] = item[key];
      });
    }
    return bancoTaxas;
  }





}

