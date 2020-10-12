import { LastLogin, LastLoginArray } from './../../classes/last-login';
import { HelperService } from './../outros/helper.service';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Métodos para interação com a tabela
 * @author Silvio Watakabe <silvio@tcmed.com.br>
 * @since 27-07-2020
 * @version 1.0
 */
export class EntLastLoginService {

  // Busca um array da Classe e converte em Obj Json
  lastLoginObj: LastLoginArray = new LastLoginArray();
  entyObj = this.lastLoginObj.lastLoginJson;
  // tslint:disable-next-line: no-inferrable-types
  tableName: string = 'last_login';

  constructor(
    private db: DatabaseService,
    private helper: HelperService
  ) {}

  /**
   * Recebe um objeto e executa insert ou Update
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param lastLogin json
   */
  async save(lastLogin: LastLogin) {
    const sql = 'SELECT * from ' + this.tableName + ' where id = ?';
    const data: any[] = [lastLogin.id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    if (rows.length > 0) {
      return this.update(lastLogin);
    } else {
      return this.insert(lastLogin);
    }
  }

  /**
   * Faz o insert no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param lastLogin json
   */
  public insert(lastLogin: LastLogin) {
    let sql = 'insert into '  + this.tableName + ' (';
    let values = '(';
    const data  = [];
    Object.keys(this.entyObj).forEach((key) => {
      data.push(lastLogin[key]);
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
   * @param lastLogin json
   */
  public update(lastLogin: LastLogin) {
    let sqlUp = 'update ' + this.tableName + ' set ';
    let id: number;
    const dataUp = [];
    Object.keys(this.entyObj).forEach((key) => {
        // Grava o ID para ser passado ao array fora do forEach
        if (key === 'id') {
          id = lastLogin[key];
        } else {
          dataUp.push(lastLogin[key]);
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
    const lastLogin = new LastLogin();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        lastLogin[key] = item[key];
      });
    }

    return lastLogin;
  }

  /**
   * Carrega o último registro
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
  async getLastId() {
    const sql = 'SELECT * FROM ' + this.tableName + ' where id = (SELECT max(id) FROM ' + this.tableName + ');';
    const result = await this.db.executeSQL(sql);
    const rows = result.rows;
    const lastLogin = new LastLogin();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        lastLogin[key] = item[key];
      });
    }

    return lastLogin;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   *
   */
  async getAll() {
    const sql = 'SELECT * FROM ' + this.tableName ;
    const  result = await this.db.executeSQL(sql);
    const  lastLogins = this.fillLastLogins(result.rows);

    return lastLogins;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   *
   */
  async getQtdRegisters() {
    const sql = 'SELECT * FROM ' + this.tableName ;
    const  result = await this.db.executeSQL(sql);

    return result;
  }

  /**
   * Carrega um array com todos os campos necessários
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param rows any
   */
  private fillLastLogins(rows: any) {
    const lastLogins: LastLogin[] = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const lastLogin = new LastLogin();
      Object.keys(this.entyObj).forEach((key) => {
        lastLogin[key] = item[key];
      });
      lastLogins.push(lastLogin);
    }

    return lastLogins;
  }

}
