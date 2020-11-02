import { BancoTaxas, BancoTaxasArray } from './../../classes/banco_taxas';
import { HelperService } from './../outros/helper.service';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { DatePipe, formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

  /**
   * Métodos para interação com a tabela bancoTaxas
   * @author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
export class EntBancoTaxasService {

  // Busca um array da Classe e converte em Obj Json
  bancoTaxasObj: BancoTaxasArray = new BancoTaxasArray();
  entyObj = this.bancoTaxasObj.bancoTaxasJson;
  // tslint:disable-next-line: no-inferrable-types
  tableName: string = 'banco_taxas';

  constructor(
    private db: DatabaseService,
    private helper: HelperService,
    private datepipe: DatePipe
  ) {}

  /**
   * Recebe um objeto e executa insert ou Update
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bancoTaxas BancoTaxas
   */
  async save(bancoTaxas: BancoTaxas) {
    if (!bancoTaxas.created_at) {
      bancoTaxas.created_at = new Date();
      bancoTaxas.created_at = this.datepipe.transform(bancoTaxas.created_at, 'yyyy-MM-dd HH:mm');
    } else {
      bancoTaxas.updated_at = new Date();
      bancoTaxas.updated_at = this.datepipe.transform(bancoTaxas.updated_at, 'yyyy-MM-dd HH:mm');
    }    
    const sql = 'SELECT * from ' + this.tableName + ' where id = ?';
    const data: any[] = [bancoTaxas.id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    if (rows.length > 0) {
      return this.update(bancoTaxas);
    } else {
      return this.insert(bancoTaxas);
    }
  }

  /**
   * Faz o insert no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bancoTaxas BancoTaxas
   */
  public insert(bancoTaxas: BancoTaxas) {
    let sql = 'insert into '  + this.tableName + ' (';
    let values = '(';
    const data  = [];
    Object.keys(this.entyObj).forEach((key) => {
      data.push(bancoTaxas[key]);
      sql += key + ', ';
      values += '?,';
    });
    sql = this.helper.removeUltimosCaracteres(sql, 2);
    values = this.helper.removeUltimosCaracteres(values, 1);
    sql += ') values ' + values + ')';
    return this.db.executeSQL(sql, data);
  }

  /**
   * Update do registro no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bancoTaxas BancoTaxas
   */
  public update(bancoTaxas: BancoTaxas) {
    let sqlUp = 'update ' + this.tableName + ' set ';
    let id: number;
    const dataUp = [];
    Object.keys(this.entyObj).forEach((key) => {
        // Grava o ID para ser passado ao array fora do forEach
        if (key === 'id') {
          id = bancoTaxas[key];
        } else {
          dataUp.push(bancoTaxas[key]);
          sqlUp += key + ' = ?, ';
        }
    });
    dataUp.push(id);
    sqlUp = this.helper.removeUltimosCaracteres(sqlUp, 2);
    sqlUp += ' where id = ?';
    return this.db.executeSQL(sqlUp, dataUp);
  }

  /**
   * Exclui um registro
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param id number
   */
  public delete(id: number) {
    const sql = 'delete from ' + this.tableName + ' where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  /**
   * Exclui todos os bancoTaxass dentro de um array
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 26-08-2020
   * @version 1.0
   * @param bancoTaxass: BancoTaxas[]
   */
  async deletaBancoTaxass(bancoTaxass: BancoTaxas[]) {
    bancoTaxass.forEach( async (item: BancoTaxas) => {
      this.delete(item.id);
    });
  }

  /**
   * Carrega um registro conforme ID
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param id number
   */
  async getItem(id: number) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const bancoTaxas = new BancoTaxas();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        bancoTaxas[key] = item[key];
      });
    }

    return bancoTaxas;
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
      Object.keys(this.entyObj).forEach((key) => {
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
  async getAll() {
    const sql = 'SELECT * FROM ' + this.tableName + ' order by id DESC';
    const  result = await this.db.executeSQL(sql);
    const  bancoTaxass = this.fillBancoTaxass(result.rows);

    return bancoTaxass;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 25-08-2020
   * @version 1.0
   * @param periodo number padrão 45 dias
   */
  async getByPeriod(periodo: number = 45) {
    // busca agendados_em com a data atual - 45 dias para exclusão
    const sql = 'SELECT * FROM ' + this.tableName +
    ' WHERE agendado_em < date("now","-' + periodo + ' days")' ;

    const  result = await this.db.executeSQL(sql);
    const  bancoTaxass = this.fillBancoTaxass(result.rows);

    return bancoTaxass;
  }

  /**
   * Carrega um array com todos os campos necessários
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param rows any
   */
  private fillBancoTaxass(rows: any) {
    const bancoTaxass: BancoTaxas[] = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const bancoTaxas = new BancoTaxas();
      Object.keys(this.entyObj).forEach((key) => {
        bancoTaxas[key] = item[key];
      });
      bancoTaxass.push(bancoTaxas);
    }

    return bancoTaxass;
  }

}

