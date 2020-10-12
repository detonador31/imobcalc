import { Cid, CidArray } from './../../classes/cid';
import { HelperService } from './../outros/helper.service';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})

  /**
   * Métodos para interação com a tabela
   * @author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   */
export class EntCidService {

  // Busca um array da Classe e converte em Obj Json
  cidObj: CidArray = new CidArray();
  entyObj = this.cidObj.cidJson;
  // tslint:disable-next-line: no-inferrable-types
  tableName: string = 'cid';

  constructor(
    private db: DatabaseService,
    private helper: HelperService
  ) {}

  /**
   * Recebe um objeto e executa insert ou Update
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   * @param cid json
   */
  async save(cid: Cid) {
    const sql = 'SELECT * from ' + this.tableName + ' where id = ?';
    const data: any[] = [cid.id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    if (rows.length > 0) {
      return this.update(cid);
    } else {
      return this.insert(cid);
    }
  }

  /**
   * Faz o insert no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   * @param cid json
   */
  public insert(cid: Cid) {
    let sql = 'insert into '  + this.tableName + ' (';
    let values = '(';
    const data  = [];
    Object.keys(this.entyObj).forEach((key) => {
      data.push(cid[key]);
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
   * @since 12-08-2020
   * @version 1.0
   * @param cid json
   */
  public update(cid: Cid) {
    let sqlUp = 'update ' + this.tableName + ' set ';
    let id: number;
    const dataUp = [];
    Object.keys(this.entyObj).forEach((key) => {
        // Grava o ID para ser passado ao array fora do forEach
        if (key === 'id') {
          id = cid[key];
        } else {
          dataUp.push(cid[key]);
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
   * @since 12-08-2020
   * @version 1.0
   * @param id number
   */
  public delete(id: number) {
    const sql = 'delete from ' + this.tableName + ' where id = ?';
    const data = [id];

    return this.db.executeSQL(sql, data);
  }

  /**
   * Carrega um registro conforme ID
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   * @param id number
   */
  async getItem(id: number) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const cid = new Cid();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        cid[key] = item[key];
      });
    }

    return cid;
  }

  /**
   * Carrega um registro conforme ID
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   * @param numero string
   */
  async getItemByNumeroCid(numero: string) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where numero = ?';
    const data = [numero];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const cid = new Cid();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        cid[key] = item[key];
      });
    }

    return cid;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   *
   */
  async getAll() {
    const sql = 'SELECT * FROM ' + this.tableName ;
    const  result = await this.db.executeSQL(sql);
    const  cids = this.fillCids(result.rows);

    return cids;
  }

  /**
   * Autocomp de Cids
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 13-08-2020
   * @version 1.0
   *
   */
  async filter(text: string, tipo: string) {
    let sql: any;
    let data: any[];
    if (tipo === 'numero') {
      sql = 'SELECT * FROM ' + this.tableName + ' where numero like ?';
      data = [`%${text}%`];
    }
    if (tipo === 'descri') {
      sql = 'SELECT * FROM ' + this.tableName + ' where descricao like ?';
      data = [`%${text}%`];
    }
    const result = await this.db.executeSQL(sql, data);
    const cids = this.fillCids(result.rows);

    return cids;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   *
   */
  async getByEmpresa(idEmpresa: number, sistema: number) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where id_empresa = ? and hold = ?';
    const data = [idEmpresa, sistema];
    const  result = await this.db.executeSQL(sql, data);
    const  cids = this.fillCids(result.rows);

    return cids;
  }

  /**
   * Carrega um array com todos os campos necessários
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   * @param rows any
   */
  private fillCids(rows: any) {
    const cids: Cid[] = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const cid = new Cid();
      Object.keys(this.entyObj).forEach((key) => {
        cid[key] = item[key];
      });
      cids.push(cid);
    }

    return cids;
  }

}
