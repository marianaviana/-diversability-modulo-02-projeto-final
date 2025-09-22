import {
  Usuario,
  Artigo,
  VideoPost,
  Categoria,
  Publicacao,
  Role
} from './models';
import { exibirPublicacoes, exibirPublicacoesComoJSON } from './utils';

// Criando categorias
const categoriaTecnologia = new Categoria('1', 'Tecnologia');
const categoriaEducacao = new Categoria('2', 'Educação');
const categoriaEntretenimento = new Categoria('3', 'Entretenimento');

// Criando usuários
const admin = new Usuario('1', 'Usuario Admin', 'admin@blog.com', 'senha123', Role.ADMIN);
const editor = new Usuario('2', 'Usuario Editor', 'editor@blog.com', 'senha123', Role.EDITOR);
const leitor = new Usuario('3', 'Usuario Leitor', 'leitor@blog.com', 'senha123', Role.LEITOR);

console.info('=== DEMONSTRAÇÃO DO SISTEMA DE BLOG ===\n');

// 1. Publicando posts
console.info('1. PUBLICANDO POSTS:');
try {
  const artigoTecnologia = editor.publicarPost(
    'TypeScript para Iniciantes',
    'TypeScript é uma linguagem de programação fortemente tipada que se baseia em JavaScript...',
    categoriaTecnologia
  );
  console.info('✅ Artigo publicado com sucesso:', artigoTecnologia.getTitulo());

  const videoEducacao = new VideoPost(
    '4',
    'Aprendendo POO com TypeScript na Ada.Tech',
    'Neste vídeo exploramos os conceitos de Programação Orientada a Objetos...',
    editor,
    categoriaEducacao,
    'https://youtube.com/video/123',
    600
  );
  console.info('✅ Vídeo post criado:', videoEducacao.getTitulo());

  // Tentativa de leitor publicar post (deve falhar)
  try {
    leitor.publicarPost('Post de Leitor', 'Conteúdo...', categoriaEntretenimento);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    console.error('❌ Leitor não pode publicar posts (comportamento esperado):', errorMessage);
  }
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
  console.error('❌ Erro ao publicar posts:', errorMessage);
}

console.log('\n');

// 2. Adicionando comentários e likes
console.log('2. INTERAÇÕES:');
const artigo = admin.publicarPost(
  'Novidades do JavaScript 2025',
  'O JavaScript continua evoluindo com novas funcionalidades...',
  categoriaTecnologia
);

// Adicionando likes
artigo.adicionarLike();
artigo.adicionarLike();
console.info(`✅ Likes no artigo "${artigo.getTitulo()}": ${artigo.getLikes()}`);

// Adicionando comentários
leitor.adicionarComentario(artigo, 'Ótimo artigo! Muito informativo.');
editor.adicionarComentario(artigo, 'Gostei das novidades apresentadas.');
console.info(`✅ Comentários no artigo: ${artigo.getComentarios().length}`);

console.log('\n');

// 3. Demonstração de polimorfismo
console.info('3. POLIMORFISMO:');
const publicacoes: Publicacao[] = [
  new Artigo(
    '5',
    'Design Patterns em TypeScript',
    'Os padrões de design são soluções reutilizáveis para problemas comuns...',
    editor,
    categoriaTecnologia
  ),
  new VideoPost(
    '6',
    'Tutorial de React com TypeScript',
    'Aprenda a usar React com TypeScript...',
    admin,
    categoriaTecnologia,
    'https://youtube.com/video/456',
    1200
  )
];

console.info('Exibindo publicações de forma polimórfica:');
exibirPublicacoes(publicacoes);

console.log('\n');

// 4. Sistema de permissões
console.info('4. SISTEMA DE PERMISSÕES:');
const postDoEditor = editor.publicarPost(
  'Post do Editor',
  'Conteúdo do post do editor...',
  categoriaEntretenimento
);

// Admin pode deletar post de outro usuário
try {
  const deletado = admin.deletarPostDeOutroUsuario(postDoEditor, editor);
  console.info(`✅ Admin deletou post de outro usuário: ${deletado}`);
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
  console.error('❌ Erro ao deletar post:', errorMessage);
}

// Editor não pode deletar post de outro usuário
try {
  editor.deletarPostDeOutroUsuario(artigo, admin);
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
  console.error('❌ Editor não pode deletar posts de outros usuários (comportamento esperado):', errorMessage);
}

console.log('\n');

// 5. Serialização para JSON
console.info('5. SERIALIZAÇÃO JSON:');
exibirPublicacoesComoJSON(publicacoes);

console.log('\n');

// 6. Resumo de conteúdo
console.info('6. RESUMO DE CONTEÚDO:');
const conteudoLongo = 'Este é um conteúdo muito longo que deve ser resumido quando exibido em listagens ou previews. O sistema deve cortar automaticamente após 100 caracteres e adicionar reticências.';
const artigoComResumo = new Artigo(
  '7',
  'Artigo com Conteúdo Longo',
  conteudoLongo,
  editor,
  categoriaEducacao
);

console.info('Resumo do conteúdo:');
console.info(artigoComResumo.getResumoConteudo());

console.log('\n');

// 7. Informações finais
console.info('7. INFORMAÇÕES FINAIS:');
console.info(`Total de posts do admin: ${admin.getPosts().length}`);
console.info(`Total de posts do editor: ${editor.getPosts().length}`);
console.info(`Total de posts do leitor: ${leitor.getPosts().length}`);

console.info('\n=== DEMONSTRAÇÃO CONCLUÍDA ===');