import { CheckoutModalComponent } from './../../component/checkout-modal/checkout-modal.component';
import { DatePipe } from '@angular/common';
import { BlocoItem } from './../../classes/bloco_item';
import { EntFuncionarioService } from './../../services/entity/ent-funcionario.service';
import { NavController, Platform, AlertController, ModalController } from '@ionic/angular';
import { EntConsultaEnviarService } from './../../services/entity/ent-consulta_enviar.service';
import { hold } from './../../../environments/environment';
import { EntLastLoginService } from './../../services/entity/ent-last_login.service';
import { Bloco } from './../../classes/bloco';
import { HelperService } from './../../services/outros/helper.service';
import { EntEmpresaService } from './../../services/entity/ent-empresa.service';
import { EntBlocoItemService } from './../../services/entity/ent-bloco_item.service';
import { EntBlocoService } from './../../services/entity/ent-bloco.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LastLogin } from 'src/app/classes/last-login';

@Component({
  selector: 'app-list-bloco-item',
  templateUrl: './list-bloco-item.page.html',
  styleUrls: ['./list-bloco-item.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListBlocoItemPage implements OnInit {
  // tslint:disable: variable-name
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
    private navCtr: NavController,
    private route: ActivatedRoute,
    private entBloco: EntBlocoService,
    private entBlocoItem: EntBlocoItemService,
    private entLastLogin: EntLastLoginService,
    private entConsultaEnviar: EntConsultaEnviarService,
    private entFuncionario: EntFuncionarioService,
    private empresa: EntEmpresaService,
    public helper: HelperService,
    private platform: Platform,
    private datepipe: DatePipe,
    private alertCrt: AlertController,
    private modalCtrl: ModalController
    ) {
      this.platform.backButton.subscribeWithPriority(10000, () => {
        this.backPage();
      });
    }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    this.blocoItens = [];
    this.blocoItensTcmed = [];
    this.lastLogin = await this.entLastLogin.getLastId();
    // Pega o parâmetro date clicado
    const blocoDate: number =  parseFloat(this.route.snapshot.paramMap.get('date'));
    const date: Date = new Date(blocoDate);
    // Busca os Blocos do médico com Id do médico Vila e Hold Vila
    await this.getBloco(date, this.lastLogin.id_medico_vila, this.holdVila);
    // Busca os Blocos do médico com Id do médico Tcmed e Hold Tcmed
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
    // junta os blocoItens vila e tcmed caso coincidir existir ambos na mesma data
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
        if (empresa.id !== undefined) {
          this.blocoSemEmp ++;
          this.blocoItens.splice(index, 1);
        } else {
          item.empresaNome   = empresa.razao_social;
          item.empresaCodigo = empresaId;
          const atendidas = await this.entConsultaEnviar.getItensByEmp(item.empresa_id, holdEmp);
          item.atendidas = atendidas.length;
          const empresaQtdFunc = await this.entFuncionario.getByEmpresa(item.empresa_id, holdEmp);
          item.qtd_fun_item = empresaQtdFunc.length;
        }
      }
      index ++ ;
    });
    this.qtdReg = this.blocoItens.length;
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

  /**
   * Faz checkIn no condomínio
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  async checkIn(blocoItem: any, listar: boolean) {
    const semCheckOut = await this.checkInSemCheckOut(this.blocoItens);
    if (!blocoItem.check_in && blocoItem.empresaNome !== undefined && !semCheckOut) {
      const alert = await this.alertCrt.create({
        header: 'Check-IN?',
        message:  `Deseja Fazer Check-IN no ` + blocoItem.empresaNome,
        buttons: [
          { text: 'não', handler: () => {
            }
          },
          { text: 'sim', handler: async () => {
            const dataHora = this.helper.dateTime();
            blocoItem.check_in = this.datepipe.transform(dataHora, 'dd/MM/yyyy hh:mm');
            delete blocoItem.nomeEmpresa;
            await this.entBlocoItem.save(blocoItem);
            this.router.navigate(['/list-funcionarios/list', blocoItem.empresaCodigo]);
            }
          },
        ]
      });
      alert.present();
    } else {
      if (semCheckOut && !listar) {
        await this.helper.toast('Atenção', 'Check-Out Pendente na lista, faça o Check-Out prosseguir com novo Check-In',
        'danger', 'middle', 3000);
      } else {
        if (blocoItem.empresaNome === undefined) {
          await this.helper.toast('Atenção', 'BlocoItem de empresa Inativada!', 'warning', 'middle', 3000);
        } else {
          this.router.navigate(['/list-funcionarios/list', blocoItem.empresaCodigo]);
        }
      }
    }
  }

  /**
   * Faz checkIn no condomínio
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  async checkOut(blocoItem: any) {
    if (blocoItem.check_in && !blocoItem.obs_check) {
      const alert = await this.alertCrt.create({
        header: 'Check-OUT?',
        message:  `Deseja Fazer Check-OUT no ` + blocoItem.empresaNome,
        buttons: [
          { text: 'não', handler: () => {
            }
          },
          { text: 'sim', handler: async () => {
            if (blocoItem.qtd_fun_item === blocoItem.atendidas) {
              const dataHora = this.helper.dateTime();
              blocoItem.check_out = this.datepipe.transform(dataHora, 'dd/MM/yyyy hh:mm');
              delete blocoItem.nomeEmpresa;
              await this.entBlocoItem.save(blocoItem);
            } else {
              this.openObsModal(blocoItem.id, blocoItem.nomeEmpresa);
            }
            }
          },
        ]
      });
      alert.present();
    } else {
        if (!blocoItem.check_in) {
          await this.helper.toast('Atenção', 'Condomínio não atendido! Faça o Check-in.', 'warning', 'middle', 3000);
        }
        if (blocoItem.obs_check) {
          this.openObsModal(blocoItem.id, blocoItem.nomeEmpresa);
        }
    }
  }

  async checkInSemCheckOut(blocoItens: any) {
    let semCheckOut = false;
    blocoItens.forEach(item => {
      if (item.check_in && !item.check_out) {
        semCheckOut = true;
      }
    });
    return semCheckOut;
  }

  /**
   * Abre Modal de Obs no checkOut caso todos os funcionários não sejam atendidos
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param bItemId number
   */
  async openObsModal(bItemId: number, empNome: string) {
    const modal = await this.modalCtrl.create({
      component: CheckoutModalComponent,
      componentProps: {
        blocoItemId : bItemId,
        empresaNome: empNome
      },
      cssClass: 'checkout-modal-css'
    });
    await modal.present();
    const data = await modal.onWillDismiss();
    if (data) {
      const result = data.data;
      if (result.status === 'ok') {
        this.ionViewWillEnter();
      }
    }
  }
}
