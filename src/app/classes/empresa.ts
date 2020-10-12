export class Empresa {
    // tslint:disable: variable-name
    id: number;
    bairro: string;
    cep: string;
    cidade: string;
    cnpj: string;
    codrua: string;
    complemento: string;
    endereco: string;
    estado: string;
    fantasia_empresa: string;
    id_administradora: number;
    numero_rua: string;
    qtd_func: number;
    razao_social: string;
    referencia_emp: string;
    hold: number;
}

export class EmpresaArray {

    empresaJson: Empresa = {
        id: null,
        bairro: null,
        cep: null,
        cidade: null,
        cnpj: null,
        codrua: null,
        complemento: null,
        endereco: null,
        estado: null,
        fantasia_empresa: null,
        id_administradora: null,
        numero_rua: null,
        qtd_func: null,
        razao_social: null,
        referencia_emp: null,
        hold: null
    };
}


