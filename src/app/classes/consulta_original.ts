// tslint:disable: variable-name
export class ConsultaOriginal {
    id: number;
    id_empresa: number;
    id_funcionario: number;
    id_medico: number;
    medico_nome: string;
    id_hist_ocupacional: number;
    created_at: Date;
    created_by: number;
    status: string;

    hold_nome: string;
    hold_id: number;
    adm_nome: string;
    emp_nome: string;
    func_nome: string;
    func_sexo: string;
    func_dt_nascimento: any;
    func_setor: string;
    func_cargo: string;
    func_cargo_desc: string;
    func_cargo_risc: string;
    func_cargo_epi: string;
    func_cargo_epc: string;

    consulta_data: any;
    consulta_tipo: string;
    consulta_queixa: string;

    consulta_p01: string;          // Trabalha em outro emprego?
    consulta_p01s: string;            // sim | não
    consulta_p02: string;          // Tem defeito físico?
    consulta_p02s: string;            // sim | não
    consulta_p03: string;          // Bebe?
    consulta_p03s: string;            // sim | não
    consulta_p04: string;          // Fuma?
    consulta_p04s: string;            // sim | não
    consulta_p05: string;          // Pratica Esporte?
    consulta_p05s: string;            // sim | não
    consulta_p06: string;          // Está Fazendo Algum Tratamento de Saúde?
    consulta_p06s: string;            // sim | não
    consulta_p07: string;          // Toma Algum Remédio?
    consulta_p07s: string;            // sim | não
    consulta_p08: string;          // Tem Algum Tipo de Alergia?
    consulta_p08s: string;            // sim | não
    consulta_p09: string;          // Tem Algum Problema de Pressão?
    consulta_p09s: string;            // sim | não
    consulta_p10: string;          // Tem Diabete?
    consulta_p10s: string;            // sim | não
    consulta_p11: string;          // Tem Varizes?
    consulta_p11s: string;            // sim | não
    consulta_p12: string;          // Tem Hérnia?
    consulta_p12s: string;            // sim | não
    consulta_p13: string;          // Tem Algum Problema de Audição?
    consulta_p13s: string;            // sim | não
    consulta_p14: string;          // Interrogatorio 2
    consulta_p14s: string;            // Tem Algum Problema de Visão?
    consulta_p15: string;          // sim | não
    consulta_p15s: string;            // Tem Algum Problema de Pulmão?
    consulta_p16: string;          // sim | não
    consulta_p16s: string;            // Tem Algum Problema de Coração?
    consulta_p17: string;          // sim | não
    consulta_p17s: string;            // Tem Algum Problema do Aparelho Digestivo?
    consulta_p18: string;          // sim | não
    consulta_p18s: string;            // Tem Algum Problema genito-urinário?
    consulta_p19: string;          // sim | não
    consulta_p19s: string;            // Foi Internado Alguma vez no Hospital?
    consulta_p20: string;          // sim | não
    consulta_p20s: string;            // Foi Operado Alguma vez?
    consulta_p21: string;          // sim | não
    consulta_p21s: string;            // Tem Alguma Cirurgia ou Tratamento Pendente?
    consulta_p22: string;          // sim | não
    consulta_p22s: string;            // Recebeu Algum Benefício ou Seguro da Previdência?
    consulta_p23: string;          // sim | não
    consulta_p23s: string;            // Sofreu Algum Acidente?
    consulta_p24: string;          // sim | não
    consulta_p24s: string;            // Tem Dores nas Costas ou Algum Problema de Coluna?
    consulta_p25: string;          // sim | não
    consulta_p25s: string;            // Tem tontura vertigem ou labirintite?
    consulta_p26: string;          // sim | não
    consulta_p26s: string;            // Tem fobia no trabalho em altura?
    consulta_p27: string;          // sim | não
    consulta_p27s: string;            // Já teve algum desmaio ou convulsão ?

    consulta_ant_ocup: string;
    consulta_ant_pess: string;
    consulta_ant_gine: string;
    consulta_ant_dt: string;

