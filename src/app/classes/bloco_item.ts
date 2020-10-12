export class BlocoItem {
    // tslint:disable: variable-name
    id: number;
    bloco_id: number;
    empresa_id: number;
    hora_fim: string;
    hora_ini: string;
    observacao: string;
    obs_check: string;
    qtd_fun_item: number;
    reagendar: string;
    sequencia: number;
    tempo_consul: string;
    translado: string;
    hold: number;
    check_in: any;
    check_out: any;
}

export class BlocoItemArray {

    blocoItemJson: BlocoItem = {
        id: null,
        bloco_id: null,
        empresa_id: null,
        hora_fim: null,
        hora_ini: null,
        observacao: null,
        obs_check: null,
        qtd_fun_item: null,
        reagendar: null,
        sequencia: null,
        tempo_consul: null,
        translado: null,
        hold: null,
        check_in: null,
        check_out: null
    };
}


