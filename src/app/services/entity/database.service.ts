import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { BrowserStack } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  finan_imoveis: any;

  // Declara um objeto SQLite;
  db: SQLiteObject;
  // Nome do banco de dados
  // tslint:disable-next-line: no-inferrable-types
  databaseName: string = 'tcmed_app.db';

  constructor(
    // Dependências para o SQLite
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter,
  ) {  
  }

  // Abre ou cria o Banco de dados
  async openDatabase() {
    try {
      this.db = await this.sqlite.create({ name: this.databaseName, location: 'default'});
      await this.createDatabase();
    } catch (error) {
      console.error('Erro na tentativa de criar um banco de dados', error);
    }
  }

  // Será criado o banco de dados caso não exista
  async createDatabase() {
    const sqlCreateDatabase = await this.getCreateTable();
    const result = await this.sqlitePorter.importSqlToDb(this.db, sqlCreateDatabase);
    return result ? true : false;
  }

  // Retorna o comando para ser usado no método createDatabase
  async getCreateTable() {
    const sqls = [];    

  // Comando para remover tabela
/*   sqls.push('DROP TABLE last_login;'); */
/*   sqls.push('DROP TABLE banco_taxas;'); */
/*   sqls.push('DROP TABLE finan_imovel;'); */


/*     sqls.push('DROP TABLE bloco;');
    sqls.push('DROP TABLE bloco_item;');
    sqls.push('DROP TABLE empresa;');
    sqls.push('DROP TABLE funcionario;');

    sqls.push('DROP TABLE consulta_anterior;');
    sqls.push('DROP TABLE consulta_enviar;'); */

    // Tabela de finan_imovel    
 
    // Tabela de banco_taxas
    sqls.push('CREATE TABLE IF NOT EXISTS banco_taxas (' +
      'id integer primary key AUTOINCREMENT NOT NULL,' +
      'banco VARCHAR (30),' +
      'tipo_finam VARCHAR (30), ' +
      'avaliacao_garantia integer, ' +
      'juros_anuais, ' +
      'taxa1_mensal VARCHAR (10), ' +
      'taxa2_mensal VARCHAR (10), ' +
      'taxa3_mensal VARCHAR (10), ' +
      'taxa4_mensal VARCHAR (10), ' +
      'taxa5_mensal VARCHAR (10), ' +
      'taxa1_mensal_val integer, ' +
      'taxa2_mensal_val integer, ' +
      'taxa3_mensal_val integer, ' +
      'taxa4_mensal_val integer, ' +
      'taxa5_mensal_val integer, ' +

      'taxa1_mensal_porcent integer, ' +
      'taxa2_mensal_porcent integer, ' +
      'taxa3_mensal_porcent integer, ' +
      'taxa4_mensal_porcent integer, ' +
      'taxa5_mensal_porcent integer, ' +

      'taxa1_mensal_check VARCHAR (1), ' +
      'taxa2_mensal_check VARCHAR (1), ' +
      'taxa3_mensal_check VARCHAR (1), ' +
      'taxa4_mensal_check VARCHAR (1), ' +
      'taxa5_mensal_check VARCHAR (1), ' +
      'created_at Date, ' +
      'updated_at Date);');

    // Tabela de bloco
    sqls.push('CREATE TABLE IF NOT EXISTS bloco (' +
      'id integer primary key AUTOINCREMENT NOT NULL,' +
      'referencia VARCHAR (15),' +
      'medico_id integer, ' +
      'qtd_empresa integer, ' +
      'agendado_em Date, ' +
      'created_at Date, ' +
      'hold integer, ' +
      'created_by_nome VARCHAR (60));');

    // Tabela bloco_item
    sqls.push('CREATE TABLE IF NOT EXISTS bloco_item (' +
      'id integer primary key AUTOINCREMENT NOT NULL,' +
      'empresa_id integer, ' +
      'bloco_id integer, ' +
      'qtd_fun_item integer, ' +
      'sequencia integer, ' +
      'hora_fim  VARCHAR (10), ' +
      'hora_ini  VARCHAR (10), ' +
      'check_in  Date, ' +
      'check_out Date, ' +
      'obs_check TEXT, ' +
      'tempo_consul VARCHAR (10), ' +
      'translado VARCHAR (10), ' +
      'reagendar VARCHAR (10), ' +
      'observacao TEXT, ' +
      'hold integer, ' +
      'FOREIGN KEY(empresa_id) REFERENCES empresa(id), ' +
      'FOREIGN KEY(bloco_id)   REFERENCES bloco(id)' +
    ');');

    // Tabela empresa
    sqls.push('CREATE TABLE IF NOT EXISTS empresa (' +
      'id integer primary key AUTOINCREMENT NOT NULL,' +
      'id_administradora integer, ' +
      'bairro VARCHAR (50), ' +
      'cep VARCHAR (50), ' +
      'cidade VARCHAR (50), ' +
      'estado VARCHAR (10), ' +
      'cnpj VARCHAR (50), ' +
      'codrua VARCHAR (50), ' +
      'complemento VARCHAR (50), ' +
      'endereco VARCHAR (150), ' +
      'fantasia_empresa VARCHAR (100), ' +
      'razao_social VARCHAR (100), ' +
      'referencia_emp VARCHAR (20), ' +
      'numero_rua integer, ' +
      'qtd_func integer, ' +
      'hold integer ' +
    ');');

    // Tabela funcionario
    sqls.push('CREATE TABLE IF NOT EXISTS funcionario (' +
      'id integer primary key AUTOINCREMENT NOT NULL,' +
      'id_empresa integer, ' +
      'dt_admissao Date, ' +
      'dt_nascimento Date, ' +
      'ultimo_exame Date, ' +
      'cpf VARCHAR (50), ' +
      'estado_civil VARCHAR (20), ' +
      'id_last_consulta VARCHAR (20), ' +
      'nome_funcionario VARCHAR (100), ' +
      'referencia_func VARCHAR (20), ' +
      'periodicidade VARCHAR (20), ' +
      'pis VARCHAR (50), ' +
      'rg VARCHAR (50), ' +
      'ultimo_tipo_exame VARCHAR (20), ' +
      'hold integer, ' +
      'FOREIGN KEY(id_empresa) REFERENCES empresa(id)' +
    ');');

    // Tabela last_login
    sqls.push('CREATE TABLE IF NOT EXISTS last_login (' +
      'id integer primary key AUTOINCREMENT NOT NULL,' +
      'nickname VARCHAR (30), ' +
      'referencia VARCHAR (20), ' +
      'role VARCHAR (20), ' +
      'situacao VARCHAR (20), ' +
      'status VARCHAR (20), ' +
      'tipo VARCHAR (20), ' +
      'created_at VARCHAR (20), ' +
      'email_usuario VARCHAR (100), ' +
      'id_usuario integer, ' +
      'id_medico_vila  integer, ' +
      'id_medico_tcmed  integer, ' +
      'nome_usuario VARCHAR (100), ' +
      'login_date Date, ' +
      'hold integer ' +
    ');');

    // Tabela cid
    sqls.push('CREATE TABLE IF NOT EXISTS cid (' +
      'id integer primary key AUTOINCREMENT NOT NULL,' +
      'numero               VARCHAR (10), ' +
      'descricao            VARCHAR (200) ' +
    ');');

    // Tabela consulta anterior
    sqls.push('CREATE TABLE IF NOT EXISTS consulta_anterior (' +
      'id integer primary key AUTOINCREMENT NOT NULL,' +
      'id_empresa            integer, ' +
      'id_funcionario        integer, ' +
      'id_medico             integer, ' +
      'medico_nome           VARCHAR (200), ' +
      'id_hist_ocupacional   integer, ' +
      'created_at            Date, ' +
      'created_by            integer, ' +
      'status                VARCHAR (20), ' +

      'hold_nome             VARCHAR (100), ' +
      'hold_id               integer, ' +
      'adm_nome              VARCHAR (100), ' +
      'emp_nome              VARCHAR (200), ' +
      'func_nome             VARCHAR (200), ' +
      'func_sexo             VARCHAR (10), ' +
      'func_dt_nascimento    Date, ' +
      'func_setor            VARCHAR (100), ' +
      'func_cargo            VARCHAR (200), ' +
      'func_cargo_desc       VARCHAR (200), ' +
      'func_cargo_risc       VARCHAR (200), ' +
      'func_cargo_epi        VARCHAR (200), ' +
      'func_cargo_epc        VARCHAR (200), ' +

      'consulta_data         Date, ' +
      'consulta_tipo         VARCHAR (10), ' +
      'consulta_queixa       TEXT, ' +

      'consulta_p01          VARCHAR (200), ' +       // Trabalha em outro emprego?
      'consulta_p01s         VARCHAR (1), ' +         // sim | não
      'consulta_p02          VARCHAR (200), ' +       // Tem defeito físico?
      'consulta_p02s         VARCHAR (1), ' +         // sim | não
      'consulta_p03          VARCHAR (200), ' +       // Bebe?
      'consulta_p03s         VARCHAR (1), ' +         // sim | não
      'consulta_p04          VARCHAR (200), ' +       // Fuma?
      'consulta_p04s         VARCHAR (1), ' +         // sim | não
      'consulta_p05          VARCHAR (200), ' +       // Pratica Esporte?
      'consulta_p05s         VARCHAR (1), ' +         // sim | não
      'consulta_p06          VARCHAR (200), ' +       // Está Fazendo Algum Tratamento de Saúde?
      'consulta_p06s         VARCHAR (1), ' +         // sim | não
      'consulta_p07          VARCHAR (200), ' +       // Toma Algum Remédio?
      'consulta_p07s         VARCHAR (1), ' +         // sim | não
      'consulta_p08          VARCHAR (200), ' +       // Tem Algum Tipo de Alergia?
      'consulta_p08s         VARCHAR (1), ' +         // sim | não
      'consulta_p09          VARCHAR (200), ' +       // Tem Algum Problema de Pressão?
      'consulta_p09s         VARCHAR (1), ' +         // sim | não
      'consulta_p10          VARCHAR (200), ' +       // Tem Diabete?
      'consulta_p10s         VARCHAR (1), ' +         // sim | não
      'consulta_p11          VARCHAR (200), ' +       // Tem Varizes?
      'consulta_p11s         VARCHAR (1), ' +         // sim | não
      'consulta_p12          VARCHAR (200), ' +       // Tem Hérnia?
      'consulta_p12s         VARCHAR (1), ' +         // sim | não
      'consulta_p13          VARCHAR (200), ' +       // Tem Algum Problema de Audição?
      'consulta_p13s         VARCHAR (1), ' +         // sim | não
      'consulta_p14          VARCHAR (200), ' +       // Interrogatorio 2
      'consulta_p14s         VARCHAR (1), ' +         // Tem Algum Problema de Visão?
      'consulta_p15          VARCHAR (200), ' +       // sim | não
      'consulta_p15s         VARCHAR (1), ' +         // Tem Algum Problema de Pulmão?
      'consulta_p16          VARCHAR (200), ' +       // sim | não
      'consulta_p16s         VARCHAR (1), ' +         // Tem Algum Problema de Coração?
      'consulta_p17          VARCHAR (200), ' +       // sim | não
      'consulta_p17s         VARCHAR (1), ' +         // Tem Algum Problema do Aparelho Digestivo?
      'consulta_p18          VARCHAR (200), ' +       // sim | não
      'consulta_p18s         VARCHAR (1), ' +         // Tem Algum Problema genito-urinário?
      'consulta_p19          VARCHAR (200), ' +       // sim | não
      'consulta_p19s         VARCHAR (1), ' +         // Foi Internado Alguma vez no Hospital?
      'consulta_p20          VARCHAR (200), ' +       // sim | não
      'consulta_p20s         VARCHAR (1), ' +         // Foi Operado Alguma vez?
      'consulta_p21          VARCHAR (200), ' +       // sim | não
      'consulta_p21s         VARCHAR (1), ' +         // Tem Alguma Cirurgia ou Tratamento Pendente?
      'consulta_p22          VARCHAR (200), ' +       // sim | não
      'consulta_p22s         VARCHAR (1), ' +         // Recebeu Algum Benefício ou Seguro da Previdência?
      'consulta_p23          VARCHAR (200), ' +       // sim | não
      'consulta_p23s         VARCHAR (1), ' +         // Sofreu Algum Acidente?
      'consulta_p24          VARCHAR (200), ' +       // sim | não
      'consulta_p24s         VARCHAR (1), ' +         // Tem Dores nas Costas ou Algum Problema de Coluna?
      'consulta_p25          VARCHAR (200), ' +       // sim | não
      'consulta_p25s         VARCHAR (1), ' +         // Tem tontura, vertigem ou labirintite?
      'consulta_p26          VARCHAR (200), ' +       // sim | não
      'consulta_p26s         VARCHAR (1), ' +         // Tem fobia no trabalho em altura?
      'consulta_p27          VARCHAR (200), ' +       // sim | não
      'consulta_p27s         VARCHAR (1), ' +         // Já teve algum desmaio ou convulsão ?

      'consulta_ant_ocup     TEXT, ' +
      'consulta_ant_pess     TEXT, ' +
      'consulta_ant_gine     TEXT, ' +
      'consulta_ant_dt       Date, ' +

      'consulta_doenca_1p    VARCHAR (1), ' +    // Psiquiatriamãe | pai
      'consulta_doenca_1m    VARCHAR (1), ' +    // Psiquiatriamãe | mãe
      'consulta_doenca_2p    VARCHAR (1), ' +    // Neoplasiamãe | pai
      'consulta_doenca_2m    VARCHAR (1), ' +    // Neoplasiamãe | mãe
      'consulta_doenca_3p    VARCHAR (1), ' +    // Alcoolismomãe | pai
      'consulta_doenca_3m    VARCHAR (1), ' +    // Alcoolismomãe | mãe
      'consulta_doenca_4p    VARCHAR (1), ' +    // Cardiopatiamãe | pai
      'consulta_doenca_4m    VARCHAR (1), ' +    // Cardiopatiamãe | mãe
      'consulta_doenca_5p    VARCHAR (1), ' +    // Hereditáriamãe | pai
      'consulta_doenca_5m    VARCHAR (1), ' +    // Hereditáriamãe | mãe
      'consulta_doenca_6p    VARCHAR (1), ' +    // Hipertenção Arterial | pai
      'consulta_doenca_6m    VARCHAR (1), ' +    // Hipertenção Arterial | mãe
      'consulta_doenca_7p    VARCHAR (1), ' +    // Diabetesmãe | pai
      'consulta_doenca_7m    VARCHAR (1), ' +    // Diabetesmãe | mãe
      'consulta_doenca_8     VARCHAR (1), ' +    // Nenhuma
      'consulta_doenca_out   VARCHAR (200), ' +  // outras desc

      'consulta_peso         VARCHAR (10), ' +
      'consulta_altu         VARCHAR (10), ' +
      'consulta_temp         VARCHAR (10), ' +
      'consulta_pre_max      VARCHAR (10), ' +
      'consulta_pre_min      VARCHAR (10), ' +
      'consulta_card         VARCHAR (10), ' +
      'consulta_resp         VARCHAR (10), ' +

      'consulta_fisico_1     TEXT, ' +     // Pele/Mucosa
      'consulta_fisico_2     TEXT, ' +     // Aparelho Urinário
      'consulta_fisico_3     TEXT, ' +     // Cabeça/Pescoço
      'consulta_fisico_4     TEXT, ' +     // Hérnia/Hemor/Varic
      'consulta_fisico_5     TEXT, ' +     // Tórax (Cardio-Resp.)
      'consulta_fisico_6     TEXT, ' +     // Membros (Varizes)
      'consulta_fisico_7     TEXT, ' +     // Abdome
      'consulta_fisico_8     TEXT, ' +     // Neurológico
      'consulta_fisico_9     TEXT, ' +     // Aparelho Digestivo

      'consulta_cid_1        VARCHAR (10), ' +
      'consulta_cid_2        VARCHAR (10), ' +
      'consulta_cid_3        VARCHAR (10), ' +
      'consulta_cid_4        VARCHAR (10), ' +
      'consulta_cid_5        VARCHAR (10), ' +
      'consulta_cid_6        VARCHAR (10), ' +
      'consulta_cid_obs      TEXT, ' +

      'consulta_resul_med    VARCHAR (1), ' +
      'consulta_resul_ocu    VARCHAR (1), ' +
      'consulta_resul_exa    VARCHAR (1), ' +
      'consulta_resul_enc    VARCHAR (1), ' +

      'consulta_obs_aso      TEXT ' +

    ');');

    // Tabela consulta enviar
    sqls.push('CREATE TABLE IF NOT EXISTS consulta_enviar (' +
      'id integer primary key AUTOINCREMENT NOT NULL,' +
      'id_empresa            integer, ' +
      'id_funcionario        integer, ' +
      'id_medico             integer, ' +
      'medico_nome           VARCHAR (200), ' +
      'id_hist_ocupacional   integer, ' +
      'created_at            Date, ' +
      'created_by            integer, ' +
      'status                VARCHAR (50), ' +

      'hold_nome             VARCHAR (100), ' +
      'hold_id               integer, ' +
      'adm_nome              VARCHAR (100), ' +
      'emp_nome              VARCHAR (200), ' +
      'func_nome             VARCHAR (200), ' +
      'func_sexo             VARCHAR (10), ' +
      'func_dt_nascimento    Date, ' +
      'func_setor            VARCHAR (100), ' +
      'func_cargo            VARCHAR (200), ' +
      'func_cargo_desc       VARCHAR (200), ' +
      'func_cargo_risc       VARCHAR (200), ' +
      'func_cargo_epi        VARCHAR (200), ' +
      'func_cargo_epc        VARCHAR (200), ' +

      'consulta_data         Date, ' +
      'consulta_tipo         VARCHAR (10), ' +
      'consulta_queixa       TEXT, ' +

      'consulta_p01          VARCHAR (200), ' +       // Trabalha em outro emprego?
      'consulta_p01s         VARCHAR (1), ' +         // sim | não
      'consulta_p02          VARCHAR (200), ' +       // Tem defeito físico?
      'consulta_p02s         VARCHAR (1), ' +         // sim | não
      'consulta_p03          VARCHAR (200), ' +       // Bebe?
      'consulta_p03s         VARCHAR (1), ' +         // sim | não
      'consulta_p04          VARCHAR (200), ' +       // Fuma?
      'consulta_p04s         VARCHAR (1), ' +         // sim | não
      'consulta_p05          VARCHAR (200), ' +       // Pratica Esporte?
      'consulta_p05s         VARCHAR (1), ' +         // sim | não
      'consulta_p06          VARCHAR (200), ' +       // Está Fazendo Algum Tratamento de Saúde?
      'consulta_p06s         VARCHAR (1), ' +         // sim | não
      'consulta_p07          VARCHAR (200), ' +       // Toma Algum Remédio?
      'consulta_p07s         VARCHAR (1), ' +         // sim | não
      'consulta_p08          VARCHAR (200), ' +       // Tem Algum Tipo de Alergia?
      'consulta_p08s         VARCHAR (1), ' +         // sim | não
      'consulta_p09          VARCHAR (200), ' +       // Tem Algum Problema de Pressão?
      'consulta_p09s         VARCHAR (1), ' +         // sim | não
      'consulta_p10          VARCHAR (200), ' +       // Tem Diabete?
      'consulta_p10s         VARCHAR (1), ' +         // sim | não
      'consulta_p11          VARCHAR (200), ' +       // Tem Varizes?
      'consulta_p11s         VARCHAR (1), ' +         // sim | não
      'consulta_p12          VARCHAR (200), ' +       // Tem Hérnia?
      'consulta_p12s         VARCHAR (1), ' +         // sim | não
      'consulta_p13          VARCHAR (200), ' +       // Tem Algum Problema de Audição?
      'consulta_p13s         VARCHAR (1), ' +         // sim | não
      'consulta_p14          VARCHAR (200), ' +       // Interrogatorio 2
      'consulta_p14s         VARCHAR (1), ' +         // Tem Algum Problema de Visão?
      'consulta_p15          VARCHAR (200), ' +       // sim | não
      'consulta_p15s         VARCHAR (1), ' +         // Tem Algum Problema de Pulmão?
      'consulta_p16          VARCHAR (200), ' +       // sim | não
      'consulta_p16s         VARCHAR (1), ' +         // Tem Algum Problema de Coração?
      'consulta_p17          VARCHAR (200), ' +       // sim | não
      'consulta_p17s         VARCHAR (1), ' +         // Tem Algum Problema do Aparelho Digestivo?
      'consulta_p18          VARCHAR (200), ' +       // sim | não
      'consulta_p18s         VARCHAR (1), ' +         // Tem Algum Problema genito-urinário?
      'consulta_p19          VARCHAR (200), ' +       // sim | não
      'consulta_p19s         VARCHAR (1), ' +         // Foi Internado Alguma vez no Hospital?
      'consulta_p20          VARCHAR (200), ' +       // sim | não
      'consulta_p20s         VARCHAR (1), ' +         // Foi Operado Alguma vez?
      'consulta_p21          VARCHAR (200), ' +       // sim | não
      'consulta_p21s         VARCHAR (1), ' +         // Tem Alguma Cirurgia ou Tratamento Pendente?
      'consulta_p22          VARCHAR (200), ' +       // sim | não
      'consulta_p22s         VARCHAR (1), ' +         // Recebeu Algum Benefício ou Seguro da Previdência?
      'consulta_p23          VARCHAR (200), ' +       // sim | não
      'consulta_p23s         VARCHAR (1), ' +         // Sofreu Algum Acidente?
      'consulta_p24          VARCHAR (200), ' +       // sim | não
      'consulta_p24s         VARCHAR (1), ' +         // Tem Dores nas Costas ou Algum Problema de Coluna?
      'consulta_p25          VARCHAR (200), ' +       // sim | não
      'consulta_p25s         VARCHAR (1), ' +         // Tem tontura, vertigem ou labirintite?
      'consulta_p26          VARCHAR (200), ' +       // sim | não
      'consulta_p26s         VARCHAR (1), ' +         // Tem fobia no trabalho em altura?
      'consulta_p27          VARCHAR (200), ' +       // sim | não
      'consulta_p27s         VARCHAR (1), ' +         // Já teve algum desmaio ou convulsão ?

      'consulta_ant_ocup     TEXT, ' +
      'consulta_ant_pess     TEXT, ' +
      'consulta_ant_gine     TEXT, ' +
      'consulta_ant_dt       Date, ' +

      'consulta_doenca_1p    VARCHAR (1), ' +    // Psiquiatriamãe | pai
      'consulta_doenca_1m    VARCHAR (1), ' +    // Psiquiatriamãe | mãe
      'consulta_doenca_2p    VARCHAR (1), ' +    // Neoplasiamãe | pai
      'consulta_doenca_2m    VARCHAR (1), ' +    // Neoplasiamãe | mãe
      'consulta_doenca_3p    VARCHAR (1), ' +    // Alcoolismomãe | pai
      'consulta_doenca_3m    VARCHAR (1), ' +    // Alcoolismomãe | mãe
      'consulta_doenca_4p    VARCHAR (1), ' +    // Cardiopatiamãe | pai
      'consulta_doenca_4m    VARCHAR (1), ' +    // Cardiopatiamãe | mãe
      'consulta_doenca_5p    VARCHAR (1), ' +    // Hereditáriamãe | pai
      'consulta_doenca_5m    VARCHAR (1), ' +    // Hereditáriamãe | mãe
      'consulta_doenca_6p    VARCHAR (1), ' +    // Hipertenção Arterial | pai
      'consulta_doenca_6m    VARCHAR (1), ' +    // Hipertenção Arterial | mãe
      'consulta_doenca_7p    VARCHAR (1), ' +    // Diabetesmãe | pai
      'consulta_doenca_7m    VARCHAR (1), ' +    // Diabetesmãe | mãe
      'consulta_doenca_8     VARCHAR (1), ' +    // Nenhuma
      'consulta_doenca_out   VARCHAR (200), ' +  // outras desc

      'consulta_peso         VARCHAR (10), ' +
      'consulta_altu         VARCHAR (10), ' +
      'consulta_temp         VARCHAR (10), ' +
      'consulta_pre_max      VARCHAR (10), ' +
      'consulta_pre_min      VARCHAR (10), ' +
      'consulta_card         VARCHAR (10), ' +
      'consulta_resp         VARCHAR (10), ' +

      'consulta_fisico_1     TEXT, ' +     // Pele/Mucosa
      'consulta_fisico_2     TEXT, ' +     // Aparelho Urinário
      'consulta_fisico_3     TEXT, ' +     // Cabeça/Pescoço
      'consulta_fisico_4     TEXT, ' +     // Hérnia/Hemor/Varic
      'consulta_fisico_5     TEXT, ' +     // Tórax (Cardio-Resp.)
      'consulta_fisico_6     TEXT, ' +     // Membros (Varizes)
      'consulta_fisico_7     TEXT, ' +     // Abdome
      'consulta_fisico_8     TEXT, ' +     // Neurológico
      'consulta_fisico_9     TEXT, ' +     // Aparelho Digestivo

      'consulta_cid_1        VARCHAR (10), ' +
      'consulta_cid_2        VARCHAR (10), ' +
      'consulta_cid_3        VARCHAR (10), ' +
      'consulta_cid_4        VARCHAR (10), ' +
      'consulta_cid_5        VARCHAR (10), ' +
      'consulta_cid_6        VARCHAR (10), ' +
      'consulta_cid_obs      TEXT, ' +

      'consulta_resul_med    VARCHAR (1), ' +
      'consulta_resul_ocu    VARCHAR (1), ' +
      'consulta_resul_exa    VARCHAR (1), ' +
      'consulta_resul_enc    VARCHAR (1), ' +

      'consulta_obs_aso      TEXT ' +

    ');');

    // Cria a tabela FinanTable caso não exista
    const finanTable = await this.finanImoveisTable();
    sqls.push(finanTable);
    const finanTablePrice = await this.finanImoveisPriceTable();
    sqls.push(finanTablePrice);

    return sqls.join('\n');
  }

  // Executa comandos SQLite enviados na string sql e com os parâmetros em array
  executeSQL(sql: string, params?: any[]) {
    return this.db.executeSql(sql, params);
  }


  /**
   * Carrega um registro conforme Data
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 12-12-2021
   * @version 1.0
   * @param fieldsArray []
   * @return field string
   */
  // tslint:disable-next-line: variable-name
  async createTable(fieldsArray: any[], tableName: String) {
    if(!fieldsArray) {
      return null;
    }
    let tableString = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (';
    for (let i = 0; i < fieldsArray.length; i++) {
      const field = fieldsArray[i];
      switch (field.type) { 
        case 'var':
          if(!field.size){
            const erro = 'Tamanho do campo Varchar ' + field.campo + ' na tabela ' + tableName + ' não especificado!'
           throwError(erro);
           console.log(erro);
           return null;
          }
          tableString += field.campo + ' VARCHAR (' + field.size + '), ';
          break;
        case 'text':
          tableString += field.campo + ' VARCHAR (' + field.size + '), ';
          break;     
        case 'int':
          tableString += field.campo + ' integer, ';
          break;
        case 'date':
          tableString += field.campo + ' Date, ';
          break;
        case 'primary':
          tableString += 'id integer primary key AUTOINCREMENT NOT NULL, ';
          break;
      }
    }

    tableString = tableString.replace(/,\s*$/, "");
    tableString += ');';
    return tableString;
  } 
  
  async finanImoveisTable() {
    const finanImoveisTb = [
      {campo: 'id',                         type: 'primary', size: null},
      {campo: 'banco_id',                   type: 'int',     size: null},
      {campo: 'banco_nome',                 type: 'var',     size: 100},
      {campo: 'salario',                    type: 'int',     size: null},
      {campo: 'total_imovel_val',           type: 'int',     size: null},
      {campo: 'itbi_escritura_val',         type: 'int',     size: null},
      {campo: 'itbi_escritura_choice',      type: 'int',     size: null},
      {campo: 'avaliacao_garantia_val',     type: 'int',     size: null},
      {campo: 'avaliacao_garantia_choice',  type: 'var',     size: 10},
      {campo: 'total_somas',                type: 'int',     size: null},
      {campo: 'total_imovel_parcelado_val', type: 'int',     size: null},
      {campo: 'total_juros_somados_val',    type: 'int',     size: null},
      {campo: 'total_perdas_somados_val',   type: 'int',     size: null},
      {campo: 'total_somas_perdas',         type: 'int',     size: null},
      {campo: 'entrada_val',                type: 'int',     size: null},
      {campo: 'saldo_devedor_val',          type: 'int',     size: null},
      {campo: 'qtd_parcelas_anos',          type: 'int',     size: null},
      {campo: 'qtd_parcelas_meses',         type: 'int',     size: null},
      {campo: 'percent_juros_anual',        type: 'int',     size: null},
      {campo: 'percent_juros_mensal',       type: 'int',     size: null},
      {campo: 'amortizacao_mensal_val',     type: 'int',     size: null},
      {campo: 'juros_mensal_val',           type: 'int',     size: null},
      {campo: 'taxa1_mensal_val',           type: 'int',     size: null},
      {campo: 'taxa2_mensal_val',           type: 'int',     size: null},
      {campo: 'taxa3_mensal_val',           type: 'int',     size: null},
      {campo: 'taxa4_mensal_val',           type: 'int',     size: null},
      {campo: 'taxa5_mensal_val',           type: 'int',     size: null},     
      {campo: 'taxa1_mensal',               type: 'var',     size: 30},  
      {campo: 'taxa2_mensal',               type: 'var',     size: 30},
      {campo: 'taxa3_mensal',               type: 'var',     size: 30},
      {campo: 'taxa4_mensal',               type: 'var',     size: 30},
      {campo: 'taxa5_mensal',               type: 'var',     size: 30},
      {campo: 'taxa1_mensal_check',         type: 'int',     size: null},
      {campo: 'taxa2_mensal_check',         type: 'int',     size: null},
      {campo: 'taxa3_mensal_check',         type: 'int',     size: null},
      {campo: 'taxa4_mensal_check',         type: 'int',     size: null},
      {campo: 'taxa5_mensal_check',         type: 'int',     size: null},
      {campo: 'taxa1_mensal_porcent',       type: 'int',     size: null},
      {campo: 'taxa2_mensal_porcent',       type: 'int',     size: null},
      {campo: 'taxa3_mensal_porcent',       type: 'int',     size: null},
      {campo: 'taxa4_mensal_porcent',       type: 'int',     size: null},
      {campo: 'taxa5_mensal_porcent',       type: 'int',     size: null},
      {campo: 'total_taxa1_val',            type: 'int',     size: null},
      {campo: 'total_taxa2_val',            type: 'int',     size: null},
      {campo: 'total_taxa3_val',            type: 'int',     size: null},
      {campo: 'total_taxa4_val',            type: 'int',     size: null},
      {campo: 'total_taxa5_val',            type: 'int',     size: null},
      {campo: 'total_taxas_somados_val',    type: 'int',     size: null},
      {campo: 'perda_mensal_val',           type: 'int',     size: null},
      {campo: 'salario_parcela_val',        type: 'int',     size: null},
      {campo: 'poup_mensal_val',            type: 'int',     size: null},
      {campo: 'poup_meses',                 type: 'int',     size: null},
      {campo: 'poup_anos',                  type: 'int',     size: null},
      {campo: 'amortizacao_futura_val',     type: 'int',     size: null},
      {campo: 'qtd_meses_amortizacao',      type: 'int',     size: null},
      {campo: 'qtd_meses_restantes',        type: 'int',     size: null},
      {campo: 'primeira_parcela',           type: 'int',     size: null},
      {campo: 'ultima_parcela',             type: 'int',     size: null},
      {campo: 'created_at Date',            type: 'date',    size: null},
      {campo: 'updated_at',                 type: 'date',    size: null},      
    ];

    const table = await this.createTable(finanImoveisTb, 'finan_imovel');
    
    return table;

  }

  async finanImoveisPriceTable() {
    const tableFields = [
      {campo: 'id',                         type: 'primary', size: null},
      {campo: 'banco_id',                   type: 'int',     size: null},
      {campo: 'banco_nome',                 type: 'var',     size: 100},
      {campo: 'salario',                    type: 'int',     size: null},
      {campo: 'total_imovel_val',           type: 'int',     size: null},
      {campo: 'itbi_escritura_val',         type: 'int',     size: null},
      {campo: 'itbi_escritura_choice',      type: 'int',     size: null},
      {campo: 'avaliacao_garantia_val',     type: 'int',     size: null},
      {campo: 'avaliacao_garantia_choice',  type: 'var',     size: 10},
      {campo: 'total_somas',                type: 'int',     size: null},
      {campo: 'total_imovel_parcelado_val', type: 'int',     size: null},
      {campo: 'total_juros_somados_val',    type: 'int',     size: null},
      {campo: 'total_perdas_somados_val',   type: 'int',     size: null},
      {campo: 'total_somas_perdas',         type: 'int',     size: null},
      {campo: 'entrada_val',                type: 'int',     size: null},
      {campo: 'saldo_devedor_val',          type: 'int',     size: null},
      {campo: 'qtd_parcelas_anos',          type: 'int',     size: null},
      {campo: 'qtd_parcelas_meses',         type: 'int',     size: null},
      {campo: 'percent_juros_anual',        type: 'int',     size: null},
      {campo: 'percent_juros_mensal',       type: 'int',     size: null},
      {campo: 'amortizacao_mensal_val',     type: 'int',     size: null},
      {campo: 'juros_mensal_val',           type: 'int',     size: null},
      {campo: 'taxa1_mensal_val',           type: 'int',     size: null},
      {campo: 'taxa2_mensal_val',           type: 'int',     size: null},
      {campo: 'taxa3_mensal_val',           type: 'int',     size: null},
      {campo: 'taxa4_mensal_val',           type: 'int',     size: null},
      {campo: 'taxa5_mensal_val',           type: 'int',     size: null},     
      {campo: 'taxa1_mensal',               type: 'var',     size: 30},  
      {campo: 'taxa2_mensal',               type: 'var',     size: 30},
      {campo: 'taxa3_mensal',               type: 'var',     size: 30},
      {campo: 'taxa4_mensal',               type: 'var',     size: 30},
      {campo: 'taxa5_mensal',               type: 'var',     size: 30},
      {campo: 'taxa1_mensal_check',         type: 'int',     size: null},
      {campo: 'taxa2_mensal_check',         type: 'int',     size: null},
      {campo: 'taxa3_mensal_check',         type: 'int',     size: null},
      {campo: 'taxa4_mensal_check',         type: 'int',     size: null},
      {campo: 'taxa5_mensal_check',         type: 'int',     size: null},
      {campo: 'taxa1_mensal_porcent',       type: 'int',     size: null},
      {campo: 'taxa2_mensal_porcent',       type: 'int',     size: null},
      {campo: 'taxa3_mensal_porcent',       type: 'int',     size: null},
      {campo: 'taxa4_mensal_porcent',       type: 'int',     size: null},
      {campo: 'taxa5_mensal_porcent',       type: 'int',     size: null},
      {campo: 'total_taxa1_val',            type: 'int',     size: null},
      {campo: 'total_taxa2_val',            type: 'int',     size: null},
      {campo: 'total_taxa3_val',            type: 'int',     size: null},
      {campo: 'total_taxa4_val',            type: 'int',     size: null},
      {campo: 'total_taxa5_val',            type: 'int',     size: null},
      {campo: 'total_taxas_somados_val',    type: 'int',     size: null},
      {campo: 'perda_mensal_val',           type: 'int',     size: null},
      {campo: 'salario_parcela_val',        type: 'int',     size: null},
      {campo: 'poup_mensal_val',            type: 'int',     size: null},
      {campo: 'poup_meses',                 type: 'int',     size: null},
      {campo: 'poup_anos',                  type: 'int',     size: null},
      {campo: 'amortizacao_futura_val',     type: 'int',     size: null},
      {campo: 'qtd_meses_amortizacao',      type: 'int',     size: null},
      {campo: 'qtd_meses_restantes',        type: 'int',     size: null},
      {campo: 'created_at Date',            type: 'date',    size: null},
      {campo: 'updated_at',                 type: 'date',    size: null},      
    ];

    const table = await this.createTable(tableFields, 'finan_imovel_price');
    
    return table;

  }  

}
