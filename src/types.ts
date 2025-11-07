export interface AparicaoFilme {
  filmeId?: string;
  titulo: string;
  ano?: number;
  papel?: string;
  cena?: string;
  tempo?: string;
  fonte?: string;
  posterUrl?: string;
}

export interface EntradaMusical {
  tipo: "musica" | "artista";
  termo: string;
  resultados: AparicaoFilme[];
  slug: string;
}
