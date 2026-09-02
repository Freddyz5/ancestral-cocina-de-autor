/**
 * Piezas del presupuesto — landing + carta digital para Ancestral. El precio
 * se calcula como días × tarifa, y la tarifa se ajusta acá abajo. Hay tres
 * tipos de pieza:
 *
 *   toggle    — se despliega o se deja plegada (lo de siempre).
 *   contador  — cantidad variable: secciones extra, páginas nuevas, horas.
 *   opcion    — grupo excluyente: hay que elegir una de las alternativas.
 *
 * El grupo excluyente existe por un motivo concreto: si la carta va sin panel,
 * alguien tiene que cargar los platos igual. Obligar a elegir cómo se cierra
 * ese agujero en la reunión, en vez de descubrirlo después.
 *
 * `requiere` apunta al id de un toggle o de una opción, y se hace cumplir de
 * verdad: si el requisito no está desplegado, la pieza se colapsa y no suma.
 * Esa cadena es el grafo de pliegues de la lámina — soltar «carta pública»
 * colapsa la rama entera que cuelga de ella.
 *
 * Los pedidos con pago en línea no viven aquí a propósito: no hay pasarela
 * decidida, así que no tiene sentido ponerles días.
 */

/** Tarifa por jornada de trabajo. Se cambia acá, no desde la página. */
export const TARIFA_POR_DIA = 20;

/**
 * Datos de la carátula del documento impreso. La página se usa en la reunión;
 * la hoja impresa es lo que se lleva el cliente, y ahí sí hacen falta las
 * formalidades: quién lo emite, para quién y hasta cuándo sostiene el precio.
 */
export const PROPUESTA = {
  cliente: 'Ancestral · Cocina de Autor',
  preparadoPor: 'Freddy Tacuri',
  /** Prefijo del número de cotización. */
  serie: 'AN',
  /** Días que se sostiene el precio desde la emisión. */
  validezDias: 15,
};

export interface PiezaToggle {
  tipo: 'toggle';
  id: string;
  nombre: string;
  dias: number;
  marcada: boolean;
  descripcion: string;
  /** Frase que se agrega a la descripción según la opción elegida en un grupo. */
  variantes?: Record<string, string>;
  requiere?: string;
}

export interface PiezaContador {
  tipo: 'contador';
  id: string;
  nombre: string;
  diasPorUnidad: number;
  inicial: number;
  min: number;
  max: number;
  descripcion: string;
  unidad: { singular: string; plural: string };
  requiere?: string;
}

export interface Opcion {
  id: string;
  nombre: string;
  dias: number;
  descripcion: string;
  recomendada?: boolean;
}

export interface GrupoOpcion {
  tipo: 'opcion';
  id: string;
  pregunta: string;
  opciones: Opcion[];
  inicial: string;
  requiere?: string;
}

export type ItemPresupuesto = PiezaToggle | PiezaContador | GrupoOpcion;

export interface FasePresupuesto {
  nombre: string;
  nota?: string;
  items: ItemPresupuesto[];
}

