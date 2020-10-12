export class Funcionario {
    // tslint:disable: variable-name
    id: number;
    cpf: string;
    dt_admissao: Date;
    dt_nascimento: Date;
    estado_civil: string;
    id_empresa: number;
    id_last_consulta: string;
    nome_funcionario: string;
    referencia_func: string;
    periodicidade: string;
    pis: string;
    rg: string;
    ultimo_exame: Date;
    ultimo_tipo_exame: string;
    hold: number;
}

export class FuncionarioArray {

    funcionarioJson: Funcionario = {
        id: null,
        cpf: null,
        dt_admissao: null,
        dt_nascimento: null,
        estado_civil: null,
        id_empresa: null,
        id_last_consulta: null,
        nome_funcionario: null,
        referencia_func: null,
        periodicidade: null,
        pis: null,
        rg: null,
        ultimo_exame: null,
        ultimo_tipo_exame: null,
        hold: null
    };
}


