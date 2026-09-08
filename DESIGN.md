---
name: Ancestral
description: Cocina ecuatoriana de autor cuya interfaz es una lámina Miura de oro oscuro — facetas que se despliegan, pliegues de monte y de valle, y una cadena de requisitos que colapsa ramas enteras.
colors:
  lamina: "#100d0a"
  lamina-honda: "#0a0806"
  faceta: "#17130f"
  faceta-alta: "#201a14"
  faceta-plegada: "#131009"
  monte: "#d8a83c"
  valle: "#6b6257"
  oro: "#d8a83c"
  oro-claro: "#f5dc7a"
  oro-hondo: "#a87c22"
  oro-luz: "#fff0b8"
  ambar: "#e08a1e"
  hueso: "#ede4d2"
  hueso-suave: "#a9a094"
  ceniza: "#6b6257"
  papel: "#f7f4ec"
  tinta: "#14110d"
typography:
  monumental:
    fontFamily: "Big Shoulders Display Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.5vw, 5rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  titulo:
    fontFamily: "Big Shoulders Display Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.6vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "0"
    textTransform: "uppercase"
  rubro:
    fontFamily: "Big Shoulders Display Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.32rem"
    fontWeight: 600
    lineHeight: 1.12
    textTransform: "uppercase"
  guia:
    fontFamily: "Asap Variable, Asap, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.6
  cuerpo:
    fontFamily: "Asap Variable, Asap, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.97rem"
    fontWeight: 400
    lineHeight: 1.58
  menudo:
    fontFamily: "Asap Variable, Asap, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.86rem"
    fontWeight: 400
    lineHeight: 1.5
  rotulo:
    fontFamily: "Azeret Mono Variable, ui-monospace, SF Mono, monospace"
    fontSize: "0.68rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.18em"
    textTransform: "uppercase"
  cifra:
    fontFamily: "Azeret Mono Variable, ui-monospace, SF Mono, monospace"
    fontSize: "0.86rem"
    fontWeight: 400
    lineHeight: 1.5
geometry:
  sesgo: "-11deg"
  chaflan: "0.85rem"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.75rem"
  lg: "2.75rem"
  xl: "4rem"
components:
  faceta:
    backgroundColor: "{colors.faceta}"
    textColor: "{colors.hueso}"
    padding: "1rem 1.25rem"
    clipPath: "chaflán arriba a la derecha"
  faceta-plegada:
    backgroundColor: "{colors.faceta-plegada}"
    textColor: "{colors.hueso}"
  faceta-alta:
    backgroundColor: "{colors.faceta-alta}"
    textColor: "{colors.hueso}"
  boton-oro:
    backgroundColor: "{colors.oro}"
    textColor: "{colors.lamina}"
    padding: "0.72rem 1.35rem"
    transform: "skewX({geometry.sesgo})"
  boton-oro-hover:
    backgroundColor: "{colors.oro-claro}"
    textColor: "{colors.lamina}"
  boton-contorno:
    textColor: "{colors.hueso}"
    padding: "0.72rem 1.35rem"
    transform: "skewX({geometry.sesgo})"
  paso-boton:
    textColor: "{colors.hueso}"
    padding: "0"
    transform: "skewX({geometry.sesgo})"
---

# Design System: Ancestral

## Overview

**Creative North Star: "La lámina desplegable"**

Un paquete de oro del tamaño de un libro se tira de dos esquinas y se abre de una
sola vez en un campo rígido de paralelogramos enlazados. Eso es un pliegue Miura,
y eso es esta interfaz: **el paquete es la marca de Ancestral, y la lámina
desplegada es el presupuesto.**

La consecuencia práctica es que el estado de cada pieza no se dibuja con un
control prestado —un switch, una casilla redondeada— sino con la física del
material: una pieza incluida es una **faceta desplegada**, con su arista de monte
encendida en oro y su cara recibiendo luz; una pieza no incluida es una **faceta
plegada**, en sombra y con su pliegue de valle punteado, pero perfectamente
legible. Y la cadena de requisitos del presupuesto es literalmente el **grafo de
pliegues**: soltar «carta pública» colapsa de golpe la rama entera que cuelga de
ella, porque en una lámina Miura no existe un pliegue que se mueva solo.

