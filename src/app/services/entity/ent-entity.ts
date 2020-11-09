import { Injectable } from '@angular/core';
import { EntAbstract } from './ent-abstract';
import { DatePipe } from '@angular/common';
import { HelperService } from '../outros/helper.service';
import { DatabaseService } from './database.service';


@Injectable({
  providedIn: 'root'
})

  /**
   * Métodos para interação com a tabela entity
   * @author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
export class EntEntity extends EntAbstract{

  // Busca um array da Classe e converte em Obj Json
  // tslint:disable-next-line: no-inferrable-types
 

  constructor() {
    super();
  }

  /**
   * Recebe um objeto e executa insert ou Update
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param entity BancoTaxas
   */
  async save(entity: any) {
    if (!entity.created_at) {
      entity.created_at = new Date();
      entity.created_at = entity.created_at ? this.datepipe.transform(entity.created_at, 'yyyy-MM-dd HH:mm') : null;
    } else {
      entity.updated_at = new Date();
      entity.updated_at = entity.updated_at ? this.datepipe.transform(entity.updated_at, 'yyyy-MM-dd HH:mm') : null;
    }    
    const sql = 'SELECT * from ' + this.tableName + ' where id = ?';
    const data: any[] = [entity.id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    if (rows.length > 0) {
      return this.update(entity);
    } else {
      return this.insert(entity);
    }
  }

  /**
   * Faz o insert no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param entity BancoTaxas
   */
  public insert(entity: any) {
    let sql = 'insert into '  + this.tableName + ' (';
    let values = '(';
    const data  = [];
    for( let key of Object.keys(this.entObject)) {
      data.push(entity[key]);
      sql += key + ', ';
      values += '?,';
    }
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
   * @param entity BancoTaxas
   */
  public update(entity: any) {
    let sqlUp = 'update ' + this.tableName + ' set ';
    let id: number;
    const dataUp = [];
    for( let key of Object.keys(this.entObject)) {
        // Grava o ID para ser passado ao array fora do forEach
        if (key === 'id') {
          id = entity[key];
        } else {
          dataUp.push(entity[key]);
          sqlUp += key + ' = ?, ';
        }
    }

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
   * Exclui todos os entitys dentro de um array
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 26-08-2020
   * @version 1.0
   * @param entitys: BancoTaxas[]
   */
  async deleteMany(entitys: any[]) {
    entitys.forEach( async (item: any) => {
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
    const entity: any = [];
    if (rows && rows.length > 0) {
      const item = rows.item(0);

      for( let key of Object.keys(this.entObject)) {
        entity[key] = item[key];
      }
    }

    return entity;
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
    const  entitys = this.fillEntities(result.rows);

    return entitys;
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
    ' WHERE created_at < date("now","-' + periodo + ' days")' ;

    const  result = await this.db.executeSQL(sql);
    const  entitys = this.fillEntities(result.rows);

    return entitys;
  }

  /**
   * Carrega um array com todos os campos necessários
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param rows any
   */
  public fillEntities(rows: any) {
    const entitys: any[] = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const entity: any = [];

      for( let key of Object.keys(this.entObject)) {
        entity[key] = item[key];
      }

      entitys.push(entity);
    }

    return entitys;
  }
}

