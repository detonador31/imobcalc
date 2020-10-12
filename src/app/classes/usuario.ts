import { DefaultFields } from './defaultFields';
export class Usuario extends DefaultFields {
    id: number;
    idMedico: number;
    idMedicoVila: number;
    idMedicoTcmed: number;
    idUsuario: number;
    isAdmin: boolean;
    createdAt: Date;
    emailUsuario: string;
    email: string;
    nickname: string;
    nomeUsuario: string;
    referencia: string;
    role: string;
    situacao: string;
    status: string;
    tipo: string;
    updatedAt: Date;
    password: string;
    firstname: string;
    lastname: string;
    age: number;
    loginStatus: string;
}
