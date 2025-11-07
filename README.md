# Músicas & Filmes

Aplicação estática em Vite + TypeScript que permite buscar músicas ou artistas e descobrir em quais filmes eles aparecem. O foco inicial é um dataset curado manualmente, mantido em `src/data/aparicoes.json`, para permitir contribuições rápidas via pull request.

## Principais recursos

- 🔍 Busca client-side com Fuse.js e normalização de acentos.
- 💡 Autocomplete em pt-BR para facilitar a descoberta de termos.
- 🎬 Cards com contexto de cada aparição (cena, tempo, fonte citada).
- 🗂️ Modal de detalhes mostrando toda a lista de filmes da música/artista.
- 🤝 Call-to-action para contribuir via PR atualizando o dataset.

## Estrutura

```
/src
  /components       # SearchBar, ResultCard, MovieCard, DetailModal
  /data             # Dataset JSON com aparições
  /styles           # Estilos globais
  main.ts           # Bootstrap do app
```

Os tipos principais estão em `src/types.ts`.

## Executar localmente

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Como contribuir

1. Faça fork do repositório e crie um branch com sua mudança.
2. Atualize `src/data/aparicoes.json` com a nova música/artista, seguindo a interface `EntradaMusical`.
3. Inclua a fonte/citação da descoberta (Tunefind, créditos oficiais, etc.).
4. Abra um pull request descrevendo o que foi adicionado ou corrigido.

## Deploy

O repositório já está configurado com GitHub Pages via Actions. A cada push em `main`, o workflow `Deploy` gera o build (`npm run build`) e publica automaticamente em **https://heensuk.github.io/musicas-filmes/**.

Para testar o build localmente:

```bash
npm run build
npm run preview # opcional para conferir o build
```

## Próximos passos sugeridos

- Integrar API do TMDB para preencher `posterUrl` dinamicamente.
- Adicionar cache em `localStorage` para últimos resultados e imagens baixadas.
- Criar testes de validação do dataset (linting de slugs únicos, campos obrigatórios etc.).

## Licença

Distribuído sob licença MIT. Veja `LICENSE` para mais detalhes.
