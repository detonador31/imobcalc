import { FinanImovel } from 'src/app/classes/finan_imovel';
import { formatDate, DatePipe } from '@angular/common';
import { EntEntity } from './ent-entity';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { HelperService } from '../outros/helper.service';

@Injectable({
  providedIn: 'root'
})

  /**
   * Métodos para interação com a tabela finanImovel
   * @author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
export class EntFinanImovelService extends EntEntity {

  constructor(
    public db: DatabaseService,
    public datepipe: DatePipe,
    public helper: HelperService
  ) {
    super();
    this.tableName = 'finan_imovel';
    this.entObject = new FinanImovel();
  }

  /**
   * Carrega um registro conforme Data
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param date Date
   */
  // tslint:disable-next-line: variable-name
/*   async getItemByDate(date: Date, id_medico: number, sistema: number) {
    const dateFormat = formatDate(date, 'yyyy-MM-dd', 'en-US');
    const sql = 'SELECT * FROM ' + this.tableName + ' where agendado_em = ? and medico_id = ? and hold = ?';
    const data = [dateFormat, id_medico, sistema];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const finanImovel = new FinanImovel();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entObject).forEach((key) => {
        finanImovel[key] = item[key];
      });
    }
    return finanImovel;
  } */

}

