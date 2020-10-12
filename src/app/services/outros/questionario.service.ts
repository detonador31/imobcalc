import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QuestionarioService {

constructor(
) {}

    interrogatorio1: any = [
        {
            label: 'Trabalha em outro emprego?',
            questObs  : 'consulta_p01',
            quest : 'consulta_p01s',            // sim | não
            obsPreenche : 'sim',
            focus: 'consulta_p02'
        },
        {
            label: 'Tem alguma deficiência? (física, visual, auditiva, mental ou mista)',
            questObs  : 'consulta_p02',
            quest : 'consulta_p02s',            // sim | não
            obsPreenche : 'sim',
            focus: 'consulta_p03'
        },
        {
            label: 'Bebe?',
            questObs  : 'consulta_p03',
            quest : 'consulta_p03s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p04'
        },
        {
            label: 'Fuma?',
            questObs  : 'consulta_p04',
            quest : 'consulta_p04s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p05'
        },
        {
            label: 'Pratica Esporte?',
            questObs  : 'consulta_p05',
            quest : 'consulta_p05s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p06'
        },
        {
            label: 'Está Fazendo Algum Tratamento de Saúde?',
            questObs  : 'consulta_p06',
            quest : 'consulta_p06s',            // sim | não
            obsPreenche : 'sim',
            focus: 'consulta_p07'
        },
        {
            label: 'Toma Algum Remédio?',
            questObs  : 'consulta_p07',
            quest : 'consulta_p07s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p08'
        },
        {
            label: 'Tem Algum Tipo de Alergia?',
            questObs  : 'consulta_p08',
            quest : 'consulta_p08s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p09'
        },
        {
            label: 'Tem Algum Problema de Pressão?',
            questObs  : 'consulta_p09',
            quest : 'consulta_p09s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p10'
        },
        {
            label: 'Tem Diabete?',
            questObs  : 'consulta_p10',
            quest : 'consulta_p10s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p11'
        },
        {
            label: 'Tem Varizes?',
            questObs  : 'consulta_p11',
            quest : 'consulta_p11s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p12'
        },
        {
            label: 'Tem Hérnia?',
            questObs  : 'consulta_p12',
            quest : 'consulta_p12s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p13'
        },
        {
            label: 'Tem Algum Problema de Audição?',
            questObs  : 'consulta_p13',
            quest : 'consulta_p13s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p14'
        }
    ];

    interrogatorio2: any = [
        {
            label: 'Tem Algum Problema de Visão?',
            questObs  : 'consulta_p14',
            quest : 'consulta_p14s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p15'
        },
        {
            label: 'Tem Algum Problema de Pulmão?',
            questObs  : 'consulta_p15',
            quest : 'consulta_p15s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p16'
        },
        {
            label: 'Tem Algum Problema de Coração?',
            questObs  : 'consulta_p16',
            quest : 'consulta_p16s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p17'
        },
        {
            label: 'Tem Algum Problema do Aparelho Digestivo?',
            questObs  : 'consulta_p17',
            quest : 'consulta_p17s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p18'
        },
        {
            label: 'Tem Algum Problema genito-urinário?',
            questObs  : 'consulta_p18',
            quest : 'consulta_p18s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p19'
        },
        {
            label: 'Foi Internado Alguma vez no Hospital?',
            questObs  : 'consulta_p19',
            quest : 'consulta_p19s',            // sim | não
            obsPreenche : 'sim',
            focus: 'consulta_p20'
        },
        {
            label: 'Foi Operado Alguma vez?',
            questObs  : 'consulta_p20',
            quest : 'consulta_p20s',            // sim | não
            obsPreenche : 'sim',
            focus: 'consulta_p21'
        },
        {
            label: 'Tem Alguma Cirurgia ou Tratamento Pendente?',
            questObs  : 'consulta_p21',
            quest : 'consulta_p21s',            // sim | não
            obsPreenche : 'sim',
            focus: 'consulta_p22'
        },
        {
            label: 'Recebeu Algum Benefício ou Seguro da Previdência?',
            questObs  : 'consulta_p22',
            quest : 'consulta_p22s',            // sim | não
            obsPreenche : 'sim',
            focus: 'consulta_p23'
        },
        {
            label: 'Já sofreu algum acidente no trabalho?',
            questObs  : 'consulta_p23',
            quest : 'consulta_p23s',            // sim | não
            obsPreenche : 'sim',
            focus: 'consulta_p24'
        },
        {
            label: 'Tem Dores nas Costas ou Algum Problema de Coluna?',
            questObs  : 'consulta_p24',
            quest : 'consulta_p24s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p25'
        },
        {
            label: 'Tem tontura vertigem ou labirintite?',
            questObs  : 'consulta_p25',
            quest : 'consulta_p25s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p26'
        },
        {
            label: 'Tem fobia no trabalho em altura?',
            questObs  : 'consulta_p26',
            quest : 'consulta_p26s',            // sim | não
            obsPreenche : 'nao',
            focus: 'consulta_p27'
        },
        {
            label: 'Já teve algum desmaio ou convulsão ?',
            questObs  : 'consulta_p27',
            quest : 'consulta_p27s',            // sim | não
            obsPreenche : 'nao'
        },


    ];

    consultAnteced: any = [
        {
            label: 'Antecedentes Ocupacionais',
            field : 'consulta_ant_ocup',
            type: 'text'
        },
        {
            label: 'Antecedentes Pessoais',
            field : 'consulta_ant_pess',
            type: 'text'
        },
        {
            label: 'DUM(Data da Ultima Menstruação):',
            field : 'consulta_ant_dt',
            type: 'date'
        },
        {
            label: 'Antecedentes Ginecológicos',
            field : 'consulta_ant_gine',
            type: 'text'
        },
    ];

    consultDoenca: any = [
        {
            label: 'Psiquiatria',
            fieldMae : 'consulta_doenca_1m',
            fieldPai : 'consulta_doenca_1p',
        },
        {
            label: 'Neoplasia',
            fieldMae : 'consulta_doenca_2m',
            fieldPai : 'consulta_doenca_2p',
        },
        {
            label: 'Alcoolismo',
            fieldMae : 'consulta_doenca_3m',
            fieldPai : 'consulta_doenca_3p',
        },
        {
            label: 'Cardiopatia',
            fieldMae : 'consulta_doenca_4m',
            fieldPai : 'consulta_doenca_4p',
        },
        {
            label: 'Hereditária',
            fieldMae : 'consulta_doenca_5m',
            fieldPai : 'consulta_doenca_5p',
        },
        {
            label: 'Hipertenção Arterial',
            fieldMae : 'consulta_doenca_6m',
            fieldPai : 'consulta_doenca_6p',
        },
        {
            label: 'Diabetes',
            fieldMae : 'consulta_doenca_7m',
            fieldPai : 'consulta_doenca_7p',
        },
        // consulta_doenca_8   : null,     // Nenhuma
        // consulta_doenca_8   : null,     // outras desc
    ];

    consultMedidas: any = [
/*         {
            label: 'Peso',
            field : 'consulta_peso',
            brMask: {money: true, len: 5}
        },
        {
            label: 'Altura',
            field : 'consulta_altu',
            brMask: {mask: '0,00', len: 4}
        }, */
        {
            label: 'Temperatura',
            field : 'consulta_temp',
            brMask: {mask: '00,0', len: 4}
        },
        {
            label: 'Frequência Cardíaca',
            field : 'consulta_card',
            brMask: {mask: '00', len: 3}
        },
        {
            label: 'Frequência Respiratória',
            field : 'consulta_resp',
            brMask: {mask: '00', len: 3}
        },
    ];
    // consulta_pre_max      : null,
    // consulta_pre_min      : null,

    consultFisico: any = [
        {
            label: 'Pele/Mucosa',
            field : 'consulta_fisico_1',
        },
        {
            label: 'Cabeça/Pescoço',
            field : 'consulta_fisico_2',
        },
        {
            label: 'Tórax (Cardio-Resp.)',
            field : 'consulta_fisico_3',
        },
        {
            label: 'Abdome',
            field : 'consulta_fisico_4',
        },
        {
            label: 'Aparelho Digestivo',
            field : 'consulta_fisico_5',
        },
        {
            label: 'Aparelho Urinário',
            field : 'consulta_fisico_6',
        },
        {
            label: 'Hérnia/Hemor/Varic',
            field : 'consulta_fisico_7',
        },
        {
            label: 'Membros (Varizes)',
            field : 'consulta_fisico_8',
        },
        {
            label: 'Neurológico',
            field : 'consulta_fisico_9',
        },
    ];

    consultCid: any = [
        {
            field       : 'consulta_cid_1',
            fieldDescri : 'descri_1',
        },
        {
            field       : 'consulta_cid_2',
            fieldDescri : 'descri_2',
        },
        {
            field       : 'consulta_cid_3',
            fieldDescri : 'descri_3',
        },
        {
            field       : 'consulta_cid_4',
            fieldDescri : 'descri_4',
        },
        {
            field       : 'consulta_cid_5',
            fieldDescri : 'descri_5',
        },
        {
            field : 'consulta_cid_6',
            fieldDescri : 'descri_6',
        },
        // consulta_cid_obs      : null,
    ];

    consultResult: any = {
        consulta_resul_med    : null,
        consulta_resul_ocu    : null,
        consulta_resul_exa    : null,
        consulta_resul_enc    : null,
        consulta_obs_aso      : null,
    };

}
