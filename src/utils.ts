import { Publicacao } from './models/Publicacao';

export function exibirPublicacoes(publicacoes: Publicacao[]): void {
  console.log('=== PUBLICACOES ===');
  publicacoes.forEach(publicacao => {
    publicacao.exibir();
    console.log('\n');
  });
}

export function exibirPublicacoesComoJSON(publicacoes: Publicacao[]): void {
  console.log('=== PUBLICACOES (JSON) ===');
  publicacoes.forEach(publicacao => {
    console.log(JSON.stringify(publicacao.toJSON(), null, 2));
    console.log('\n');
  });
}