Este mundo llegó por elección explícita del usuario: el reparto había asignado
«el menú degustación impreso» y el usuario tomó el retador Miura
(`paper-folds-pleats-deployable-miura-orbit-sheet`, seed `feb92e60`). Se conserva
su gramática entera —geometría de paralelogramo, notación de monte y valle, mono
de ficha técnica, chaflán— con **una sustitución declarada**: el original es una
lámina blanca mate con acento de oro y azul de valle; acá la lámina se invierte a
oro visto por su cara oscura, porque el compromiso de marca de Ancestral es negro
carbón + oro y PRODUCT.md manda sobre la dirección. El azul de valle del original
pasa a ceniza por la misma razón.

Este mundo rechaza por nombre dos cosas: el cotizador SaaS de tarjetas blancas
con switch y barra de total azul, y el fine dining genérico de oro sobre negro con
serif y filigranas.

**Key Characteristics:**
- Estado = física del material: desplegada, plegada, colapsada
- Un solo ángulo de sesgo (−11°) para todo control de la página
- Chaflán siempre arriba a la derecha; ni una esquina redondeada
- Toda cifra medida en la mono, con ancho fijo
- Un solo momento de movimiento: la lámina que se abre en diagonal al cargar

## Colors

Estrategia: **drenched oscuro**. La lámina ocupa el 100% de la superficie y el oro
aparece solo donde hay acción o estado. La escena de uso lo decide: esto se abre
en una reunión de noche, en un restaurante con luz cálida baja, y el chef mira la
pantalla junto al desarrollador. Un fondo claro en ese cuarto es una linterna.

### Primary
- **Oro** (`#D8A83C`): el color de la marca, muestreado del degradé del logotipo.
  Arista de monte, relleno de acción, faceta encendida en la tira de superficie.
  Sobre la lámina da **8,7:1**, así que —a diferencia del naranja de la marca
  anterior— acá el oro **sí sirve de letra**. Ésa es la ventaja de invertir.
- **Oro claro** (`#F5DC7A`): el canto iluminado del foil. Cifra del total, hover.
- **Oro hondo** (`#A87C22`): el foil en sombra. Extremo bajo de los degradés y
  viñetas.
- **Oro luz** (`#FFF0B8`): el brillo especular. Existe **solo** dentro del degradé
  del botón en hover; no es color de superficie ni de letra en ningún otro sitio.
- **Ámbar** (`#E08A1E`): el extremo cálido del degradé de marca. Reservado para el
  aviso «Necesita · X» de una pieza colapsada y para la luz rasante del fondo.

### Secondary — las caras de la lámina
- **Lámina** (`#100D0A`): el fondo de todo. No es negro puro a propósito: el foil
  de Ancestral tiene temperatura y un `#000` junto al oro se lee azul.
- **Lámina honda** (`#0A0806`): el canto oscuro y la barra de total.
- **Faceta** (`#17130F`): la cara que recibe luz — una pieza desplegada.
- **Faceta alta** (`#201A14`): la cara inclinada hacia la fuente — hover.
- **Faceta plegada** (`#131009`): la cara en sombra — una pieza no incluida.

### Tertiary — los pliegues
- **Monte** (`#D8A83C`): la arista que atrapa la luz. Sólida, 2px.
- **Valle** (`#6B6257`): la arista en sombra. Punteada, 2px. Da 3,2:1 sobre la
  lámina: es filete, nunca letra.

### Neutral
- **Hueso** (`#EDE4D2`): texto corrido. 15,2:1.
- **Hueso suave** (`#A9A094`): secundario y cifras en reposo. 7,1:1.
- **Papel** (`#F7F4EC`) / **Tinta** (`#14110D`): la lámina llevada al papel. Solo
  existen dentro de `@media print`.

### Named Rules

**La regla de la pieza que se sigue leyendo.** Una faceta plegada no se difumina
hasta desaparecer: cambia de cara, no de existencia. El suelo es que su título y
su descripción se lean sin esfuerzo, porque el cliente tiene que poder decidir
sobre lo que *no* contrató. Cuando una opción no elegida bajó a 0,62 de opacidad
sobre `hueso/65`, cayó por debajo de AA y hubo que subirla a 0,82 / `hueso/75`.

**La regla del oro que no es degradé de letra.** El oro es letra (8,7:1) pero
siempre plano. El degradé de foil vive en la arista de monte, en el relleno de un
botón y en el logotipo; nunca dentro de un carácter.

## Typography

**Display:** Big Shoulders Display Variable · **Ficha:** Azeret Mono Variable ·
**Texto:** Asap Variable. Las tres autoalojadas desde el proyecto.

