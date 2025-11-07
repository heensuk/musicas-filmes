import type { EntradaMusical } from "../types";
import { createMovieCard } from "./MovieCard";

export interface DetailModal {
  element: HTMLElement;
  open(entry: EntradaMusical): void;
  close(): void;
}

export function createDetailModal(): DetailModal {
  const overlay = document.createElement("div");
  overlay.className = "detail-modal";
  overlay.hidden = true;

  const dialog = document.createElement("div");
  dialog.className = "detail-modal__dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");

  const closeButton = document.createElement("button");
  closeButton.className = "detail-modal__close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Fechar detalhes");
  closeButton.innerHTML = "&times;";

  const heading = document.createElement("h3");
  heading.className = "detail-modal__heading";

  const list = document.createElement("div");
  list.className = "detail-modal__list";

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleKeyDown);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && !overlay.hidden) {
      close();
    }
  }

  const open = (entry: EntradaMusical) => {
    heading.textContent = `${entry.termo} • ${entry.resultados.length} aparições`;
    list.replaceChildren(...entry.resultados.map(createMovieCard));
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
  };

  closeButton.addEventListener("click", () => close());
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
      close();
    }
  });

  dialog.append(closeButton, heading, list);
  overlay.appendChild(dialog);

  return { element: overlay, open, close };
}