    consulta_doenca_1p: any;       // Psiquiatriamãe | pai
    consulta_doenca_1m: any;       // Psiquiatriamãe | mãe
    consulta_doenca_2p: any;       // Neoplasiamãe | pai
    consulta_doenca_2m: any;       // Neoplasiamãe | mãe
    consulta_doenca_3p: any;       // Alcoolismomãe | pai
    consulta_doenca_3m: any;       // Alcoolismomãe | mãe
    consulta_doenca_4p: any;       // Cardiopatiamãe | pai
    consulta_doenca_4m: any;       // Cardiopatiamãe | mãe
    consulta_doenca_5p: any;       // Hereditáriamãe | pai
    consulta_doenca_5m: any;       // Hereditáriamãe | mãe
    consulta_doenca_6p: any;       // Hipertenção Arterial | pai
    consulta_doenca_6m: any;       // Hipertenção Arterial | mãe
    consulta_doenca_7p: any;       // Diabetesmãe | pai
    consulta_doenca_7m: any;       // Diabetesmãe | mãe
    consulta_doenca_8: any;       // Nenhuma
    consulta_doenca_out: any;     // outras desc

    consulta_peso: string;
    consulta_altu: string;
    consulta_temp: string;
    consulta_pre_max: string;
    consulta_pre_min: string;
    consulta_card: string;
    consulta_resp: string;

    consulta_fisico_1: string;       // Pele/Mucosa
    consulta_fisico_2: string;       // Aparelho Urinário
    consulta_fisico_3: string;       // Cabeça/Pescoço
    consulta_fisico_4: string;       // Hérnia/Hemor/Varic
    consulta_fisico_5: string;       // Tórax (Cardio-Resp.)
    consulta_fisico_6: string;       // Membros (Varizes)
    consulta_fisico_7: string;       // Abdome
    consulta_fisico_8: string;       // Neurológico
    consulta_fisico_9: string;       // Aparelho Digestivo

    consulta_cid_1: string;
    consulta_cid_2: string;
    consulta_cid_3: string;
    consulta_cid_4: string;
    consulta_cid_5: string;
    consulta_cid_6: string;
    consulta_cid_obs: string;

    consulta_resul_med: string;
    consulta_resul_ocu: string;
    consulta_resul_exa: string;
    consulta_resul_enc: string;

    consulta_obs_aso: string;

}

export class ConsultaOriginalArray {

