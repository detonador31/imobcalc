import { EntLastLoginService } from './../../services/entity/ent-last_login.service';
import { EntConsultaService } from './../../services/entity/ent-consulta.service';
import { EntConsultaEnviarService } from './../../services/entity/ent-consulta_enviar.service';
import { EntCidService } from './../../services/entity/ent-cid.service';
import { EntBlocoService } from './../../services/entity/ent-bloco.service';
import { EntBlocoItemService } from './../../services/entity/ent-bloco_item.service';
import { EntFuncionarioService } from './../../services/entity/ent-funcionario.service';
import { EntEmpresaService } from './../../services/entity/ent-empresa.service';
import { Cid } from './../../classes/cid';
import { Consulta } from './../../classes/consulta';
import { Bloco } from './../../classes/bloco';
import { BlocoItem } from './../../classes/bloco_item';
import { Funcionario } from './../../classes/funcionario';
import { Empresa } from './../../classes/empresa';
import { Usuario } from './../../classes/usuario';
import { hold } from './../../../environments/environment';
import { ApiAgendaService } from './../../services/api/api-agenda.service';
import { Component, OnInit } from '@angular/core';
import { HelperService } from './../../services/outros/helper.service';
import { LoadingController, Platform } from '@ionic/angular';
// Redirecionamento e captura de ids e valores em URLs
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-tcmed',
  templateUrl: './options-tcmed.page.html',
  styleUrls: ['./options-tcmed.page.scss'],
})
export class OptionsTcmedPage implements OnInit {

  holdVila: number = hold.vila;
  holdTcmed: number = hold.tcmed;
  public salvandoBd: any;
  public loadingVila: any;
  public loadingTcmed: any;
  public loading: any;
  loadingDump: any;
  userData: Usuario;
  loadUsuario: any;
  blocos: any;
  blocosItens: any;
  empresas: any;
  funcionarios: any;
  cid: any;
  numeroRegistros: number;
  nomeUsuario: string;

