// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // PENDIENTE: el dominio no está decidido (ver PRODUCT.md). Este valor solo
  // alimenta la etiqueta <link rel="canonical">; cámbialo en cuanto se compre
  // el dominio real, antes de publicar.
  site: 'https://ancestral-cocina-de-autor.example',
  // La barra de Astro se mete en las capturas de la lámina.
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
