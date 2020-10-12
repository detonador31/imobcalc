import { Consulta } from './../../classes/consulta';
import { Funcionario, FuncionarioArray } from './../../classes/funcionario';
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
   */
export class EntFuncionarioService {

  // Busca um array da Classe e converte em Obj Json
  funcionarioObj: FuncionarioArray = new FuncionarioArray();
  entyObj = this.funcionarioObj.funcionarioJson;
  // tslint:disable-next-line: no-inferrable-types
  tableName: string = 'funcionario';

  constructor(
    private db: DatabaseService,
    private helper: HelperService
  ) {}

  /**
   * Recebe um objeto e executa insert ou Update
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param funcionario json
   */
  async save(funcionario: Funcionario) {
    const sql = 'SELECT * from ' + this.tableName + ' where id = ?';
    const data: any[] = [funcionario.id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    if (rows.length > 0) {
      return this.update(funcionario);
    } else {
      return this.insert(funcionario);
    }
  }

  /**
   * Faz o insert no BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param funcionario json
   */
  public insert(funcionario: Funcionario) {
    let sql = 'insert into '  + this.tableName + ' (';
    let values = '(';
    const data  = [];
    Object.keys(this.entyObj).forEach((key) => {
      data.push(funcionario[key]);
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
   * @param funcionario json
   */
  public update(funcionario: Funcionario) {
    let sqlUp = 'update ' + this.tableName + ' set ';
    let id: number;
    const dataUp = [];
    Object.keys(this.entyObj).forEach((key) => {
        // Grava o ID para ser passado ao array fora do forEach
        if (key === 'id') {
          id = funcionario[key];
        } else {
          dataUp.push(funcionario[key]);
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
   * Exclui todos os funcionarios encontrados em array
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 26-08-2020
   * @version 1.0
   * @param funcionarios: Funcionario[]
   */
  async deletaFuncionarios(funcionarios: Funcionario[]) {
    funcionarios.forEach( async (item: Funcionario) => {
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
    const funcionario = new Funcionario();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      Object.keys(this.entyObj).forEach((key) => {
        funcionario[key] = item[key];
      });
    }

    return funcionario;
  }

  /**
   * Carrega um registro conforme ID
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param id number
   */
  async getFuncForConsulta(id: number, consulta: Consulta) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where id = ?';
    const data = [id];
    const result = await this.db.executeSQL(sql, data);
    const rows = result.rows;
    const funcionario = new Funcionario();
    if (rows && rows.length > 0) {
      const item = rows.item(0);
      consulta.id_funcionario = this.helper.removeHoldFromId(item.id);
      consulta.func_nome = item.nome_funcionario;
      consulta.id_empresa = item.id_empresa;
      consulta.func_dt_nascimento = item.dt_nascimento;
      consulta.hold_nome = item.hold.toString();
    }

    return consulta;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   *
   */
  async getAll() {
    const sql = 'SELECT * FROM ' + this.tableName +  ' order by nome_funcionario asc';
    const  result = await this.db.executeSQL(sql);
    const  funcionarios = this.fillFuncionarios(result.rows);

    return funcionarios;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   *
   */
  async getByEmpresa(idEmpresa: number, sistema: number) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where id_empresa = ? and hold = ? order by nome_funcionario asc';
    const data = [idEmpresa, sistema];
    const  result = await this.db.executeSQL(sql, data);
    const  funcionarios = this.fillFuncionarios(result.rows);

    return funcionarios;
  }

  /**
   * Carrega todos os registros
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   *
   */
  async searchByNameFunc(idEmpresa: number, sistema: number, text: string) {
    const sql = 'SELECT * FROM ' + this.tableName + ' where id_empresa = ? and hold = ? and nome_funcionario like ?';
    const data = [idEmpresa, sistema, `%${text}%`];
    const  result = await this.db.executeSQL(sql, data);
    const  funcionarios = this.fillFuncionarios(result.rows);

    return funcionarios;
  }

  /**
   * Carrega um array com todos os campos necessários
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 23-07-2020
   * @version 1.0
   * @param rows any
   */
  private fillFuncionarios(rows: any) {
    const funcionarios: Funcionario[] = [];
    for (let i = 0; i < rows.length; i++) {
      const item = rows.item(i);
      const funcionario = new Funcionario();
      Object.keys(this.entyObj).forEach((key) => {
        funcionario[key] = item[key];
      });
      funcionarios.push(funcionario);
    }

    return funcionarios;
  }

}
