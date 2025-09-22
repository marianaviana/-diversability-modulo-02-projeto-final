import { Publicacao } from './Publicacao';
import { Usuario } from './Usuario';
import { Categoria } from './Categoria';

export class Artigo extends Publicacao {
  constructor(
    id: string,
    titulo: string,
    conteudo: string,
    autor: Usuario,
    categoria: Categoria
  ) {
    super(id, titulo, conteudo, autor, categoria);
  }

  public exibir(): void {
    console.log(`Artigo: ${this.titulo}`);
    console.log(`Autor: ${this.autor.getNome()}`);
    console.log(`Categoria: ${this.categoria.getNome()}`);
    console.log(`Data: ${this.dataCriacao.toLocaleDateString()}`);
    console.log(`Likes: ${this.likes}`);
    console.log(`Conteúdo: ${this.conteudo}`);
    console.log('--- Comentários ---');
    this.comentarios.forEach(comentario => {
      console.log(`${comentario.getAutor().getNome()}: ${comentario.getTexto()}`);
    });
  }

  public toJSON(): any {
    const jsonBase = super.toJSON();
    return {
      ...jsonBase,
      tipo: 'artigo'
    };
  }
}