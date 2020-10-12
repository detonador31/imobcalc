import { EntLastLoginService } from './../../services/entity/ent-last_login.service';
import { LastLogin } from './../../classes/last-login';
import { ParametrosService } from './../../services/outros/parametros.service';
import { EntConsultaEnviarService } from './../../services/entity/ent-consulta_enviar.service';
import { HelperService } from './../../services/outros/helper.service';
import { Component, OnInit } from '@angular/core';
/* import { AlertController } from '@ionic/angular'; */
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-consultas-enviadas',
  templateUrl: './list-consultas-enviadas.page.html',
  styleUrls: ['./list-consultas-enviadas.page.scss'],
})
export class ListConsultasEnviadasPage implements OnInit {

  consultas: any[];
  contaConsultas = 0;
  lastLogin: LastLogin = new LastLogin();

  constructor(
    public entConsultaEnviar: EntConsultaEnviarService,
    private entLastLogin: EntLastLoginService,
    public router: Router,
    public helper: HelperService,
    private parametros: ParametrosService,
  ) { }

  async ngOnInit() {
    this.lastLogin = await this.entLastLogin.getLastId();
    this.getAllConsultasEnviar(this.lastLogin);
  }

  async getAllConsultasEnviar(lastLogin: LastLogin) {
    const status = 'enviada';
    this.consultas = await this.entConsultaEnviar.getAll(status, 0,
      lastLogin.id_medico_vila, lastLogin.id_medico_tcmed);
    this.consultas.forEach(item => {
      item.consulta_resul_exa = this.parametros.parametroConclusao(item.consulta_resul_exa, 'exa');
    });
    this.contaConsultas = this.consultas.length;
  }

  /**
   * Busca o Bloco conforme Data, médico e sistema(Hold)
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   * @param $event any
   */
  async searchConsulta($event) {
    const value = $event.target.value;
    const status = 'enviada';
    if (value && value.length >= 3) {
      // Busca com o método filter o valor digitado
      this.consultas = await this.entConsultaEnviar.searchByNameFunc(value, status,
        this.lastLogin.id_medico_vila, this.lastLogin.id_medico_tcmed);
      // Verifica se funcionário foi atendido
      this.consultas.forEach(item => {
        item.consulta_resul_exa = this.parametros.parametroConclusao(item.consulta_resul_exa, 'exa');
      });
      this.contaConsultas = this.consultas.length;
    } else {
      this.getAllConsultasEnviar(this.lastLogin);
    }
  }

  /**
   * Limpa o campo de pesquisa
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 24-08-2020
   * @version 1.0
   */
  doSearchClear() {
    this.consultas = [];
  }

  async mensagem() {
    await this.helper.toast('Atenção!', 'Não é possível editar ou salvar uma consulta já enviada!', 'warning', 'middle', 3000);
  }

}