export const FASES_PRESUPUESTO: FasePresupuesto[] = [
  {
    nombre: 'Fase 1 · Landing',
    nota: 'El cliente entrega los textos y las fotografías de los platos. Se realizan dos rondas de revisión por sección.',
    items: [
      {
        tipo: 'toggle',
        id: 'landing-base',
        nombre: 'Landing de presentación',
        dias: 2,
        marcada: true,
        descripcion:
          'Incluye 5 secciones: portada, la cocina y el chef, platos destacados, ubicación y horarios, y cierre con reserva por WhatsApp — más cabecera y pie. El texto final se define con el cliente, ajustes finales y publicación en la web.',
      },
      {
        tipo: 'contador',
        id: 'paginas-extra',
        nombre: 'Subpágina',
        diasPorUnidad: 1.5,
        inicial: 0,
        min: 0,
        max: 4,
        unidad: { singular: 'página', plural: 'páginas' },
        requiere: 'landing-base',
        descripcion:
          'Una página adicional accesible desde el menú — por ejemplo Catering y Eventos, o Bar y coctelería. Incluye hasta 3 secciones. Si hacen falta más secciones, se agregan en la pieza siguiente.',
      },
      {
        tipo: 'contador',
        id: 'secciones-extra',
        nombre: 'Sección informativa adicional',
        diasPorUnidad: 0.75,
        inicial: 0,
        min: 0,
        max: 6,
        unidad: { singular: 'sección', plural: 'secciones' },
        requiere: 'landing-base',
        descripcion: 'Una sección con texto, imágenes y diseño propio.',
      },
      {
        tipo: 'toggle',
        id: 'galeria',
        nombre: 'Galería de platos',
        dias: 1.5,
        marcada: false,
        requiere: 'landing-base',
        descripcion:
          'Galería de fotografías con vista ampliada, pensada para que los platos se vean grandes en el teléfono. Las imágenes se optimizan para que la página no se vuelva lenta.',
      },
    ],
  },
  {
    nombre: 'Fase 2 · Carta digital',
    items: [
      {
        tipo: 'toggle',
        id: 'carta-base',
        nombre: 'Carta pública',
        dias: 8,
        marcada: true,
        descripcion:
          'Carta por categorías (entradas, fuertes, postres, bebidas, coctelería), ficha de cada plato con foto, descripción y precio, buscador, marcado de disponibilidad y reserva por WhatsApp — con datos reales en base de datos, no de muestra.',
        variantes: {
          'carga-panel': 'Los platos y precios los cargan y actualizan ustedes desde el panel.',
          'carga-planilla': 'Los platos y precios salen de una planilla que ustedes editan.',
          'carga-inicial': 'Los platos los dejo cargados yo una vez; después la carta queda fija.',
        },
      },
      {
        tipo: 'opcion',
        id: 'carga',
        pregunta: '¿Cómo entran y se actualizan los platos y los precios?',
        inicial: 'carga-panel',
        requiere: 'carta-base',
        opciones: [
          {
            id: 'carga-panel',
            nombre: 'Panel de administración',
            dias: 7,
            recomendada: true,
            descripcion:
              'Cuentas para 2 administradores, formulario de ingreso de platos (foto, nombre, categoría, descripción, precio, disponibilidad) y vista de la carta completa. Autonomía total: subir un plato nuevo o cambiar un precio sin depender del desarrollador.',
          },
          {
            id: 'carga-planilla',
            nombre: 'Planilla de Google Sheets',
            dias: 3,
            descripcion:
              'Documento compartido en Google Sheets donde los administradores editan platos y precios. La planilla se sincroniza con la carta automáticamente, sin intervención del desarrollador. No incluye subida de fotos: las imágenes se cargan a la nube aparte y se pegan los enlaces en la planilla.',
          },
          {
            id: 'carga-inicial',
            nombre: 'Carta fija',
            dias: 1,
            descripcion:
              'Carga realizada por el desarrollador (hasta 60 platos) una sola vez, con lo que el cliente proporcione. Después la carta queda fija: no hay panel ni planilla para actualizarla.',
          },
        ],
      },
      {
        tipo: 'toggle',
        id: 'imagenes',
        nombre: 'Manejo de fotografías',
        dias: 2,
        marcada: false,
        requiere: 'carga-panel',
        descripcion:
          'Subida de fotografías desde el panel, con generación automática de las versiones necesarias: cuadrada para la carta y el feed, vertical para historias. Las imágenes se optimizan para reducir el tiempo de carga.',
      },
      {
        tipo: 'toggle',
        id: 'carta-pdf',
        nombre: 'Carta en PDF',
        dias: 2,
        marcada: false,
        requiere: 'carta-base',
        descripcion:
          'Documento PDF descargable con la carta completa o con una categoría determinada, sincronizado automáticamente con la carta. Sirve para enviarlo por WhatsApp o para imprimirlo cuando cambia un precio.',
      },
      {
        tipo: 'toggle',
        id: 'qr-mesa',
        nombre: 'Carta por código QR en mesa',
        dias: 1,
        marcada: false,
        requiere: 'carta-base',
        descripcion:
          'Código QR listo para imprimir que abre la carta en el teléfono del comensal, con enlaces individuales por categoría. La impresión de los códigos corre por cuenta del cliente.',
      },
      {
        tipo: 'toggle',
        id: 'menus-evento',
        nombre: 'Menús de catering y eventos',
        dias: 3,
        marcada: false,
        requiere: 'carta-base',
        descripcion:
          'Sección aparte para Grupo Ancestral: menús por tipo de evento con lo que incluye cada uno, número de invitados de referencia, y un formulario que arma solo el mensaje de WhatsApp con la fecha y el número de personas.',
      },
      {
        tipo: 'toggle',
        id: 'extras',
        nombre: 'Etiquetas y platos más pedidos',
        dias: 1,
        marcada: false,
        requiere: 'carta-base',
        descripcion:
          'Etiquetas «Nuevo», «Recomendado del chef» y «Picante» para destacar platos dentro de la carta, y un registro de cuántas veces se consultó cada plato.',
      },
    ],
  },
  {
    nombre: 'SEO y posicionamiento',
    nota: 'Enfocado en que el restaurante aparezca primero al buscar su nombre y en el mapa, no en competir por palabras genéricas.',
    items: [
      {
        tipo: 'toggle',
        id: 'seo-basico',
        nombre: 'SEO básico',
        dias: 1,
        marcada: false,
        descripcion:
          'Título y descripción en cada página, sitemap.xml y robots.txt generados automáticamente, y datos estructurados (Schema.org de Restaurante y de Menú) que identifican al negocio ante Google.',
      },
      {
        tipo: 'toggle',
        id: 'seo-perfil-google',
        nombre: 'Perfil de Google y Search Console',
        dias: 0.5,
        marcada: false,
        requiere: 'seo-basico',
        descripcion:
          'Verificación del sitio en Google Search Console y envío del sitemap. Configuración inicial del Perfil de Negocio en Google (nombre, dirección, horario, categoría, fotos) para aparecer en el mapa y en la ficha lateral al buscar el nombre del restaurante.',
      },
    ],
  },
  {
    nombre: 'Post-venta',
    items: [
      {
        tipo: 'contador',
        id: 'bolsa-soporte',
        nombre: 'Servicio de soporte por hora',
        // Una hora es un cuarto de jornada: así el soporte sigue midiéndose
        // con la misma vara que el resto del presupuesto.
        diasPorUnidad: 0.25,
        inicial: 0,
        min: 0,
        max: 40,
        unidad: { singular: 'hora', plural: 'horas' },
        descripcion:
          'Cambios de texto, precios y ajustes menores posteriores a la publicación. Se acuerda una reunión para programar el trabajo y se descuenta según las horas efectivamente utilizadas.',
      },
    ],
  },
];

