import { BlocoItem, BlocoItemArray } from './../../classes/bloco_item';
import { HelperService } from './../outros/helper.service';
import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})

  /**
   * Métodos para interação com a tabela
   * @author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bloco json
   */
export class EntBlocoItemService {

  // Busca um array da Classe e converte em Obj Json
  blocoItemObj: BlocoItemArray = new BlocoItemArray();
  entyObj = this.blocoItemObj.blocoItemJson;
  // tslint:disable-next-line: no-inferrable-types
  tableName: string = 'bloco_item';

  constructor(
    private db: DatabaseService,
    private helper: HelperService
  ) {}

  /**
   * Recebe um objeto e executa insert ou Update
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bloco json
   */
  async save(blocoItem: BlocoItem) {
    const sql = 'SELECT * from ' + this.tableName + ' where id = ?';
    const data: any[] = [blocoItem.id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    console.log(blocoItem);
    if (rows.length > 0) {
      return this.update(blocoItem);
    } else {
      return this.insert(blocoItem);
    }
  }

  /**
   * Faz o insert no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bloco json
   */
  public insert(blocoItem: BlocoItem) {
    let sql = 'insert into '  + this.tableName + ' (';
    let values = '(';
    const data  = [];
    Object.keys(this.entyObj).forEach((key) => {
      data.push(blocoItem[key]);
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
   * @param bloco json
   */
  public update(blocoItem: BlocoItem) {
    let sqlUp = 'update ' + this.tableName + ' set ';
    let id: number;
    const dataUp = [];
    Object.keys(this.entyObj).forEach((key) => {
        // Grava o ID para ser passado ao array fora do forEach
        if (key === 'id') {
          id = blocoItem[key];
        } else {
          dataUp.push(blocoItem[key]);
          sqlUp += key + ' = ?, ';
        }
    });
    dataUp.push(id);
    sqlUp = this.helper.removeUltimosCaracteres(sqlUp, 2);
    sqlUp += ' where id = ?';
    return this.db.executeSQL(sqlUp, dataUp);
  }

  /**
   * Exclui todos os BlocoItens encontrados no array
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 26-08-2020
   * @version 1.0
   * @param blocosItem: BlocoItem[]
   */
  async deletaBlocoItens(blocosItem: BlocoItem[]) {
    blocosItem.forEach( async (item: BlocoItem) => {
      this.delete(item.id);
    });
  }

  /**
   * Exclui um registro
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param bloco json
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
   * @param id num
   */
  async getItem(id: number) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const blocoItem = new BlocoItem();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        blocoItem[key] = item[key];
      });
    }

    return blocoItem;
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
    const  blocoItens = this.fillBlocoItems(result.rows);

    return blocoItens;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
  async getByBloco(idBloco: number, sistema: number) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where bloco_id = ? and hold = ? order by sequencia asc';
    const data = [idBloco, sistema];
    const  result = await this.db.executeSQL(sql, data);
    const  blocoItens = this.fillBlocoItems(result.rows);

    return blocoItens;
  }

  /**
   * Busca Bloco pela empresa_id
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 08-10-2020
   * @version 1.0
   */
  async getByEmpresa(empresaId: number, sistema: number) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where empresa_id = ? and hold = ?';
    const data = [empresaId, sistema];
    const  result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const blocoItem = new BlocoItem();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        blocoItem[key] = item[key];
      });
    }

    return blocoItem;
  }

  /**
   * Carrega um array com todos os campos necessários
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   */
  private fillBlocoItems(rows: any) {
    const blocoItens: BlocoItem[] = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const blocoItem = new BlocoItem();
      Object.keys(this.entyObj).forEach((key) => {
        blocoItem[key] = item[key];
      });
      blocoItens.push(blocoItem);
    }

    return blocoItens;
  }

}

