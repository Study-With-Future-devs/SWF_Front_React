export type UserRole = 'Admin' | 'Coordenador' | 'Professor' | 'Aluno';

export interface User {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: string;
  funcao: string;
  telasPermitidasIds: number[];
}

export interface Student {
  id: number;
  nome: string;
  email: string;
  tipoUsuario: UserRole; // sempre 'Aluno' nesse caso
  funcao: string;
  telasPermitidasIds: number[];

  // Campos específicos do aluno
  matricula?: string;
  turmaId?: number;
  turmaNome?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiraEm: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    tipoUsuario: UserRole;
    funcao: string;
    telasPermitidasIds: number[];
  };
}
