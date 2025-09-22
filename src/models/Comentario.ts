import { Usuario } from './Usuario';
import { Serializavel } from './types';

export class Comentario implements Serializavel {
  private id: string;
  private texto: string;
  private autor: Usuario;
  private data: Date;

  constructor(id: string, texto: string, autor: Usuario) {
    this.id = id;
    this.texto = texto;
    this.autor = autor;
    this.data = new Date();
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getTexto(): string {
    return this.texto;
  }

  public getAutor(): Usuario {
    return this.autor;
  }

  public getData(): Date {
    return this.data;
  }

  // Setters
  public setTexto(texto: string): void {
    this.texto = texto;
  }

  public toJSON(): any {
    return {
      id: this.id,
      texto: this.texto,
      autor: this.autor.toJSON(),
      data: this.data.toISOString()
    };
  }
}