    consultaOriginalJson: ConsultaOriginal = {
        id                    : null,
        id_empresa            : null,
        id_funcionario        : null,
        id_medico             : null,
        medico_nome           : null,
        id_hist_ocupacional   : null,
        created_at            : null,
        created_by            : null,
        status                : null,

        hold_nome             : null,
        hold_id               : null,
        adm_nome              : null,
        emp_nome              : null,
        func_nome             : null,
        func_sexo             : null,
        func_dt_nascimento    : null,
        func_setor            : null,
        func_cargo            : null,
        func_cargo_desc       : null,
        func_cargo_risc       : null,
        func_cargo_epi        : null,
        func_cargo_epc        : null,

        consulta_data         : null,
        consulta_tipo         : null,
        consulta_queixa       : null,

        consulta_p01          : null,          // Trabalha em outro emprego?
        consulta_p01s         : null,            // sim | não
        consulta_p02          : null,          // Tem defeito físico?
        consulta_p02s         : null,            // sim | não
        consulta_p03          : null,          // Bebe?
        consulta_p03s         : null,            // sim | não
        consulta_p04          : null,          // Fuma?
        consulta_p04s         : null,            // sim | não
        consulta_p05          : null,          // Pratica Esporte?
        consulta_p05s         : null,            // sim | não
        consulta_p06          : null,          // Está Fazendo Algum Tratamento de Saúde?
        consulta_p06s         : null,            // sim | não
        consulta_p07          : null,          // Toma Algum Remédio?
        consulta_p07s         : null,            // sim | não
        consulta_p08          : null,          // Tem Algum Tipo de Alergia?
        consulta_p08s         : null,            // sim | não
        consulta_p09          : null,          // Tem Algum Problema de Pressão?
        consulta_p09s         : null,            // sim | não
        consulta_p10          : null,          // Tem Diabete?
        consulta_p10s         : null,            // sim | não
        consulta_p11          : null,          // Tem Varizes?
        consulta_p11s         : null,            // sim | não
        consulta_p12          : null,          // Tem Hérnia?
        consulta_p12s         : null,            // sim | não
        consulta_p13          : null,          // Tem Algum Problema de Audição?
        consulta_p13s         : null,            // sim | não
        consulta_p14          : null,          // Interrogatorio 2
        consulta_p14s         : null,            // Tem Algum Problema de Visão?
        consulta_p15          : null,          // sim | não
        consulta_p15s         : null,            // Tem Algum Problema de Pulmão?
        consulta_p16          : null,          // sim | não
        consulta_p16s         : null,            // Tem Algum Problema de Coração?
        consulta_p17          : null,          // sim | não
        consulta_p17s         : null,            // Tem Algum Problema do Aparelho Digestivo?
        consulta_p18          : null,          // sim | não
        consulta_p18s         : null,            // Tem Algum Problema genito-urinário?
        consulta_p19          : null,          // sim | não
        consulta_p19s         : null,            // Foi Internado Alguma vez no Hospital?
        consulta_p20          : null,          // sim | não
        consulta_p20s         : null,            // Foi Operado Alguma vez?
        consulta_p21          : null,          // sim | não
        consulta_p21s         : null,            // Tem Alguma Cirurgia ou Tratamento Pendente?
        consulta_p22          : null,          // sim | não
        consulta_p22s         : null,            // Recebeu Algum Benefício ou Seguro da Previdência?
        consulta_p23          : null,          // sim | não
        consulta_p23s         : null,            // Sofreu Algum Acidente?
        consulta_p24          : null,          // sim | não
        consulta_p24s         : null,            // Tem Dores nas Costas ou Algum Problema de Coluna?
        consulta_p25          : null,          // sim | não
        consulta_p25s         : null,            // Tem tontura vertigem ou labirintite?
        consulta_p26          : null,          // sim | não
        consulta_p26s         : null,            // Tem fobia no trabalho em altura?
        consulta_p27          : null,          // sim | não
        consulta_p27s         : null,            // Já teve algum desmaio ou convulsão ?

        consulta_ant_ocup     : null,
        consulta_ant_pess     : null,
        consulta_ant_gine     : null,
        consulta_ant_dt       : null,

        consulta_doenca_1p    : null,       // Psiquiatriamãe | pai
        consulta_doenca_1m    : null,       // Psiquiatriamãe | mãe
        consulta_doenca_2p    : null,       // Neoplasiamãe | pai
        consulta_doenca_2m    : null,       // Neoplasiamãe | mãe
        consulta_doenca_3p    : null,       // Alcoolismomãe | pai
        consulta_doenca_3m    : null,       // Alcoolismomãe | mãe
        consulta_doenca_4p    : null,       // Cardiopatiamãe | pai
        consulta_doenca_4m    : null,       // Cardiopatiamãe | mãe
        consulta_doenca_5p    : null,       // Hereditáriamãe | pai
        consulta_doenca_5m    : null,       // Hereditáriamãe | mãe
        consulta_doenca_6p    : null,       // Hipertenção Arterial | pai
        consulta_doenca_6m    : null,       // Hipertenção Arterial | mãe
        consulta_doenca_7p    : null,       // Diabetesmãe | pai
        consulta_doenca_7m    : null,       // Diabetesmãe | mãe
        consulta_doenca_8     : null,       // Nenhuma
        consulta_doenca_out   : null,     // outras desc

        consulta_peso         : null,
        consulta_altu         : null,
        consulta_temp         : null,
        consulta_pre_max      : null,
        consulta_pre_min      : null,
        consulta_card         : null,
        consulta_resp         : null,

        consulta_fisico_1     : null,       // Pele/Mucosa
        consulta_fisico_2     : null,       // Aparelho Urinário
        consulta_fisico_3     : null,       // Cabeça/Pescoço
        consulta_fisico_4     : null,       // Hérnia/Hemor/Varic
        consulta_fisico_5     : null,       // Tórax (Cardio-Resp.)
        consulta_fisico_6     : null,       // Membros (Varizes)
        consulta_fisico_7     : null,       // Abdome
        consulta_fisico_8     : null,       // Neurológico
        consulta_fisico_9     : null,       // Aparelho Digestivo

        consulta_cid_1        : null,
        consulta_cid_2        : null,
        consulta_cid_3        : null,
        consulta_cid_4        : null,
        consulta_cid_5        : null,
        consulta_cid_6        : null,
        consulta_cid_obs      : null,

        consulta_resul_med    : null,
        consulta_resul_ocu    : null,
        consulta_resul_exa    : null,
        consulta_resul_enc    : null,

        consulta_obs_aso      : null,
    };
}


