import { NavController, Platform } from '@ionic/angular';
import { EntConsultaEnviarService } from './../../services/entity/ent-consulta_enviar.service';
import { Consulta } from './../../classes/consulta';
import { HelperService } from './../../services/outros/helper.service';
import { Empresa } from './../../classes/empresa';
import { EntLastLoginService } from './../../services/entity/ent-last_login.service';
import { LastLogin } from './../../classes/last-login';
import { EntFuncionarioService } from './../../services/entity/ent-funcionario.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntEmpresaService } from 'src/app/services/entity/ent-empresa.service';

@Component({
  selector: 'app-list-funcionarios',
  templateUrl: './list-funcionarios.page.html',
  styleUrls: ['./list-funcionarios.page.scss'],
})
export class ListFuncionariosPage implements OnInit {

  funcionarios: any[];
  empresa: Empresa = new Empresa();
  empresaIdSemHold: any;
  empresaId: any;
  sistema: any;
  lastLogin: LastLogin = new LastLogin();
  qtdReg: number = null;
  consulta: Consulta = new Consulta();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private entFuncionarios: EntFuncionarioService,
    private entLastLogin: EntLastLoginService,
    private entEmpresa: EntEmpresaService,
    private entConsultaEnviar: EntConsultaEnviarService,
    private helper: HelperService,
    private navCtr: NavController,
    private platform: Platform,
  ) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.backPage();
    });
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.lastLogin = await this.entLastLogin.getLastId();
    this.empresaId = parseFloat(this.route.snapshot.paramMap.get('empresa'));
    this.sistema   = parseFloat(this.empresaId.toString().substring(0, 1));
    this.empresaIdSemHold = this.helper.removeHoldFromId(this.empresaId);
    // Busca a empresa para preencher o cabeçalho
    this.empresa = await this.entEmpresa.getItem(this.empresaId, this.sistema);

    await this.loadAllFuncs();
  }

  /**
   * Carregar todos os funcionários
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   */
  async loadAllFuncs() {
    // Busca Todos os funcionarios de acordo com idEmpresa e Hold
    this.funcionarios = await this.entFuncionarios.getByEmpresa(this.empresaIdSemHold, this.sistema);
    // Verifica se funcionário já foi atendido
    this.funcionarios.forEach(async item => {
      const funcId = this.helper.removeHoldFromId(item.id);
      this.consulta = await this.entConsultaEnviar.getItemByFunc(funcId, item.hold);
      if (this.consulta.id !== undefined) {
        item.consultaId     = this.consulta.id;
        item.consultaStatus = this.consulta.status;
        item.descri         = this.consulta.status === 'nao_enviada' ?
        '(Atendido - Não Enviada)' : '(Atendido e Enviada)';
        item.class = this.consulta.status === 'nao_enviada' ?
        'data-row-atendido' : 'data-row-atendido-enviada';
      } else {
        item.consultaId = null;
      }
    });

    this.qtdReg = this.funcionarios.length;
  }

  /**
   * Busca o Bloco conforme Data, médico e sistema(Hold)
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   * @param $event any
   */
  async searchFunc($event) {
    const value = $event.target.value;
    if (value && value.length >= 3) {
      // Busca com o método filter o valor digitado
      this.funcionarios = await this.entFuncionarios.searchByNameFunc(this.empresaIdSemHold, this.sistema, value);
      // Verifica se funcionário foi atendido
      this.funcionarios.forEach(async item => {
        const funcId = this.helper.removeHoldFromId(item.id);
        this.consulta = await this.entConsultaEnviar.getItemByFunc(funcId, item.hold);
        if (this.consulta.id !== undefined) {
          item.consultaId     = this.consulta.id;
          item.consultaStatus = this.consulta.status;
          item.descri         = this.consulta.status === 'nao_enviada' ?
          '(Atendido - Não Enviada)' : '(Atendido e Enviada)';
          item.class = this.consulta.status === 'nao_enviada' ?
          'data-row-atendido' : 'data-row-atendido-enviada';
        } else {
          item.consultaId = null;
        }
      });
      this.qtdReg = this.funcionarios.length;
    } else {
      this.loadAllFuncs();
    }
  }

  /**
   * Limpa o campo de pesquisa
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   */
  doSearchClear() {
    this.funcionarios = [];
  }

  async sendedMessage() {
    await this.helper.toast('Atenção!', 'Não é possível alterar uma consulta enviada,' +
    ' entre em contato com o administrativo', 'warning', 'middle', 5000);
  }

  /**
   * Volta para a página anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  backPage() {
    this.navCtr.back();
  }

}
