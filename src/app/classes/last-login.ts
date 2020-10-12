export class LastLogin {
    // tslint:disable: variable-name
    id: number;
    id_medico_vila: number;
    id_medico_tcmed: number;
    nickname: string;
    referencia: string;
    role: string;
    situacao: string;
    status: string;
    tipo: string;
    created_at: Date;
    email_usuario: string;
    id_usuario: number;
    nome_usuario: string;
    login_date: Date;
}

export class LastLoginArray {
    lastLoginJson: LastLogin = {
        id: null,
        id_medico_vila: null,
        id_medico_tcmed: null,
        nickname: null,
        referencia: null,
        role: null,
        situacao: null,
        status: null,
        tipo: null,
        created_at: null,
        email_usuario: null,
        id_usuario: null,
        nome_usuario: null,
        login_date: null,
    };
}
