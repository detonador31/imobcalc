import { Bloco, BlocoArray } from './../../classes/bloco';
import { HelperService } from './../outros/helper.service';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { DatePipe, formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

  /**
   * Métodos para interação com a tabela bloco
   * @author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
export class EntBlocoService {

  // Busca um array da Classe e converte em Obj Json
  blocoObj: BlocoArray = new BlocoArray();
  entyObj = this.blocoObj.blocoJson;
  // tslint:disable-next-line: no-inferrable-types
  tableName: string = 'bloco';

  constructor(
    private db: DatabaseService,
    private helper: HelperService
  ) {}

  /**
   * Recebe um objeto e executa insert ou Update
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bloco Bloco
   */
  async save(bloco: Bloco) {
    const sql = 'SELECT * from ' + this.tableName + ' where id = ?';
    const data: any[] = [bloco.id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    if (rows.length > 0) {
      return this.update(bloco);
    } else {
      return this.insert(bloco);
    }
  }

  /**
   * Faz o insert no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bloco Bloco
   */
  public insert(bloco: Bloco) {
    let sql = 'insert into '  + this.tableName + ' (';
    let values = '(';
    const data  = [];
    Object.keys(this.entyObj).forEach((key) => {
      data.push(bloco[key]);
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
   * @param bloco Bloco
   */
  public update(bloco: Bloco) {
    let sqlUp = 'update ' + this.tableName + ' set ';
    let id: number;
    const dataUp = [];
    Object.keys(this.entyObj).forEach((key) => {
        // Grava o ID para ser passado ao array fora do forEach
        if (key === 'id') {
          id = bloco[key];
        } else {
          dataUp.push(bloco[key]);
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
   * Exclui todos os blocos dentro de um array
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 26-08-2020
   * @version 1.0
   * @param blocos: Bloco[]
   */
  async deletaBlocos(blocos: Bloco[]) {
    blocos.forEach( async (item: Bloco) => {
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
    const bloco = new Bloco();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        bloco[key] = item[key];
      });
    }

    return bloco;
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
    const bloco = new Bloco();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        bloco[key] = item[key];
      });
    }
    return bloco;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
  async getAll() {
    const sql = 'SELECT * FROM ' + this.tableName ;
    const  result = await this.db.executeSQL(sql);
    const  blocos = this.fillBlocos(result.rows);

    return blocos;
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
    const  blocos = this.fillBlocos(result.rows);

    return blocos;
  }

  /**
   * Carrega um array com todos os campos necessários
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param rows any
   */
  private fillBlocos(rows: any) {
    const blocos: Bloco[] = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const bloco = new Bloco();
      Object.keys(this.entyObj).forEach((key) => {
        bloco[key] = item[key];
      });
      blocos.push(bloco);
    }

    return blocos;
  }

}