/** Costos que corren por cuenta del cliente: no son días de trabajo del desarrollador. */
export const COSTOS_RECURRENTES = [
  'Dominio: aproximadamente $25 al año, contratado a nombre del cliente.',
  'Hosting y base de datos: la carta con panel de administración requiere un servidor activo. Se contrata a nombre del cliente y se factura mensualmente. El valor depende del mercado.',
];

/** Lo que el presupuesto no cubre. Los presupuestos se pelean por lo que no dicen. */
export const NO_INCLUYE = [
  'Redacción de textos y sesión fotográfica de los platos.',
  'Carga de contenido, salvo que se contrate la carga inicial realizada por el desarrollador.',
  'Pasarela de pagos, pedidos en línea y reservas con confirmación automática.',
  'Impresión de cartas físicas, códigos QR o cualquier pieza gráfica fuera de la web.',
  'Posicionamiento por palabras clave genéricas y campañas de publicidad paga.',
];

/** Nombre legible de cada id — para el cartel «Necesita: …» de las piezas colapsadas. */
export const NOMBRE_POR_ID: Record<string, string> = Object.fromEntries(
  FASES_PRESUPUESTO.flatMap((fase) =>
    fase.items.flatMap((item) =>
      item.tipo === 'opcion'
        ? item.opciones.map((opcion) => [opcion.id, opcion.nombre] as const)
        : [[item.id, item.nombre] as const],
    ),
  ),
);
