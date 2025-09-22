import { Publicacao } from './Publicacao';
import { Usuario } from './Usuario';
import { Categoria } from './Categoria';

export class VideoPost extends Publicacao {
  private url: string;
  private duracao: number; // em segundos

  constructor(
    id: string,
    titulo: string,
    conteudo: string,
    autor: Usuario,
    categoria: Categoria,
    url: string,
    duracao: number
  ) {
    super(id, titulo, conteudo, autor, categoria);
    this.url = url;
    this.duracao = duracao;
  }

  // Getters e Setters específicos
  public getUrl(): string {
    return this.url;
  }

  public setUrl(url: string): void {
    this.url = url;
  }

  public getDuracao(): number {
    return this.duracao;
  }

  public setDuracao(duracao: number): void {
    this.duracao = duracao;
  }

  public exibir(): void {
    console.log(`Vídeo: ${this.titulo}`);
    console.log(`Autor: ${this.autor.getNome()}`);
    console.log(`Categoria: ${this.categoria.getNome()}`);
    console.log(`URL: ${this.url}`);
    console.log(`Duração: ${this.duracao} segundos`);
    console.log(`Data: ${this.dataCriacao.toLocaleDateString()}`);
    console.log(`Likes: ${this.likes}`);
    console.log(`Descrição: ${this.conteudo}`);
    console.log('--- Comentários ---');
    this.comentarios.forEach(comentario => {
      console.log(`${comentario.getAutor().getNome()}: ${comentario.getTexto()}`);
    });
  }

  public toJSON(): any {
    const jsonBase = super.toJSON();
    return {
      ...jsonBase,
      tipo: 'video',
      url: this.url,
      duracao: this.duracao
    };
  }
}