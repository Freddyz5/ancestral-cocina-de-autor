# Ancestral · Cocina de Autor

Cocina ecuatoriana de autor del Chef Alexander Santamaría · Latacunga · Ambato · Salcedo
· [@ancestralcocinadeautor](https://instagram.com/ancestralcocinadeautor)

Astro + Tailwind, sitio estático.

> **Nota de origen.** Este repositorio arrancó copiando el proyecto de Palsabi
> (librería cristiana) como plantilla: el commit inicial solo traía el README y
> todo lo demás entró sin trackear. La landing, el catálogo de libros y el sistema
> de diseño de Palsabi ya se retiraron. Si aparece algo que diga «Palsabi», es
> residuo y se puede borrar.

## Correr el proyecto

Con [Bun](https://bun.sh):

```bash
bun install
bun run dev      # http://localhost:4321
bun run build    # genera dist/
bun run preview  # revisa dist/ antes de publicar
```

## Cómo está armado

```
src/
  constants/quote.json    TODO el cotizador: fases, piezas, precios y textos.
  modules/quote/
    core/types.ts         La forma de quote.json.
    core/quote.ts         El cálculo. Funciones puras, sin DOM y sin idioma.
    core/url.ts           La selección entera, ida y vuelta a la URL.
    core/controller.ts    El puente al DOM: estado → pintar.
    core/format.ts        Dinero, fechas y el número de cotización.
    components/           Una pieza por tipo (toggle, contador, grupo…).
    styles/quote.css      Los estilos propios del cotizador.
    QuotePage.astro       La composición. Ni una cifra ni un texto.
  modules/Ancestral/
    constants/config.ts   WhatsApp, redes, textos de marca del sitio.
    components/Lamina.astro El fondo: el campo de pliegues Miura, en SVG.
    components/Logo.astro   El logotipo, recortado de marca/.
    layouts/Base.astro    <head>, y el contrato de dirección del diseño.
  pages/
    index.astro           Portada provisional (la landing es la Fase 1).
    presupuesto.astro     El cotizador. Diez líneas: layout + datos.
  styles/global.css       La paleta, las tres tipografías y los componentes.
marca/                    Los archivos de marca originales (capturas).
public/marca/             El logotipo recortado, listo para la web.
DESIGN.md                 El sistema de diseño. PRODUCT.md, la verdad de producto.
```

**Para cambiar el WhatsApp o las redes:** `src/modules/Ancestral/constants/config.ts`.

**Para cambiar precios, piezas o textos del presupuesto:** `src/constants/quote.json`,
y nada más. Es la única fuente: la página, el total y el documento impreso salen
todos de ahí.

**No hay tarifa por hora ni jornadas.** Cada pieza trae su precio cerrado
(`price`, o `pricePerUnit` en las de cantidad) y el total es una suma, no una
multiplicación: una pieza vale por lo que entrega, no por lo que tarda.

Hay tres tipos de pieza — `toggle`, `counter` y `choice` (grupo excluyente) — y
el campo `requires` encadena unas con otras de verdad: si el requisito se pliega,
la pieza se colapsa y deja de sumar.

## El cotizador

`/presupuesto` no está enlazado desde la navegación: es la herramienta de la
reunión, no una página del sitio público.

- **La selección entera vive en la URL.** Al terminar la reunión se copia el enlace
  y ése es el presupuesto acordado — sin captura ni PDF de por medio.
- **`?readonly=1`** congela la interacción y deja el presupuesto como quedó en el
  enlace. Es la puerta para pasárselo al cliente sin que se le mueva nada.
- **«Imprimir propuesta»** cambia la página entera por el documento formal:
  carátula, tabla de detalle por fase con subtotales, y firmas. Se imprime en tinta
  negra sobre papel, no en oro sobre negro.

## La lámina

La interfaz es un pliegue Miura: un paquete de oro que se abre en un campo de
facetas enlazadas. Cada pieza del presupuesto es una faceta —desplegada si está
incluida, plegada si no— y la cadena de requisitos es el grafo de pliegues, así que
soltar «carta pública» colapsa de una vez toda la rama que cuelga de ella.

El fondo es el patrón Miura calculado en SVG, no una imagen ni una retícula
decorativa. El detalle completo está en [DESIGN.md](DESIGN.md).

## Pendientes del cliente

Nada de esto se inventa (ver `PRODUCT.md`):

- El dominio. `astro.config.mjs` lleva hoy un valor marcador.
- La carta, los platos y los precios.
- Horarios, direcciones, y cuál de las tres ciudades tiene local.
- Fotografía propia de los platos y del local.
- El logotipo en vector. Hoy solo hay capturas en `marca/`.
