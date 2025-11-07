export interface SearchBarOptions {
  placeholder?: string;
  label?: string;
  getSuggestions(term: string): string[];
  onSearch(term: string): void;
}

const MAX_SUGGESTIONS = 6;

export function createSearchBar(options: SearchBarOptions): HTMLElement {
  const form = document.createElement("form");
  form.className = "search-bar";
  form.setAttribute("role", "search");
  form.setAttribute("aria-label", options.label ?? "Busca por música ou artista");

  const label = document.createElement("label");
  label.className = "search-bar__label";
  label.textContent = options.label ?? "Busque música ou banda";
  label.htmlFor = "search-input";

  const fieldWrapper = document.createElement("div");
  fieldWrapper.className = "search-bar__field";

  const input = document.createElement("input");
  input.type = "search";
  input.id = "search-input";
  input.name = "termo";
  input.placeholder = options.placeholder ?? "Busque música ou banda…";
  input.autocomplete = "off";
  input.setAttribute("aria-describedby", "suggestions-helper");

  const suggestionsList = document.createElement("ul");
  suggestionsList.className = "search-bar__suggestions";
  suggestionsList.id = "suggestions-helper";
  suggestionsList.setAttribute("role", "listbox");

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.className = "search-bar__button";
  submitButton.textContent = "Buscar";

  fieldWrapper.append(input, submitButton);
  form.append(label, fieldWrapper, suggestionsList);

  const updateSuggestions = (term: string) => {
    suggestionsList.replaceChildren();
    if (!term.trim()) {
      return;
    }

    const suggestions = options.getSuggestions(term).slice(0, MAX_SUGGESTIONS);
    suggestions.forEach((suggestion, index) => {
      const item = document.createElement("li");
      item.className = "search-bar__suggestion";
      item.textContent = suggestion;
      item.id = `suggestion-${index}`;
      item.setAttribute("role", "option");
      item.tabIndex = 0;

      const handleSelect = () => {
        input.value = suggestion;
        suggestionsList.replaceChildren();
        options.onSearch(suggestion);
      };

      item.addEventListener("click", handleSelect);
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleSelect();
        }
      });

      suggestionsList.appendChild(item);
    });
  };

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const value = input.value.trim();
    if (value) {
      suggestionsList.replaceChildren();
      options.onSearch(value);
    }
  };

  input.addEventListener("input", () => updateSuggestions(input.value));
  form.addEventListener("submit", handleSubmit);

  return form;
}
