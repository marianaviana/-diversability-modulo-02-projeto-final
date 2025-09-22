import { Usuario } from './Usuario';
import { Comentario } from './Comentario';
import { Categoria } from './Categoria';
import { Serializavel } from './types';

export abstract class Publicacao implements Serializavel {
  protected id: string;
  protected titulo: string;
  protected conteudo: string;
  protected autor: Usuario;
  protected dataCriacao: Date;
  protected likes: number;
  protected comentarios: Comentario[];
  protected categoria: Categoria;

  constructor(
    id: string,
    titulo: string,
    conteudo: string,
    autor: Usuario,
    categoria: Categoria
  ) {
    this.id = id;
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.autor = autor;
    this.dataCriacao = new Date();
    this.likes = 0;
    this.comentarios = [];
    this.categoria = categoria;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getConteudo(): string {
    return this.conteudo;
  }

  public getAutor(): Usuario {
    return this.autor;
  }

  public getDataCriacao(): Date {
    return this.dataCriacao;
  }

  public getLikes(): number {
    return this.likes;
  }

  public getComentarios(): Comentario[] {
    return [...this.comentarios];
  }

  public getCategoria(): Categoria {
    return this.categoria;
  }

  // Setters protegidos
  public setTitulo(titulo: string): void {
    this.titulo = titulo;
  }

  public setConteudo(conteudo: string): void {
    this.conteudo = conteudo;
  }

  public setAutor(autor: Usuario): void {
    // Apenas admin ou o próprio autor podem alterar
    this.autor = autor;
  }

  public setCategoria(categoria: Categoria): void {
    this.categoria = categoria;
  }

  // Métodos de negócio
  public adicionarLike(): void {
    this.likes++;
  }

  public adicionarComentario(comentario: Comentario): void {
    this.comentarios.push(comentario);
  }

  public getResumoConteudo(): string {
    return this.conteudo.length > 100
      ? this.conteudo.substring(0, 100) + '...'
      : this.conteudo;
  }

  public abstract exibir(): void;

  public toJSON(): any {
    return {
      id: this.id,
      titulo: this.titulo,
      resumo: this.getResumoConteudo(),
      autor: this.autor.toJSON(),
      dataCriacao: this.dataCriacao.toISOString(),
      likes: this.likes,
      totalComentarios: this.comentarios.length,
      categoria: this.categoria.toJSON()
    };
  }
}