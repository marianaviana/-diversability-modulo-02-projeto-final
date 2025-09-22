export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  LEITOR = 'leitor'
}

export interface Serializavel {
  toJSON(): any;
}