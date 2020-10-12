import { LastLogin } from './../../classes/last-login';
import { Consulta, ConsultaArray } from './../../classes/consulta';
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
export class EntConsultaEnviarService {
  // Busca um array da Classe e converte em Obj Json
  consultaObj: ConsultaArray = new ConsultaArray();
  entyObj = this.consultaObj.consultaJson;
  // tslint:disable-next-line: no-inferrable-types
  tableName: string = 'consulta_enviar';

  constructor(
    private db: DatabaseService,
    private helper: HelperService
  ) {}

  /**
   * Recebe um objeto e executa insert ou Update
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   * @param consulta json
   */
  async save(consulta: Consulta) {
    const sql = 'SELECT * from ' + this.tableName + ' where id = ?';
    const data: any[] = [consulta.id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    if (rows.length > 0) {
      return this.update(consulta);
    } else {
      return this.insert(consulta);
    }
  }

  /**
   * Faz o insert no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   * @param consulta json
   */
  public insert(consulta: Consulta) {
    let sql = 'insert into '  + this.tableName + ' (';
    let values = '(';
    const data  = [];
    Object.keys(this.entyObj).forEach((key) => {
      data.push(consulta[key]);
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
   * @param consulta json
   */
  public update(consulta: Consulta) {
    let sqlUp = 'update ' + this.tableName + ' set ';
    let id: number;
    const dataUp = [];
    Object.keys(this.entyObj).forEach((key) => {
        // Grava o ID para ser passado ao array fora do forEach
        if (key === 'id') {
          id = consulta[key];
        } else {
          dataUp.push(consulta[key]);
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
   * Exclui todos as consultas dentro de um array
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 02-09-2020
   * @version 1.0
   * @param consultasEnviar: ConsultaEnviar[]
   */
  async deletaConsultasEnviar(consultasEnviar: Consulta[]) {
    consultasEnviar.forEach( async (item: Consulta) => {
      this.delete(item.id);
    });
  }

  /**
   * Carrega todos os registros por periodo
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 02-09-2020
   * @version 1.0
   * @param periodo number padrão 45 dias
   */
  async getByPeriod(periodo: number = 45) {
    // busca consulta_data com a data atual - 45 dias para exclusão
    const sql = 'SELECT * FROM ' + this.tableName +
    ' WHERE consulta_data < date("now","-' + periodo + ' days")' ;
    const  result = await this.db.executeSQL(sql);
    const  blocos = this.fillConsultas(result.rows);

    return blocos;
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
    const consulta = new Consulta();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        consulta[key] = item[key];
      });
    }

    return consulta;
  }

  /**
   * Carrega um registro conforme idFuncionario + Hold
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   * @param id number
   */
  async getItemByFunc(idFunc: number, sistema: number) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where id_funcionario = ? and hold_id = ? ORDER BY id DESC LIMIT 1';
    const data = [idFunc, sistema];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const consulta = new Consulta();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        consulta[key] = item[key];
      });
      // Altera a Data de string para objeto antes de mandar para o Form em Edição
      consulta.consulta_data = new Date(item.consulta_data);
    }

    return consulta;
  }

  /**
   * Busca todos as consultas da mesma empresa somente para contagem
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   * @param id number
   * @param sistema number
   */
  async getItensByEmp(idEmp: number, sistema: number) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where id_empresa = ? and hold_id = ?';
    const data = [idEmp, sistema];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const consulta = rows;

    return consulta;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   * @param status se 'all' busca todas as consultas da tabela
   */
  async searchByNameFunc(funcName: string, status: string, idMedicoVila: number, idMedicoTcmed: number) {
    let result: any;
    const sql = 'SELECT * FROM ' + this.tableName + ' where status = ? and func_nome like ? and (id_medico = ? or id_medico = ?)';
    console.log(sql);
    const data = [status, `%${funcName}%`, idMedicoVila, idMedicoTcmed];
    result = await this.db.executeSQL(sql, data);

    const  consultas = this.fillConsultas(result.rows);

    return consultas;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   * @param status se 'all' busca todas as consultas da tabela
   */
  async getAll(status: string, sistema = 0, idMedicoVila: number, idMedicoTcmed: number) {
    let result: any;
    if (status === 'all' && sistema === 0) {
      const sql = 'SELECT * FROM ' + this.tableName + ' where (id_medico = ? or id_medico = ?)';
      const data = [idMedicoVila , idMedicoTcmed];
      result = await this.db.executeSQL(sql, data);
    }

    if (status === 'nao_enviada' && sistema === 0) {
      const sql = 'SELECT * FROM ' + this.tableName  + ' where status = ? and (id_medico = ? or id_medico = ?)';
      const data = [status, idMedicoVila , idMedicoTcmed];
      result = await this.db.executeSQL(sql, data);
    }

    if (status === 'enviada' && sistema === 0) {
      const sql = 'SELECT * FROM ' + this.tableName  + ' where status = ? and (id_medico = ? or id_medico = ?)';
      const data = [status, idMedicoVila , idMedicoTcmed];
      result = await this.db.executeSQL(sql, data);
    }

    if (status === 'nao_enviada' && sistema) {
      const sql = 'SELECT * FROM ' + this.tableName + ' where status = ? and hold_id = ? and (id_medico = ? or id_medico = ?)';
      const data = [status, sistema, idMedicoVila , idMedicoTcmed];
      result = await this.db.executeSQL(sql, data);
    }
    const  consultas = this.fillConsultas(result.rows);

    return consultas;
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
    const  consultas = this.fillConsultas(result.rows);

    return consultas;
  }

  /**
   * Carrega um array com todos os campos necessários
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-08-2020
   * @version 1.0
   * @param rows any
   */
  private fillConsultas(rows: any) {
    const consultas: Consulta[] = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const consulta = new Consulta();
      Object.keys(this.entyObj).forEach((key) => {
        consulta[key] = item[key];
      });
      consultas.push(consulta);
    }

    return consultas;
  }

}
