import Fuse from "fuse.js";
import removeAccents from "remove-accents";
import aparicoes from "./data/aparicoes.json";
import "./styles/base.css";
import type { EntradaMusical } from "./types";
import { createSearchBar } from "./components/SearchBar";
import { createResultCard } from "./components/ResultCard";
import { createDetailModal } from "./components/DetailModal";

const LAST_TERM_KEY = "musicas-filmes:last-term";
const dataset = aparicoes as EntradaMusical[];

const fuse = new Fuse(dataset, {
  includeScore: true,
  threshold: 0.35,
  keys: ["termo", "slug", "tipo", "resultados.titulo", "resultados.papel"],
});

const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
  throw new Error("Elemento #app não encontrado");
}

const detailModal = createDetailModal();
document.body.appendChild(detailModal.element);

const header = document.createElement("header");
header.className = "hero";
const title = document.createElement("h1");
title.textContent = "Músicas & Filmes";
const subtitle = document.createElement("p");
subtitle.className = "hero__subtitle";
subtitle.textContent = "Descubra em quais filmes sua música favorita aparece.";

header.append(title, subtitle);

const main = document.createElement("main");
main.className = "layout";

const resultsList = document.createElement("div");
resultsList.className = "results__list";

const emptyState = document.createElement("p");
emptyState.className = "results__empty";
emptyState.textContent = "Nenhum resultado por aqui ainda. Experimente outro termo 🕵️‍♀️";

const contributeBox = document.createElement("aside");
contributeBox.className = "contribute";
const contributeTitle = document.createElement("h2");
contributeTitle.textContent = "Contribua com o dataset";
const contributeText = document.createElement("p");
contributeText.innerHTML =
  "Encontrou uma aparição nova ou quer corrigir algo? Abra um PR no GitHub atualizando <code>src/data/aparicoes.json</code>.";
const contributeButton = document.createElement("a");
contributeButton.href = "https://github.com/seu-usuario/seu-repo";
contributeButton.target = "_blank";
contributeButton.rel = "noreferrer";
contributeButton.className = "contribute__button";
contributeButton.textContent = "Guia de contribuição";
contributeBox.append(contributeTitle, contributeText, contributeButton);

const resultsSection = document.createElement("section");
resultsSection.className = "results";
const resultsHeading = document.createElement("h2");
resultsHeading.className = "results__heading";
resultsHeading.textContent = "Aparições encontradas";
resultsSection.append(resultsHeading, resultsList);

main.append(resultsSection, contributeBox);

const normalize = (value: string) => removeAccents(value).toLowerCase();

const getSuggestions = (term: string) => {
  const normalizedTerm = normalize(term);
  if (!normalizedTerm) return [];

  return dataset
    .filter((entry) => normalize(entry.termo).includes(normalizedTerm))
    .map((entry) => entry.termo);
};

const renderResults = (entries: EntradaMusical[]) => {
  resultsList.replaceChildren();
  if (!entries.length) {
    resultsList.appendChild(emptyState);
    return;
  }

  entries.forEach((entry) => {
    resultsList.appendChild(
      createResultCard({
        entry,
        onDetail: detailModal.open,
      }),
    );
  });
};

const searchEntries = (term: string) => {
  if (!term.trim()) {
    return dataset;
  }

  const normalizedTerm = normalize(term);
  const exactMatches = dataset.filter((entry) => normalize(entry.termo) === normalizedTerm);
  if (exactMatches.length) {
    return exactMatches;
  }

  return fuse.search(term).map(({ item }) => item);
};

const handleSearch = (term: string) => {
  localStorage.setItem(LAST_TERM_KEY, term);
  const results = searchEntries(term);
  renderResults(results);
};

const savedTerm = localStorage.getItem(LAST_TERM_KEY) ?? "";

const searchBar = createSearchBar({
  label: "Pesquisar por música ou artista",
  placeholder: "Busque música ou banda…",
  getSuggestions,
  onSearch: handleSearch,
});

if (savedTerm) {
  handleSearch(savedTerm);
  const searchInput = searchBar.querySelector<HTMLInputElement>("input[type='search']");
  if (searchInput) {
    searchInput.value = savedTerm;
  }
} else {
  renderResults(dataset);
}

app.append(header, searchBar, main);
