import { Serializavel } from './types';

export class Categoria implements Serializavel {
  private id: string;
  private nome: string;

  constructor(id: string, nome: string) {
    this.id = id;
    this.nome = nome;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  // Setters
  public setNome(nome: string): void {
    this.nome = nome;
  }

  public toJSON(): any {
    return {
      id: this.id,
      nome: this.nome
    };
  }
}