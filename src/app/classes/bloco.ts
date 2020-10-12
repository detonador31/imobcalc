export class Bloco {
    // tslint:disable: variable-name
    agendado_em: any;
    created_at: any;
    created_by_nome: string;
    id: number;
    medico_id: number;
    qtd_empresa: number;
    referencia: number;
    hold: number;
}

export class BlocoArray {
    blocoJson: Bloco = {
        agendado_em: null,
        created_at: null,
        created_by_nome: null,
        id: null,
        medico_id: null,
        qtd_empresa: null,
        referencia: null,
        hold: null
    };
}