**Character:** Big Shoulders es condensada y de corte anguloso, del mismo aire que
las versales en arco del logotipo («COCINA ECUATORIANA», «DE AUTOR»), así que el
titular y la marca se ven parientes sin imitar el script —que no se imita: el
script *es* el logotipo y viaja como imagen. Azeret Mono es la letra de una ficha
técnica y sostiene el registro de instrumento que pide el mundo Miura. Asap es
humanista y tranquila con tildes y eñes, que en español no es un detalle menor.

### Hierarchy
- **Monumental** (700, `clamp(2.6rem, 6.5vw, 5rem)`, 0.9): un titular por página.
- **Título** (600, `clamp(1.75rem, 3.6vw, 2.6rem)`, 0.98): título de fase.
- **Rubro** (600, 1.32rem, 1.12): nombre de una pieza, pregunta de un grupo.
- **Guía** (400, 1.05rem, 1.6): el párrafo que abre la página.
- **Cuerpo** (400, 0.97rem, 1.58): descripción de una pieza. Medida 54–58ch.
- **Menudo** (400, 0.86rem, 1.5): nota de fase, condiciones, pie.
- **Rótulo** (500, 0.68rem, `0.18em`, versales, mono): etiqueta de ficha.

### Named Rules

**La regla de las tres voces.** Big Shoulders para lo que se anuncia, Asap para lo
que se lee, Azeret Mono para lo que se mide. Si una pieza pide una cuarta, el
problema es de jerarquía, no de tipografía.

**La regla de la cifra medida.** Todo número que signifique una cantidad —días,
dólares, unidades, fecha, número de cotización, id de pliegue— lleva la clase
`.cifra`: mono con `tabular-nums`. Es el único uso que una mono se gana, y el
motivo es funcional: en una columna de precios que cambia al tocar una pieza, las
cifras no pueden bailar de ancho.

**La regla del rótulo que no encabeza.** Los rótulos etiquetan un campo o una
condición. Nunca van encima de un titular haciendo de antetítulo — la página no
tiene ni uno.

## Layout

Una sola medida manda: **48rem** (`max-w-3xl`). Es un documento, no un tablero: la
columna estrecha es la que hace que un presupuesto de veinte piezas se lea de
corrido. Márgenes laterales `1.25rem` en móvil y `2rem` desde `sm`; aire al pie de
`6rem` para que la barra de total no se coma el último bloque.

Ritmo vertical: `2.75rem` entre fases, `0.5rem` entre piezas de una misma fase.
Siempre más aire encima de un título que debajo. Las piezas van casi pegadas a
propósito — son facetas contiguas de una misma lámina, no tarjetas sueltas.

La ficha de emisión es una rejilla de 4 columnas desde `sm` y de 2 en móvil. Las
dos facetas de condiciones son 2 columnas desde `sm` y se apilan debajo.

## Elevation & Depth

No hay sistema de sombras. **La profundidad se cuenta con luz sobre las caras**:
una faceta se lee más cerca o más lejos según el valor de su fondo, exactamente
como en una lámina plegada de verdad. Cuatro escalones —`faceta-plegada`,
`faceta`, `faceta-alta`, y el oro de la arista— y ni una sombra proyectada.

La única excepción es la barra de total, que sí flota sobre el contenido y por eso
lleva sombra desplazada y difusa más `backdrop-filter`. Es la única pieza de la
página que está en otro plano.

### Named Rules

**La regla de la luz que viene de un sitio.** La luz rasante del fondo entra desde
arriba a la izquierda, como en la fachada real del local. Todo degradé de foil
sigue esa dirección. Un halo de color sin desplazamiento no es luz, es decoración,
y en este mundo no existe.

## Shapes

**El paralelogramo es la única forma.** Un solo ángulo de sesgo, `-11deg`, para
todo control: botón, paso de contador, marca de pliegue, marca de opción, viñeta,
sello de «recomendada», faceta de la tira de superficie. Si dos elementos se
sesgan distinto, dejan de pertenecer a la misma lámina.

**El chaflán** de `0.85rem` va **solo arriba a la derecha**, en todo bloque. Se
probó también abajo a la izquierda —simétrico, más bonito en abstracto— y cortaba
justo el filete del pliegue monte, que es el que carga el estado de la pieza. El
canto izquierdo queda entero porque ahí vive la información.

No hay ni un `border-radius` en el sistema. Todo texto sesgado se contra-sesga en
su hijo, para que se lea recto: sin eso la pieza no parece plegada, parece torcida.

