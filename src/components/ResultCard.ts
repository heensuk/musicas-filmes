import type { EntradaMusical } from "../types";
import { createMovieCard } from "./MovieCard";

export interface ResultCardOptions {
  entry: EntradaMusical;
  onDetail(entry: EntradaMusical): void;
}

const PREVIEW_LIMIT = 2;

export function createResultCard({ entry, onDetail }: ResultCardOptions): HTMLElement {
  const section = document.createElement("section");
  section.className = "result-card";

  const header = document.createElement("div");
  header.className = "result-card__header";

  const title = document.createElement("h3");
  title.textContent = entry.termo;

  const badge = document.createElement("span");
  badge.className = "result-card__badge";
  badge.textContent = entry.tipo === "musica" ? "Música" : "Artista";

  const count = document.createElement("p");
  count.className = "result-card__count";
  count.textContent = `${entry.resultados.length} ${entry.resultados.length === 1 ? "filme" : "filmes"}`;

  const actions = document.createElement("div");
  actions.className = "result-card__actions";
  const detailButton = document.createElement("button");
  detailButton.type = "button";
  detailButton.className = "result-card__details";
  detailButton.textContent = "Ver detalhes";
  detailButton.addEventListener("click", () => onDetail(entry));
  actions.appendChild(detailButton);

  header.append(title, badge);

  const list = document.createElement("div");
  list.className = "result-card__list";
  const preview = entry.resultados.slice(0, PREVIEW_LIMIT).map(createMovieCard);
  list.append(...preview);

  if (entry.resultados.length > PREVIEW_LIMIT) {
    const more = document.createElement("p");
    more.className = "result-card__more";
    more.textContent = `+${entry.resultados.length - PREVIEW_LIMIT} aparições na visualização completa.`;
    list.appendChild(more);
  }

  section.append(header, count, list, actions);
  return section;
}
