import { Role, Serializavel } from './types';
import { Categoria } from './Categoria';
import { Comentario } from './Comentario';
import { Artigo } from './Artigo';
import { Publicacao } from './Publicacao';

export class Usuario implements Serializavel {
  private id: string;
  private nome: string;
  private email: string;
  private senha: string;
  private role: Role;
  private posts: Publicacao[] = [];

  constructor(id: string, nome: string, email: string, senha: string, role: Role = Role.LEITOR) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.role = role;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRole(): Role {
    return this.role;
  }

  public getPosts(): Publicacao[] {
    return [...this.posts];
  }

  // Setters protegidos
  public setNome(nome: string): void {
    this.nome = nome;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setRole(role: Role): void {
    this.role = role;
  }

  // Métodos de negócio
  public publicarPost(titulo: string, conteudo: string, categoria: Categoria): Publicacao {
    if (this.role === Role.LEITOR) {
      throw new Error('Leitores não podem publicar posts');
    }

    const post = new Artigo(
      Date.now().toString(),
      titulo,
      conteudo,
      this,
      categoria
    );

    this.posts.push(post);
    return post;
  }

  public adicionarComentario(post: Publicacao, texto: string): Comentario {
    const comentario = new Comentario(
      Date.now().toString(),
      texto,
      this
    );

    post.adicionarComentario(comentario);
    return comentario;
  }

  public deletarPostDeOutroUsuario(post: Publicacao, usuarioAlvo: Usuario): boolean {
    if (this.role !== Role.ADMIN) {
      throw new Error('Apenas administradores podem deletar posts de outros usuários');
    }

    const index = usuarioAlvo.posts.findIndex(p => p.getId() === post.getId());
    if (index !== -1) {
      usuarioAlvo.posts.splice(index, 1);
      return true;
    }

    return false;
  }

  public toJSON(): any {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      role: this.role,
      totalPosts: this.posts.length
    };
  }
}