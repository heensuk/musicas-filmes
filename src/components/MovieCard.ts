import type { AparicaoFilme } from "../types";

export function createMovieCard(aparicao: AparicaoFilme): HTMLElement {
  const article = document.createElement("article");
  article.className = "movie-card";

  const posterWrapper = document.createElement("div");
  posterWrapper.className = "movie-card__poster";

  if (aparicao.posterUrl) {
    const image = document.createElement("img");
    image.src = aparicao.posterUrl;
    image.alt = `Poster de ${aparicao.titulo}`;
    posterWrapper.appendChild(image);
  } else {
    const placeholder = document.createElement("span");
    placeholder.className = "movie-card__placeholder";
    placeholder.textContent = aparicao.titulo.charAt(0).toUpperCase();
    posterWrapper.appendChild(placeholder);
  }

  const meta = document.createElement("div");
  meta.className = "movie-card__meta";

  const title = document.createElement("h4");
  title.textContent = aparicao.ano ? `${aparicao.titulo} (${aparicao.ano})` : aparicao.titulo;

  const details = document.createElement("p");
  details.className = "movie-card__details";
  details.textContent = aparicao.papel ?? "Aparição registrada";

  const contextItems: string[] = [];
  if (aparicao.cena) {
    contextItems.push(aparicao.cena);
  }
  if (aparicao.tempo) {
    contextItems.push(`Tempo: ${aparicao.tempo}`);
  }

  const context = document.createElement("p");
  context.className = "movie-card__context";
  context.textContent = contextItems.join(" · ");

  const source = document.createElement("a");
  source.className = "movie-card__source";
  source.textContent = aparicao.fonte ?? "Fonte não informada";
  if (aparicao.fonte?.startsWith("http")) {
    source.href = aparicao.fonte;
    source.target = "_blank";
    source.rel = "noreferrer";
  } else {
    source.href = "#";
    source.addEventListener("click", (event) => event.preventDefault());
  }

  meta.append(title, details);
  if (contextItems.length) {
    meta.appendChild(context);
  }
  meta.appendChild(source);

  article.append(posterWrapper, meta);
  return article;
}