## Components

### La lámina (componente firma)
El fondo de toda página, en `position: fixed`. Es un patrón Miura calculado, no una
retícula: filas de paralelogramos donde los pliegues horizontales son rectos y los
verticales zigzaguean desplazándose `D` en filas alternas. Tres capas — las
facetas con su valor propio, los pliegues (monte sólido en oro, valle punteado en
ceniza), y la luz rasante con oscurecimiento hacia los cantos.

**La regla de la celda que no se cuenta.** La teselación es el material, no el
contenido. Con celda de 132×92 al 55% de opacidad leía como un panal y el fondo
pasaba de lámina a plantilla; con celda de 94×62 al 34% vuelve a ser grano. Si el
visitante puede contar las celdas, está demasiado fuerte.

En papel desaparece: un fondo fijo se imprime distinto en cada navegador.

### La faceta de pieza
El componente central del cotizador. Tres estados, y cada uno es un estado del
material:

- **Desplegada** (incluida): fondo `faceta`, arista de monte en oro creciendo con
  `scaleY`, marca de pliegue rellena de oro con su tilde.
- **Plegada** (no incluida): fondo `faceta-plegada`, arista de valle punteada en
  ceniza, marca de pliegue vacía. **Legible.**
- **Colapsada** (le falta el requisito): pierde el aire interior —el relleno
  vertical baja a `0.7rem`— y cae a 0,42 de opacidad, sin puntero. Muestra
  «Necesita · X» en ámbar. Sigue en la lámina: el cliente tiene que ver qué se
  llevó consigo la pieza que acaba de soltar.

### El grupo excluyente
Un pliegue solo dobla hacia un lado. El grupo lleva un aro interior de oro al 22% y
sus opciones no son tarjetas independientes sino cantos de un mismo pliegue: fondo
translúcido, arista de oro sólida en la elegida, `0.82` de opacidad en las demás.

### La tira de superficie
Una faceta por pieza del presupuesto, encendida cuando la pieza está desplegada.
Dice cuánto de la lámina está abierta — el mismo dato que el precio, dicho en el
material en vez de en dólares. No es un indicador de progreso: no hay meta que
alcanzar.

### Botones
- **Oro:** degradé de foil a 105° (`oro-hondo → oro → oro-claro`), texto en lámina.
  Hover aclara toda la rampa un escalón hasta `oro-luz`.
- **Contorno:** sin fondo, aro interior de 1px al 28% que pasa a oro sólido y el
  texto a `oro-claro` en hover.
- Ambos sesgados `-11deg` con el contenido contra-sesgado.

### El documento impreso
La lámina llevada al papel: `@media print` invierte la página entera a papel/tinta,
apaga el fondo fijo, quita los chaflanes (en tinta una esquina cortada parece un
error de impresión, no una decisión) y sustituye toda la lista interactiva por la
tabla de detalle con carátula y firmas. El logotipo cambia de `mix-blend-mode:
lighten` a `normal`, porque contra el papel `lighten` lo borraría entero.

## Do's and Don'ts

### Do:
- **Do** contar el estado con la cara y la arista, no con un control prestado.
- **Do** sesgar todo control a `-11deg` y contra-sesgar su contenido.
- **Do** poner el chaflán arriba a la derecha, siempre.
- **Do** marcar toda cifra medida con `.cifra`.
- **Do** dejar legible una pieza plegada. Es la regla más dura del sistema.
- **Do** verificar que un token de tamaño no choque de nombre con uno de color:
  `--text-lamina` y `--color-lamina` generan la misma utilidad `text-lamina` en
  Tailwind v4, gana el color, y el titular sale invisible. Por eso se llama
  `--text-monumental`.

### Don't:
- **Don't** usar `border-radius`. Ni una esquina redondeada.
- **Don't** poner degradé dentro de un carácter.
- **Don't** añadir sombras proyectadas a las facetas: la profundidad es luz sobre
  la cara, y una sombra convierte la lámina en una pila de tarjetas.
- **Don't** subir la opacidad del campo de pliegues hasta que se puedan contar las
  celdas.
- **Don't** rediseñar el logotipo. No hay vector; el script viaja como imagen
  compuesta con `mix-blend-mode: lighten` y solo funciona sobre fondo oscuro.
- **Don't** inventar platos, precios, horarios, direcciones ni el dominio. Ver
  PRODUCT.md.
