import { ParametrosService } from './../../services/outros/parametros.service';
import { DatePipe } from '@angular/common';
import { EntCidService } from './../../services/entity/ent-cid.service';
import { hold } from './../../../environments/environment';
import { EntLastLoginService } from './../../services/entity/ent-last_login.service';
import { LastLogin } from './../../classes/last-login';
import { Empresa } from './../../classes/empresa';
import { EntEmpresaService } from './../../services/entity/ent-empresa.service';
import { EntFuncionarioService } from './../../services/entity/ent-funcionario.service';
import { Funcionario } from './../../classes/funcionario';
import { EntConsultaEnviarService } from './../../services/entity/ent-consulta_enviar.service';
import { EntConsultaService } from './../../services/entity/ent-consulta.service';
import { ConsultaOriginal } from './../../classes/consulta_original';
import { CidDescri, Cid } from './../../classes/cid';
import { CidModalComponent } from './../../component/cid-modal/cid-modal.component';
import { ModalController, AlertController, NavController, Platform, LoadingController } from '@ionic/angular';
import { HelperService } from './../../services/outros/helper.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Consulta, ConsultaArray, ConsultaAnterior } from './../../classes/consulta';
import { QuestionarioService } from './../../services/outros/questionario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-consulta',
  templateUrl: './form-consulta.page.html',
  styleUrls: ['./form-consulta.page.scss'],
})

export class FormConsultaPage implements OnInit {
  public saveVerify = false;
  title = 'Nova Ficha Clínica';
  timer: any = null;
  imc: any = '';
  imcClassificacao: any = '';
  nomeMedico = '';
  funcIdade: number = null;
  dataResul: any;
  consultaDate: any = null;
  interrogatorio1: any;
  interrogatorio2: any;
  consultDoenca: any;
  consultFisico: any;
  consultMedidas: any;
  consultCid: any;
  loading: any;
  public entrada = 0;
  funcionario: Funcionario = new Funcionario();
  consulta: Consulta = new Consulta();
  consultaOriginal: ConsultaOriginal = new ConsultaOriginal();
  lastLogin: LastLogin = new LastLogin();

  consultaObj: ConsultaArray = new ConsultaArray();
  consultaFields = this.consultaObj.consultaJson;

  cidDescri: CidDescri = new CidDescri();
  confirmedExit = false;
  tab = 0;