  constructor(
    private entBloco: EntBlocoService,
    private entBlocoItem: EntBlocoItemService,
    private entEmpresa: EntEmpresaService,
    private entFuncionario: EntFuncionarioService,
    private entCid: EntCidService,
    private entConsulta: EntConsultaService,
    private entConsultaEnviar: EntConsultaEnviarService,
    private entLastLogin: EntLastLoginService,
    public router: Router,
    private helper: HelperService,
    private loadingCtrl: LoadingController,
    private apiAgenda: ApiAgendaService,
    private platform: Platform
  ) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backPage();
    });
    this.blocos = [];
    this.blocosItens = [];
    this.empresas = [];
    this.funcionarios = [];
    this.cid = [];
  }

  async ngOnInit() {
    this.loadUsuario = await this.loadingCtrl.create({message: 'Carregando dados do Usuário'});
    await this.loadUsuario.present();
    this.userData = await this.helper.getLocaStoragetoObject('userData');
    console.log(this.userData);
    this.loadUsuario.dismiss();
    this.nomeUsuario = this.userData.nomeUsuario;

    const contaLastLogin: any = await this.entLastLogin.getQtdRegisters();
    if (contaLastLogin.rows.length <= 1 ) {
      await this.atualizaCidsData(this.holdVila);
    }
  }


  /**
   * Baixa da API od dados da tabela CID
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 01-09-2020
   * @version 1.0
   * @param sistema number
   */
  async atualizaCidsData(sistema: number) {
    this.loading = await this.loadingCtrl.create({message: 'Primeiro Login. Baixando Cids ....'});
    await this.loading.present();

    this.apiAgenda.sincronizaCids(this.userData, sistema).subscribe(
      async resul => {
        let retorno: any;
        retorno = resul;
        // Verificar a existência de dados antes de tentar salvar
        if (retorno.length > 1) {
          this.loading.dismiss();
          this.salvandoBd = await this.loadingCtrl.create({message: 'Salvando CIDs no BD'});
          await this.salvandoBd.present();
          this.saveAllCids(retorno);
        } else {
          this.loading.dismiss();
          await this.helper.toast('Sucesso', 'Sucesso! Não há Cids para Baixar',
          'success', 'bottom', 3000);
        }
      },
      async () => {
        this.loading.dismiss();
        await this.helper.toast('Falha', 'Erro na conexão entre API e Servidor', 'danger',
        'bottom', 3000);
      }
    );
  }

  /**
   * Salva os dados de Cids na tabela Cids
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   * @param cids any
   */
  async saveAllCids(cids: any) {
    let i = 0;
    cids.forEach(async (item: Cid) => {
      await this.entCid.save(item);
      i++;
      if (i === cids.length) {
        this.salvandoBd.dismiss();
        await this.helper.toast('Sucesso', 'Cids Sincronizado com sucesso!', 'success', 'bottom', 3000);
      }
    });
  //  -------- Para Dump de dados no BD do APP ---------
  /*  setTimeout(() => {  this.getAllTablesHistorico(); }, 3000); */
  }

  /**
   * Atualiza agenda do médico logado, chamado da View
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   */
  async atualizaAgenda() {
    await this.atualizaAgendaSistema(this.holdTcmed);
    setTimeout(async () => { await this.atualizaAgendaSistema(this.holdVila);  }, 2000);
  }

  /**
   * Atualiza agenda de acordo com o parâmetro sistema(Hold)
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   * @param sistema number
   */
  async atualizaAgendaSistema(sistema: number) {
    const holdName = sistema === this.holdVila ? 'Vila Velha' : 'Tecnomed';
    if (sistema === hold.tcmed) {
      this.loadingTcmed = await this.loadingCtrl.create({message: 'Baixando Agenda do Servidor ' + holdName + '....'});
      await this.loadingTcmed.present();
    } else {
      this.loadingVila = await this.loadingCtrl.create({message: 'Baixando Agenda do Servidor ' + holdName + '....'});
      await this.loadingVila.present();
    }

    this.apiAgenda.sincronizaAgenda(this.userData, sistema).subscribe(
      async resul => {
        let retorno: any;
        retorno = resul;
        // Verificar a existência de dados antes de tentar salvar
        if (retorno.blocos !== undefined) {
          if (sistema === hold.tcmed) {
            this.loadingTcmed.dismiss();
            this.loadingTcmed = await this.loadingCtrl.create({message: 'Salvando dados da ' + holdName + ' no BD...'});
            await this.loadingTcmed.present();
          } else {
            this.loadingVila.dismiss();
            this.loadingVila = await this.loadingCtrl.create({message: 'Salvando dados da ' + holdName + ' no BD...'});
            await this.loadingVila.present();
          }
          this.saveAllAgenda(retorno, sistema);
        } else {
          if (sistema === hold.tcmed) {
            this.loadingTcmed.dismiss();
          } else {
            this.loadingVila.dismiss();
          }
          await this.helper.toast('Sucesso', 'Sucesso! Não há dados para Baixar em ' +
          holdName , 'success', 'bottom', 3000);
        }
      },
      async () => {
        if (sistema === hold.tcmed) {
          this.loadingTcmed.dismiss();
        } else {
          this.loadingVila.dismiss();
        }
        await this.helper.toast('Falha', 'Erro na conexão entre API e Servidor ' + holdName, 'danger', 'bottom', 3000);
      }
    );
  }

  /**
   * Executado todos os métodos para salvar dados em cada tabela
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   * @param array any dados que vem da API em JSON
   * @param sistema number
   */
  async saveAllAgenda(array: any, sistema: number) {
    const apiBlocos: any = array.blocos;
    const apiBlocoItens: any = array.blocoItens;
    const apiEmpresas: any = array.empresas;
    const apiFuncionarios: any = array.funcionarios;

    this.saveAllBlocos(apiBlocos, sistema);
    this.saveAllBlocoItens(apiBlocoItens, sistema);
    this.saveAllEmpresas(apiEmpresas, sistema);
    this.saveAllFuncionarios(apiFuncionarios, sistema);
  }

  /**
   * Salva os dados de blocos na tabela blocos
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   * @param blocos any
   * @param sistema number
   */
  async saveAllBlocos(blocos: any, sistema: number) {
    await blocos.forEach(async (item: Bloco) => {
      item.hold = sistema;
      item.id = this.helper.holdAndId(item.id, sistema);
      item.agendado_em = this.helper.dateBrToUsOrUsToBr(item.agendado_em, 'br');
      await this.entBloco.save(item);
    });
  }

  /**
   * Salva os dados de blocosItens na tabela blocosItens
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   * @param blocoItens any
   * @param sistema number
   */
  async saveAllBlocoItens(blocoItens: any, sistema: number) {
    await blocoItens.forEach(async (item: BlocoItem) => {
      item.hold = sistema;
      item.id = this.helper.holdAndId(item.id, sistema);
      await this.entBlocoItem.save(item);
    });
  }

  /**
   * Salva os dados de empresas na tabela empresas
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   * @param empresas any
   * @param sistema number
   */
  async saveAllEmpresas(empresas: any, sistema: number) {
    await empresas.forEach(async (item: Empresa) => {
      item.hold = sistema;
      item.id = this.helper.holdAndId(item.id, sistema);
      await this.entEmpresa.save(item);
    });
  }

  /**
   * Salva os dados de funcionarios na tabela funcionarios
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   * @param funcionarios any
   * @param sistema number
   */
  async saveAllFuncionarios(funcionarios: any, sistema: number) {
    let i = 0;
    await funcionarios.forEach(async (item: Funcionario) => {
      item.hold = sistema;
      item.id = this.helper.holdAndId(item.id, sistema);
      await this.entFuncionario.save(item);
      i ++;
      if (i === funcionarios.length) {
        if (sistema === hold.tcmed) {
          this.loadingTcmed.dismiss();
          await this.helper.toast('Sucesso', 'Tecnomed Sincronizado com sucesso!', 'success', 'bottom', 3000);
        } else {
          this.loadingVila.dismiss();
          this.leBlocosOldParaExclusao();
        }
      }
    });
  }

  /**
   * Lê Blocos antigos + blocoItem + empresa + funcionarios, caso encontrado faz a exclusão
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 26-08-2020
   * @version 1.0
   * @param funcionarios any
   */
  async leBlocosOldParaExclusao() {
    const loadingOldBlocos = await this.loadingCtrl.create({message: 'Procurando Blocos Antigos para exclusão...'});
    loadingOldBlocos.present();

    // Busca blocos existentes anteriores à data atual menos o número de dias (Padrão -45)
    const blocosArray: Bloco[] = await this.entBloco.getByPeriod();
    const blocoItens: BlocoItem[] = [];
    const empresas: Empresa[] = [];
    const funcionarios: Funcionario[] = [];
    // Se encontrado, busca os dados de outras tabelas
    if (blocosArray.length > 0) {
      for (const item of blocosArray) {
        const blocoId = this.helper.removeHoldFromId(item.id);
        // busca os BlocoItens dos blocos encontrados
        const bItem = await this.entBlocoItem.getByBloco(blocoId, item.hold);
        if (bItem.length > 0) {
            for (const itens of bItem) {
            blocoItens.push(itens);
            const empId = this.helper.holdAndId(itens.empresa_id, itens.hold);
            // busca empresas dentro de cada Bloco Item
            const emp: Empresa = await this.entEmpresa.getItem(empId, itens.hold);
            if (emp) {
              empresas.push(emp);
              // busca os funcionarios de cada empresa
              const funcs = this.entFuncionario.getByEmpresa(itens.empresa_id, itens.hold);
              if ((await funcs).length > 0) {
                for (const fu of (await funcs)) {
                  funcionarios.push(fu);
                }
              }
            }
          }
        }
      }
    }
    // Se existir algum bloco no array, exclui tudo relacionado à ele
    if (blocosArray.length > 0) {
      setTimeout(async () => { this.entBloco.deletaBlocos(blocosArray);  }, 1500);
      setTimeout(async () => { this.entBlocoItem.deletaBlocoItens(blocoItens);  }, 1500);
      setTimeout(async () => { this.entEmpresa.deletaEmpresas(empresas);  }, 1500);
      setTimeout(async () => { this.entFuncionario.deletaFuncionarios(funcionarios);  }, 1500);
    }
    loadingOldBlocos.dismiss();
    await this.helper.toast('Sucesso', 'Vila Velha Sincronizado com sucesso!', 'success', 'bottom', 3000);
    // Executa Dump das tabelas da Agenda -----------
    // setTimeout(() => {  this.getAllTablesAgenda(); }, 3000);
  }

  /**
   * Atualiza Histórico de consulta dos funcionários
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   */
  async atualizaHistorico() {
    await this.atualizaHistoricoSistema(this.holdTcmed);
    setTimeout(async () => { await this.atualizaHistoricoSistema(this.holdVila);  }, 2000);
  }

  /**
   * Atualiza agenda de acordo com o parâmetro sistema(Hold)
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   * @param sistema number
   */
  async atualizaHistoricoSistema(sistema: number) {
    const holdName = sistema === this.holdVila ? 'Vila Velha' : 'Tecnomed';
    if (sistema === hold.tcmed) {
      this.loadingTcmed = await this.loadingCtrl.create({message: 'Baixando Histórico de Consultas....' + holdName + '....'});
      await this.loadingTcmed.present();
    } else {
      this.loadingVila = await this.loadingCtrl.create({message: 'Baixando Histórico de Consultas....' + holdName + '....'});
      await this.loadingVila.present();
    }

    this.apiAgenda.sincronizaHistorico(this.userData, sistema).subscribe(
      async resul => {
        let retorno: any;
        retorno = resul;
        // Verificar a existência de dados antes de tentar salvar
        if (retorno.length !== 0) {
          if (sistema === hold.tcmed) {
            this.loadingTcmed.dismiss();
            this.loadingTcmed = await this.loadingCtrl.create({message: 'Salvando dados da ' + holdName + ' no BD...'});
            await this.loadingTcmed.present();
          } else {
            this.loadingVila.dismiss();
            this.loadingVila = await this.loadingCtrl.create({message: 'Salvando dados da ' + holdName + ' no BD...'});
            await this.loadingVila.present();
          }
          this.saveAllHistorico(retorno, sistema);
        } else {
          if (sistema === hold.tcmed) {
            this.loadingTcmed.dismiss();
          } else {
            this.loadingVila.dismiss();
          }
          await this.helper.toast('Sucesso', 'Sucesso! Não há dados para Baixar em ' +
          holdName , 'success', 'bottom', 3000);
        }
      },
      async () => {
        if (sistema === hold.tcmed) {
          this.loadingTcmed.dismiss();
        } else {
          this.loadingVila.dismiss();
        }
        await this.helper.toast('Falha', 'Erro na conexão entre API e Servidor', 'danger', 'bottom', 3000);
      }
    );
  }

  /**
   * Executa todos os métodos para salvar dados em cada tabela
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   * @param array any dados que vem da API em JSON
   * @param sistema number
   */
  async saveAllHistorico(array: any, sistema: number) {
    const apiConsultas: any = array;

    if (apiConsultas) {
      this.saveAllConsultas(apiConsultas, sistema);
    }
  }

  /**
   * Salva os dados de consultas na tabela consultas
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   * @param consultas any
   * @param sistema number
   */
  async saveAllConsultas(consultas: any, sistema: number) {
    let i = 0;
    await consultas.forEach(async (item: Consulta) => {
      item.hold_id = sistema;
      await this.entConsulta.save(item);
      i ++;
      if (i === consultas.length) {
        if (sistema === hold.tcmed) {
          this.loadingTcmed.dismiss();
          await this.helper.toast('Sucesso', 'Tecnomed Sincronizado com sucesso!', 'success', 'bottom', 3000);
        } else {
          this.loadingVila.dismiss();
          this.leConsultasOldParaExclusao();
        }
      }
    });
    // this.getAllConsultas();
  }

  /**
   * Lê consultas antigas para exclusão
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 09-09-2020
   * @version 1.0
   */
  async leConsultasOldParaExclusao() {
    const loadingOldConsultas = await this.loadingCtrl.create({message: 'Procurando histórico de consultas para exclusão...'});
    loadingOldConsultas.present();

    // Consultas anteriores à data atual menos o número de dias (Padrão -45)
    const consultaAnteriores: Consulta[] = await this.entConsulta.getByPeriod();
    const consultasEnviadas: Consulta[] = await this.entConsultaEnviar.getByPeriod();

    // Será excluída qualquer consulta anterior no array
    if (consultaAnteriores.length > 0) {
      // setTimeout(async () => { this.entConsulta.deletaConsultas(consultaAnteriores);  }, 1500);
      setTimeout(async () => { this.entConsultaEnviar.deletaConsultasEnviar(consultasEnviadas);  }, 1500);
    }
    loadingOldConsultas.dismiss();
    await this.helper.toast('Sucesso', 'Vila Velha Sincronizado com sucesso!', 'success', 'bottom', 3000);
    // Executa Dump das tabelas da Agenda -----------
    // setTimeout(() => {  this.getAllHistoricoConsultas(); }, 3000);
  }


  /**
   * Envia todas as consultas respondidas da tabela consultas_enviar
   * Busca somente status nao_enviada
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 26-08-2020
   * @version 1.0
   */
  async enviaConsultas() {

    this.enviaConsultasSistema(this.holdTcmed);
    setTimeout(async () => { await this.enviaConsultasSistema(this.holdVila); }, 5000);

  }

  /**
   * Faz o envio das consultas de acordo com a hold (sistema)
   * Busca somente status nao_enviada
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 26-08-2020
   * @version 1.0
   */
  async enviaConsultasSistema(sistema: number) {
    const holdName = sistema === this.holdVila ? 'Vila Velha' : 'Tecnomed';

    if (sistema === hold.tcmed) {
      this.loadingTcmed = await this.loadingCtrl.create({message: 'Enviando Consultas ' + holdName + '....'});
      await this.loadingTcmed.present();
    } else {
      this.loadingVila = await this.loadingCtrl.create({message: 'Enviando Consultas ' + holdName + '....'});
      await this.loadingVila.present();
    }

    // Buscar consultas enviar conforme o status, sistema e Id médico Vila e Tcmed
    const consultas: Consulta[] = await this.entConsultaEnviar.getAll('nao_enviada',
      sistema, this.userData.idMedicoVila, this.userData.idMedicoTcmed);
    if (consultas.length > 0) {
      let contaEnviadas = 0;
      // Faz o envio de cada consulta e altera o status para enviada caso servidor devolva um 'OK'
      consultas.forEach(async (item: Consulta) => {
        const idConsulta = item.id;
        this.apiAgenda.create(item, this.userData, item.hold_id).subscribe(async (result) => {
          if (result.status === 'ok') {
            item.status = 'enviada';
            item.id = idConsulta;
            await this.entConsultaEnviar.save(item);
            contaEnviadas ++;
          }
          if (consultas.length === contaEnviadas) {
            setTimeout(async () => { await this.mensagemConsultasEnviadas(contaEnviadas,
              consultas.length, sistema, holdName); }, 5000);
          }
        });
      });
    } else {
      if (sistema === hold.tcmed) {
        this.loadingTcmed.dismiss();
      } else {
        this.loadingVila.dismiss();
      }
      this.helper.toast('Sem consultas', 'Não há nenhuma consultas em ' +
      holdName + ' para enviar no momento', 'warning', 'middle', 3000);
    }
  }

  /**
   * Gera mensagem de acordo com a quantidade de consultas enviadas vs BD
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 26-08-2020
   * @version 1.0
   */
  async mensagemConsultasEnviadas(qtd: number , qtdEnviadas: number, sistema: number, holdName: string) {
    if (sistema === hold.tcmed) {
      this.loadingTcmed.dismiss();
    } else {
      this.loadingVila.dismiss();
    }

    this.helper.toast('Consultas Enviadas', 'Todas consultas ' + holdName + ' enviadas com sucesso! Enviadas '
    + qtdEnviadas + ' de ' + qtd, 'success', 'middle', 8000);
  }

  // --------------------------- Somente para Dump --------------------------------- //
  // --------------------------- Somente para Dump --------------------------------- //
  // --------------------------- Somente para Dump --------------------------------- //
  /**
   * Executa o dump de todas as tabelas em console.log
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   */
  async getAllTablesAgenda() {
    this.loadingDump = await this.loadingCtrl.create({message: 'Carregando Dumping de dados no console.log....'});
    await this.loadingDump.present();

    this.getAllBlocos();
    this.getAllBlocoItens();
    this.getAllEmpresas();
    this.getAllFuncionarios();
  }

  /**
   * Executa o dump da tabela blocos
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   */
  async getAllBlocos() {
    this.blocos = await this.entBloco.getAll();
    console.log(this.blocos);
  }

  /**
   * Executa o dump da tabela blocosItens
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   */
  async getAllBlocoItens() {
    this.blocosItens = await this.entBlocoItem.getAll();
    console.log(this.blocosItens);
  }

  /**
   * Executa o dump da tabela empresas
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   */
  async getAllEmpresas() {
    this.empresas = await this.entEmpresa.getAll();
    console.log(this.empresas);
  }

  /**
   * Executa o dump da tabela funcionarios
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 07-08-2020
   * @version 1.0
   */
  async getAllFuncionarios() {
    this.funcionarios = await this.entFuncionario.getAll();
    console.log(this.funcionarios);
    this.loadingDump.dismiss();
  }


  /**
   * Executa o dump da tabela consultas
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   */
  async getAllHistoricoConsultas() {
    const consultas = await this.entConsulta.getAll();
    console.log(consultas);
  }

  /**
   * Executa o dump da tabela Cids
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   */
  async getAllCids() {
    const cids = await this.entCid.getAll();
    console.log(cids);
  }

  home() {
    this.router.navigate(['./home']);
  }

  /**
   * Volta para a página anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  backPage() {
    this.router.navigate(['/home']);
  }
}
