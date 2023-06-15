import { EntConsultaEnviarService } from './../../services/entity/ent-consulta_enviar.service';
import { ModalController } from '@ionic/angular';
import { hold } from './../../../environments/environment';
import { EntLastLoginService } from './../../services/entity/ent-last_login.service';
import { Bloco } from './../../classes/bloco';
import { HelperService } from './../../services/outros/helper.service';
import { EntEmpresaService } from './../../services/entity/ent-empresa.service';
import { EntBlocoItemService } from './../../services/entity/ent-bloco_item.service';
import { EntBlocoService } from './../../services/entity/ent-bloco.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { LastLogin } from 'src/app/classes/last-login';

@Component({
  selector:    'app-list-bloco-empresas',
  templateUrl: './list-bloco-empresas.component.html',
  styleUrls:  ['./list-bloco-empresas.component.scss'],
})
export class ListBlocoEmpresasComponent implements OnInit {
  // tslint:disable: variable-name
  @Input() dateBloco: string;
  bloco: Bloco = new Bloco();
  blocoTcmed: Bloco = new Bloco();
  blocoItens: any[];
  blocoItensTcmed: any[];
  blocoTitle: any = {
    dateAgendamento: null,
    numLista: null ,
    createdBy: null
  };
  lastLogin: LastLogin = new LastLogin();
  empresas: any[];
  qtdReg = 0;
  holdVila: number = hold.vila;
  holdTcmed: number = hold.tcmed;
  blocoSemEmp = 0;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private entBloco: EntBlocoService,
    private entBlocoItem: EntBlocoItemService,
    private entLastLogin: EntLastLoginService,
    private entConsultaEnviar: EntConsultaEnviarService,
    private empresa: EntEmpresaService,
    public helper: HelperService,
    private modalCtrl: ModalController,
    ) {
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.blocoItens = [];
    this.blocoItensTcmed = [];
    this.lastLogin = await this.entLastLogin.getLastId();
    // Pega o parâmetro date clicado
    const blocoDate: number =  parseFloat(this.dateBloco);
    const date: Date = new Date(blocoDate);
    await this.getBloco(date, this.lastLogin.id_medico_vila, this.holdVila);
    await this.getBloco(date, this.lastLogin.id_medico_tcmed, this.holdTcmed);
  }

  /**
   * Busca o Bloco conforme Data, médico e sistema(Hold)
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 06-08-2020
   * @version 1.0
   * @param date Date
   * @param id_medico number
   * @param sistema number (Hold)
   */
  async getBloco(date: Date, id_medico: number, sistema: number) {
    // Se preenche o cabeçalho caso hold seja vila
    if (sistema === this.holdVila) {
      this.bloco = await this.entBloco.getItemByDate(date, id_medico, sistema);
      if (this.bloco.id !== undefined) {
        this.blocoTitle.dateAgendamento = this.helper.dateBrToUsOrUsToBr(this.bloco.agendado_em, 'us');
        this.blocoTitle.numLista        = this.bloco.referencia;
        this.blocoTitle.createdBy       = this.bloco.created_by_nome;
      }
    } else {
      this.blocoTcmed = await this.entBloco.getItemByDate(date, id_medico, sistema);
      // Se bloco vila em Branco, preenche os títulos com dados do blocoTcmed
      if (!this.blocoTitle.dateAgendamento && this.blocoTcmed.id !== undefined) {
        this.blocoTitle.dateAgendamento = this.helper.dateBrToUsOrUsToBr(this.bloco.agendado_em, 'us');
        this.blocoTitle.numLista        = this.blocoTcmed.referencia;
        this.blocoTitle.createdBy       = this.blocoTcmed.created_by_nome;
      }
    }
    // Impede que execute Busca de BlocoItens caso não exista bloco vila e nem Tcmed
    if ((this.bloco.id !== undefined && sistema === this.holdVila) ||
    (this.blocoTcmed.id !== undefined && sistema === this.holdTcmed)) {
      if (sistema === this.holdVila) {
        this.bloco.id = this.helper.removeHoldFromId(this.bloco.id);
        this.getBlocoItens(this.bloco.id, sistema);
      } else {
        this.blocoTcmed.id = this.helper.removeHoldFromId(this.blocoTcmed.id);
        this.blocoTitle.numLista =  !this.bloco.id ? this.blocoTitle.numLista :
          this.blocoTitle.numLista  + ' + ' + this.blocoTcmed.referencia ;
        this.getBlocoItens(this.blocoTcmed.id, sistema);
      }
    }
  }

  /**
   * Busca os Blocoitens somente caso exista um Bloco
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 06-08-2020
   * @version 1.0
   * @param id number
   * @param sistema number (Hold)
   */
  async getBlocoItens(id: number, sistema: number) {
    // junta os blocoItem vila e tcmed caso coincidir existir ambos na mesma data
    if (sistema === this.holdVila) {
      this.blocoItens = await this.entBlocoItem.getByBloco(id, sistema);
    } else {
      this.blocoItensTcmed = await this.entBlocoItem.getByBloco(id, sistema);
      this.blocoItensTcmed.forEach(async item => {
        this.blocoItens.push(item);
      });
    }
    // Adiciona os dados de empresa para cada BlocoItem para ser exibido na lista de condomínios
    let index  = 0;
    this.blocoItens.forEach(async item => {
      let empresa: any;
      if (item.empresa_id !== undefined && !item.empresaNome) {
        const holdEmp = item.hold === this.holdVila ? this.holdVila : this.holdTcmed;
        const empresaId = this.helper.holdAndId(item.empresa_id, holdEmp);
        empresa = await this.empresa.getItem(empresaId, holdEmp);
        if (empresa.id === undefined) {
          this.blocoSemEmp ++;
          this.blocoItens.splice(index, 1);
        } else {
          item.empresaNome   = empresa.razao_social;
          item.empresaCodigo = empresaId;
          const atendidas = await this.entConsultaEnviar.getItensByEmp(item.empresa_id, holdEmp);
          item.atendidas = atendidas.length;
        }
      }
      index ++ ;
    });
    this.qtdReg = this.blocoItens.length;
  }

  /**
   * Fecha Modal
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 06-08-2020
   * @version 1.0
   */
  fecharModal() {
    this.modalCtrl.dismiss();
  }

}
