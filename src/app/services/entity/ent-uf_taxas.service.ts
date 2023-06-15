import { UfTaxas } from 'src/app/classes/uf_taxas';
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
export class EntUfTaxasService extends EntEntity {

  constructor(
    public db: DatabaseService,
    public datepipe: DatePipe,
    public helper: HelperService
  ) {
    super();
    this.tableName = 'uf_taxas';
    this.entObject = new UfTaxas();
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
    const bancoTaxas = new UfTaxas();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entObject).forEach((key) => {
        bancoTaxas[key] = item[key];
      });
    }
    return bancoTaxas;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
   async getByType(type: String) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where tipo_finam = ? order by id DESC';
    const data = [type];
    const  result = await this.db.executeSQL(sql, data);
    const  entitys = this.fillEntities(result.rows);

    return entitys;
  } 



}