  consultaAnteriorData: ConsultaAnterior = new ConsultaAnterior();

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private quests: QuestionarioService,
    private helper: HelperService,
    private modalCtrl: ModalController,
    private alertCrt: AlertController,
    private platform: Platform,
    private navCtr: NavController,
    private loadingCtrl: LoadingController,
    private entConsultaEnviar: EntConsultaEnviarService,
    private entConsulta: EntConsultaService,
    private entFuncionario: EntFuncionarioService,
    private entEmpresa: EntEmpresaService,
    private entLastLogin: EntLastLoginService,
    private entCid: EntCidService,
    private datepipe: DatePipe,
    private parametros: ParametrosService,
    private renderer: Renderer2
  ) {
    this.platform.backButton.subscribeWithPriority(10000, () => {
      this.confirmaSaida();
    });
  }

  async ionViewWillEnter() {
    this.lastLogin = await this.entLastLogin.getLastId();
    let funcId: any = null;
    // Arrays usados para a sequencia de campos do Form
    this.helper.deleteLocalStorage('cidModal');
    this.interrogatorio1 = this.quests.interrogatorio1;
    this.interrogatorio2 = this.quests.interrogatorio2;
    this.consultDoenca   = this.quests.consultDoenca;
    this.consultFisico   = this.quests.consultFisico;
    this.consultMedidas  = this.quests.consultMedidas;
    this.consultCid      = this.quests.consultCid;

    this.loading = await this.loadingCtrl.create({message: 'Carregando Ficha Clínica'});
    await this.loading.present();
    let sistema: number;

    // Gera Nova Consulta ou abre consulta salva para edição
    const consultaId  = parseFloat(this.route.snapshot.paramMap.get('consultaId'));
    if (consultaId) {
      // Busca consulta existente somente para edição
      this.consulta = await this.entConsultaEnviar.getItem(consultaId);
      // Carrega campos com valores padrão caso não tenha consulta anterior
      await this.fieldsDefaultContent();
      this.title = 'Editar Ficha Clínica';
      this.consultaDate = this.datepipe.transform(this.consulta.consulta_data, 'dd/MM/yyyy h:mm');
      // Carrega as descrições de Cid caso exista
      this.cidDescri = await this.carregaCidDescri(this.cidDescri);
    } else {
      funcId  = parseFloat(this.route.snapshot.paramMap.get('funcionario'));
      sistema = parseFloat(funcId.toString().substring(0, 1));
      const funcIdSemHold = this.helper.removeHoldFromId(funcId);
      // Busca consulta anterior
      this.consulta = await this.entConsulta.getItemByFunc(funcIdSemHold, sistema);
      // Carrega campos com valores padrão caso não tenha consulta anterior
      await this.fieldsDefaultContent();
      // Carrega as descrições de Cid caso exista
      this.cidDescri = await this.carregaCidDescri(this.cidDescri);
      if (this.consulta.id_funcionario !== undefined) {
        await this.camposConsultaAnterior();
      } else {
        this.loading.dismiss();
        await this.helper.toast('Atenção!', 'Histórico não sincronizado,' +
        ' tente sincronizar o histórico mais uma vez antes de atender o funcionário.', 'danger', 'middle', 6000);
        this.backPage();
      }
      // Limpa campos caso seja uma nova consulta
      this.camposNovaConsulta();
    }

    // Busca os dados do funcionário para uma nova consulta caso a anterior não exista
/*  if (isUndefined(this.consulta.id_funcionario)) {
      this.consulta = await this.getFuncData(funcId, this.consulta);
    } */

    // Nome do médico que vai preencher a consulta
    this.nomeMedico = this.lastLogin.nome_usuario;
    // Calcula a idade do funcionário
    this.funcIdade       = this.helper.calculaIdade(this.consulta.func_dt_nascimento.toString(), 'br');
    // Carrega os valores dos campos preenchidos em um array
    setTimeout(async () => {await this.fillConsultaOriginal(this.consulta); }, 1000) ;
  }

  ngOnInit() {
  }

  /**
   * Carrega Descrição dos Cids com antecedência para não dar erro no autocomp
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-08-2020
   * @version 1.0
   * @param cidsDescri CidDescri
   */
  async carregaCidDescri(cidsDescri: CidDescri) {
    let i = 1;
    this.consultCid.forEach(async key => {
      const cid: Cid = await this.entCid.getItemByNumeroCid(this.consulta[key.field]);
      if (cid.id !== undefined) {
        const descriField = 'descri_' + i;
        cidsDescri[descriField] = cid.descricao;
      }
      i++;
    });
    return cidsDescri;
  }


  /**
   * Carrega campos de consulta anterior para exibir como informação na Ficha
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-08-2020
   * @version 1.0
   */
  async camposConsultaAnterior() {
    // Dados consulta Anterior
    this.consultaAnteriorData.dtConsulta = this.consulta.created_at;
    this.consultaAnteriorData.tipoConsulta = this.consulta.consulta_tipo;
    this.consultaAnteriorData.conclusao = this.parametros.parametroConclusao(this.consulta.consulta_resul_exa, 'exa');
    this.consultaAnteriorData.conclusao_med = this.parametros.parametroConclusao(this.consulta.consulta_resul_med, 'exa');
    this.consultaAnteriorData.diagnostico = this.consulta.consulta_cid_1;
    // Busca o nome do condomínio, caso seja outro não incluído será adicionado o ID
    const empresaId = this.helper.holdAndId(this.consulta.id_empresa, this.consulta.hold_id);
    const empresa = await this.entEmpresa.getItem(empresaId, this.consulta.hold_id);
    this.consultaAnteriorData.empresa = empresa.id !== undefined ? empresa.razao_social :
    this.consulta.id_empresa + ' - outro condomínio';

    this.consultaAnteriorData.medico =  this.consulta.id_medico.toString();
  }

  /**
   * Apaga os campos carregados com dados da consulta anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 31-08-2020
   * @version 1.0
   */
  camposNovaConsulta() {
    this.consulta.consulta_data = this.helper.dateTime();
    this.consultaDate = this.datepipe.transform(this.consulta.consulta_data, 'dd/MM/yyyy h:mm');
    this.consulta.consulta_resul_enc = undefined;
    this.consulta.consulta_resul_exa = undefined;
    this.consulta.consulta_resul_med = undefined;
    this.consulta.consulta_resul_ocu = undefined;
    this.consulta.consulta_cid_obs = 'Sem Observações';
    this.consulta.consulta_obs_aso = 'Nenhuma';
    this.consulta.consulta_tipo = 'PER';
    this.consulta.consulta_pre_max = null;
    this.consulta.consulta_pre_min = null;
    this.consulta.consulta_card = null;
    this.consulta.consulta_resp = null;

    this.consulta.consulta_peso = !this.consulta.consulta_peso ||
    this.consulta.consulta_peso === '0' ? undefined : this.consulta.consulta_peso ;

    this.consulta.id_medico = this.consulta.hold_id === hold.vila ? this.lastLogin.id_medico_vila :
    this.lastLogin.id_medico_tcmed;
  }

  /**
   * Busca os dados do funcionário caso não exista consulta anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 20-08-2020
   * @version 1.0
   * @param consulta Consulta
   */
  async getFuncData(id: number, consulta: Consulta) {
    consulta = await this.entFuncionario.getFuncForConsulta(id, consulta);
    const sistema = parseFloat(consulta.hold_nome);
    const empId = this.helper.holdAndId(consulta.id_empresa, sistema);
    const empresa: Empresa = await this.entEmpresa.getItem(empId, sistema);
    consulta.emp_nome = empresa.razao_social;
    if (sistema === hold.vila) {
      consulta.id_medico = this.lastLogin.id_medico_vila;
    } else {
      consulta.id_medico = this.lastLogin.id_medico_tcmed;
    }
    return consulta;
  }

  /**
   * preenche um array com os valores dos campos da consulta antes de quais quer alterações
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param consulta Consulta
   */
  async fillConsultaOriginal(consulta: Consulta) {
    Object.keys(this.consultaFields).forEach((key) => {
        this.consultaOriginal[key] = consulta[key];
    });
    this.loading.dismiss();
  }

  /**
   * preenche um array com os valores dos campos da consulta antes de quais quer alterações
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param consultaOriginal Consulta
   * @param consulta Consulta
   */
  async changedFields(consultaOriginal: Consulta, consulta: Consulta) {
    let count = 0;
    Object.keys(this.consultaFields).forEach((key) => {
      if (consultaOriginal[key] !== consulta[key] ) {
        count++;
      }
    });
    return count;
  }

  /**
   * Alerta em caso de alteração da consulta e click em voltar no app ou no dispositivo
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  async confirmaSaida() {
    const changedFields = await this.changedFields(this.consultaOriginal, this.consulta);
    const alert = await this.alertCrt.create({
      header: 'Remover?',
      message:  `A Ficha de ${this.consulta.func_nome} será perdida, deseja continuar?`,
      buttons: [
        { text: 'não', role: 'cancel'},
        { text: 'sim', handler: () => {
          this.backPage();
          }
        },
      ]
    });
    if (!this.saveVerify && changedFields > 0) {
      alert.present();
    } else {
      this.backPage();
    }
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
   * Altera o Sexo do funcionário na consulta se necessário
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  alteraSexo() {
    if (this.consulta.func_sexo === 'FEMININO') {
      this.consulta.func_sexo = 'MASCULINO';
    } else {
      this.consulta.func_sexo = 'FEMININO';
    }
  }

  /**
   * Alerta para os campos de interrogatório
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param $event evento
   * @param field any
   * @param obsPreenche string
   */
  async checkIntResposta($event, field: any, obsPreenche: string) {
    const fieldObs = this.helper.removeUltimosCaracteres(field, 1);
    if ($event.target.value === 'sim' && !this.consulta[fieldObs] ) {
      if (obsPreenche === 'sim') {
        await this.helper.toast('Atenção!', 'Não esqueça de preencher a observação deste campo.', 'warning', 'middle', 3000);
      }
    } else {
      this.consulta[fieldObs] = null;
      this.consulta[field] = 'nao';
    }
  }

  /**
   * Seta os valores 'sim' ou 'nao' nos campos de interrogatório
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param $event evento
   * @param field any
   */
  checkObs($event, field: any) {
    if ($event.target.value) {
      this.consulta[field] = 'sim';
    } else {
      this.consulta[field] = 'nao';
    }

/*     console.log($event.keyCode);
    if ($event.keyCode === 13) {
      this.renderer.selectRootElement('#' + focus).focus();
    } */
  }

  /**
   * Preenche os campos com valores padrões caso não tenha consulta anterior
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   */
  async fieldsDefaultContent() {
    this.consulta.consulta_queixa = this.consulta.consulta_queixa === undefined ||
    !this.consulta.consulta_queixa ? 'SEM QUEIXA' : this.consulta.consulta_queixa;

    this.interrogatorio1.forEach(element => {
      this.consulta[element.quest] = this.consulta[element.quest] === undefined ||
      !this.consulta[element.quest] ? 'nao' : this.consulta[element.quest];
    });

    this.interrogatorio2.forEach(element => {
      this.consulta[element.quest] = this.consulta[element.quest] === undefined ||
      !this.consulta[element.quest] ? 'nao' : this.consulta[element.quest];
    });

    this.consulta.consulta_ant_ocup = this.consulta.consulta_ant_ocup === undefined ||
    !this.consulta.consulta_ant_ocup ? 'NDN' : this.consulta.consulta_ant_ocup;
    this.consulta.consulta_ant_pess = this.consulta.consulta_ant_pess === undefined ||
    !this.consulta.consulta_ant_pess ? 'NDN' : this.consulta.consulta_ant_pess;

    let count = 0;
    this.consultDoenca.forEach(item => {
      this.consulta[item.fieldPai] = this.consulta[item.fieldPai] === undefined ||
      !this.consulta[item.fieldPai] ? false : true;

      this.consulta[item.fieldMae] = this.consulta[item.fieldMae] === undefined ||
      !this.consulta[item.fieldMae] ? false : true;
      if (this.consulta[item.fieldPai] || this.consulta[item.fieldMae] ) {
        count ++;
      }
    });
    if (count === 0) {
      this.consulta.consulta_doenca_8 = true;
    } else {
      this.consulta.consulta_doenca_8 = false;
    }
    this.consultFisico.forEach(element => {
      this.consulta[element.field] = this.consulta[element.field] === undefined ||
      !this.consulta[element.field] ? 'NDN' : this.consulta[element.field];
    });
  }

  /**
   * Em Doenças Familiares demarca todos os campo caso nenhuma seja marcado
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param $event evento
   */
  setNenhuma(event: any) {
    if (event === 'ND') {
      this.consultDoenca.forEach(item => {
        this.consulta[item.fieldPai] = false;
        this.consulta[item.fieldMae] = false;
      });
      this.consulta.consulta_doenca_out = null;
    }
  }

  /**
   * Em doenças familiares desmarca o campo nenhuma caso seja marcado qualquer outro checkbox
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param $event evento
   * @param field any
   */
  unsetNenhuma(event: any) {
    if (event === '1' || this.consulta.consulta_doenca_out) {
      this.consulta.consulta_doenca_8 = false;
    }
  }

  /**
   * Abre Modal de Cid após digitar algo pra busca
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param field string
   * @param fieldDescri string
   * @param $event evento
   */
  async openCidModal(field: string, fieldDescri: string, $event, tipo: string) {
    const text = $event.target.value ? $event.target.value : '';

    const modal = await this.modalCtrl.create({
      component: CidModalComponent,
      componentProps: {
        fieldName : field,
        input     : text,
        tipoInp   : tipo
      },
      cssClass: 'cid-modal-css'
    });

    if (this.timer || text.length >= 3) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.dataResul = await this.helper.getLocaStoragetoObject('cidModal');
    if (((text && text.length >= 3 && tipo === 'descri'
    && (!this.consulta[field] || this.consulta[field] === undefined))

    || (text && text.length >= 2 && tipo === 'numero'
    && (!this.cidDescri[fieldDescri] || this.cidDescri[fieldDescri] === undefined)))
    ) {

      this.timer = setTimeout(async () => {
        await modal.present();
        const data = await modal.onWillDismiss();
        if (data) {
          this.dataResul = data.data;
          if (this.dataResul) {
            this.consulta[field] = this.dataResul.numero;
            this.cidDescri[fieldDescri] = this.dataResul.descricao;
          } else {
            this.clearCidFields(field, fieldDescri);
            $event.target.value = null;
          }
        }
      }, 1500);
    }

    if (this.dataResul) {
      clearTimeout(this.timer);
      this.timer = null;
      this.dataResul = null;
      this.helper.deleteLocalStorage('cidModal');
    }
  }

  /**
   * Apaga os campos de Cid
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param field string
   * @param fieldDescri string
   */
  clearCidFields(field: string, fieldDescri: string) {
    this.consulta[field]        = null;
    this.cidDescri[fieldDescri] = null;
  }

  /**
   * Apaga qualquer campo textArea
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param field string
   */
  clearAnyFields(field: string) {
    this.consulta[field] = '';
  }

  /**
   * Chamado pela view validações antes de salvar
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param consulta Consulta
   */
  async save(consulta: Consulta) {
    this.saveVerify = true;
    let valida = true;
    valida = await this.validaCampos(consulta);

    if (valida) {
      consulta = await this.trataData(consulta);
      this.saveInBd(consulta);
    }
  }

  /**
   * Salva no Bd após validações e tratamento de dados
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param $event evento
   * @param field any
   */
  async saveInBd(consulta: Consulta) {
    await this.entConsultaEnviar.save(consulta);
    await this.helper.toast('Sucesso', 'Consulta Salva com sucesso!', 'success', 'middle', 3000);
    this.backPage();
  }

  /**
   * Trata dados antes de salvar
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param consulta Consulta
   */
  async trataData(consulta: Consulta) {
    this.consultDoenca.forEach(item => {
      consulta[item.fieldPai] = consulta[item.fieldPai] === undefined ||
      !consulta[item.fieldPai] ? null : 'p';
      consulta[item.fieldMae] = consulta[item.fieldPai] === undefined ||
      !consulta[item.fieldMae] ? null : 'm';
      consulta.consulta_doenca_8 = consulta.consulta_doenca_8 === undefined ||
      !consulta.consulta_doenca_8 ? null : 'nd';
    });
    consulta.status = 'nao_enviada';
    // Converte data para string reconhecida pelo Sqlite para consultas em periodo
    consulta.consulta_data = this.datepipe.transform(this.consulta.consulta_data, 'yyyy-MM-dd h:mm');

    return consulta;
  }

  /**
   * Valida os campos necessários antes de salvar
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param consulta Consulta
   */
  async validaCampos(consulta: Consulta) {
    let valida = true;
    let mensagem: string = null;
    // Os campos de Interrogatório 1
    await this.interrogatorio1.forEach(async key => {
      if (consulta[key.quest] === 'sim' && !consulta[key.questObs]
      && key.obsPreenche === 'sim') {
        valida =  false;
        mensagem = `Preencha o campo Obs da questão ${key.label}, Interrogatório 1`;
      }
    });
     // Campos de Interrogatório 2
    await this.interrogatorio2.forEach(async key => {
      if (consulta[key.quest] === 'sim' && !consulta[key.questObs]
      && key.obsPreenche === 'sim') {
        valida =  false;
        mensagem = `Preencha o campo Obs da questão ${key.label}, Interrogatório 2`;
      }
    });
    // Antecedentes
    if (consulta.func_sexo === 'FEMININO' && !consulta.consulta_ant_dt && !consulta.consulta_ant_gine) {
      valida =  false;
      mensagem = `Preencha data da última menstruação ou Antecedentes Genicológicos`;
    }

    // Campos de Medições
    await this.consultMedidas.forEach(async key => {
      if (!consulta[key.field]) {
        valida =  false;
        mensagem = `Preencha o campo ${key.label} em Medições`;
      }
    });
    if (!consulta.consulta_altu || !this.imc) {
      valida =  false;
      mensagem = `Preencha o campo altura em Medições`;
    }
    if (!consulta.consulta_peso || !this.imc) {
      valida =  false;
      mensagem = `Preencha o campo Peso em Medições`;
    }
    if (!consulta.consulta_pre_max) {
      valida =  false;
      mensagem = `Preencha o campo Pressão Maxima em Medições`;
    }
    if (!consulta.consulta_pre_min) {
      valida =  false;
      mensagem = `Preencha o campo Pressão Mínima em Medições`;
    }

    // Valida Conclusão do exame
    if (!consulta.consulta_resul_med) {
      valida =  false;
      mensagem = `Marque uma Conclusão médica`;
    }
    if (!consulta.consulta_resul_ocu) {
      valida =  false;
      mensagem = `Marque a Conclusão Ocupacional`;
    }
    if (!consulta.consulta_resul_exa) {
      valida =  false;
      mensagem = `Marque o Resultado do Exame`;
    }

    if (consulta.consulta_resul_exa === '2' && !consulta.consulta_resul_enc) {
      valida =  false;
      mensagem = `Marque uma Conduta Medica (Encaminhamento)`;
    }
    if (mensagem) {
      await this.helper.toast('Preenchimento', mensagem, 'danger', 'middle', 3000);
    }

    return valida;
  }

  /**
   * Valida Campos IMC antes de fazer o calculo
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param altura: string
   * @param peso: string
   */
  async validaCamposIMC(altura: string, peso: string) {

    const pesoNum = this.helper.formataFloat(peso);
    const alturaNum = this.helper.formataFloat(altura);

    if (!altura || altura.length < 4 || !peso || peso.length < 5 || peso === '0,00' || pesoNum < 20) {
      this.imc = null;
      this.imcClassificacao = null;
      return;
    }


    if (pesoNum < 20 && pesoNum !== 0) {
      await this.helper.toast('Preenchimento', 'Peso incorreto!', 'danger', 'middle', 3000);
      this.consulta.consulta_peso = null;
      return;
    }

    if (2.8 < alturaNum  || alturaNum < 1.0 && alturaNum !== 0) {
      await this.helper.toast('Preenchimento', 'Altura incorreta!', 'danger', 'middle', 3000);
      this.consulta.consulta_altu = null;
      return;
    }

    await this.calculaIMC(pesoNum, alturaNum);
  }

  /**
   * Calcula o IMC e retorna IMC + Descrição
   * author Silvio Watakabe <silvio@tcmed.com.br>
   * @since 19-08-2020
   * @version 1.0
   * @param peso: number
   * @param altura: number
   */
  async calculaIMC(peso: number, altura: number) {
    const icmNum = Math.round ((peso / (altura * altura)) * 100) / 100;
    let desc = '';
    switch (true) {
        case (50 <= icmNum):
            desc = 'Super obesidade';
            break;
        case (40 <= icmNum):
            desc = 'Obesidade Mórbida';
            break;
        case (35 <= icmNum):
            desc = 'Obesidade severa';
            break;
        case (30 <= icmNum):
            desc = 'Obesidade moderada';
            break;
        case (25 <= icmNum):
            desc = 'Sobrepeso';
            break;
        case (20 <= icmNum):
            desc = 'Peso ideal';
            break;
        default:
            desc = 'Magro(a)';
    }
    this.imc = icmNum;
    this.imcClassificacao = desc;
  }

/*   pressionado($event, fieldId) {
    const element = this.renderer.selectRootElement('#' + fieldId);
    if ($event.keyCode === 9) {
      this.renderer.selectRootElement(element).focus();
    }
  } */

}
