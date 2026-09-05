/*
  Forma de los datos que consume el módulo. Todo el contenido y todas las
  cifras viven en src/constants/quote.json; aquí sólo se describe su forma.

  El cambio de modelo respecto de la versión anterior: **no hay tiempo en el
  cálculo**. Antes cada pieza declaraba jornadas y el precio salía de
  multiplicarlas por una tarifa; ahora cada pieza trae su precio ya cerrado y
  el total es una suma. Una pieza vale lo que vale por lo que entrega, no por
  lo que tarda, y el cliente no tiene que auditar jornadas para entender la
  cifra.
*/

export interface UnitLabels {
  singular: string;
  plural: string;
}

/** Pieza que se marca o no. */
export interface ToggleItem {
  kind: 'toggle';
  id: string;
  name: string;
  price: number;
  initial: boolean;
  description: string;
  /** Frase que se añade a la descripción según la opción elegida en un grupo. */
  variants?: Record<string, string>;
  requires?: string;
  /** Etiqueta de referencia tipo «F2.1». Es la columna Ref. del documento. */
  tag?: string;
}

/** Pieza de cantidad variable: subpáginas, secciones extra, horas de soporte. */
export interface CounterItem {
  kind: 'counter';
  id: string;
  name: string;
  pricePerUnit: number;
  initial: number;
  min: number;
  max: number;
  unit: UnitLabels;
  description: string;
  requires?: string;
  tag?: string;
}

export interface ChoiceOption {
  id: string;
  name: string;
  price: number;
  description: string;
  recommended?: boolean;
  tag?: string;
}

/** Grupo excluyente: hay que elegir una de las alternativas. */
export interface ChoiceGroup {
  kind: 'choice';
  id: string;
  question: string;
  initial: string;
  options: ChoiceOption[];
  requires?: string;
}

export type QuoteItem = ToggleItem | CounterItem | ChoiceGroup;

export interface Phase {
  id: string;
  name: string;
  note?: string;
  items: QuoteItem[];
}

/** Procedencia de las cifras. No entra en el cálculo: está para que dentro de
    seis meses se sepa de dónde salieron y cuándo se actualizaron. */
export interface PricingSource {
  source: string;
  updated: string;
}

export interface QuoteSettings {
  pricing: PricingSource;
  validityDays: number;
  quotePrefix: string;
  preparedBy: string;
  client: string;
  subject: string;
}

export interface QuoteData {
  meta: { title: string; description: string };
  settings: QuoteSettings;
  phases: Phase[];
  recurringCosts: string[];
  notIncluded: string[];
  ui: Record<string, string>;
  /* Rótulos de la propuesta impresa: sólo los ve el papel, no la pantalla. */
  document: Record<string, string>;
}

/*
  El estado. Objetos planos y no Map a propósito: así la selección se serializa
  a la URL y se vuelca al DOM sin conversiones intermedias.
*/
export interface Selection {
  toggles: Record<string, boolean>;
  counters: Record<string, number>;
  choices: Record<string, string>;
}

export interface QuoteLine {
  id: string;
  phaseId: string;
  name: string;
  quantity: number;
  amount: number;
}

export interface PhaseTotal {
  phaseId: string;
  amount: number;
  lines: QuoteLine[];
}

export interface QuoteResult {
  lines: QuoteLine[];
  byPhase: PhaseTotal[];
  totalAmount: number;
  partCount: number;
  /** id → su requisito está satisfecho. Incluye piezas, grupos y opciones. */
  available: Record<string, boolean>;
  /** Opciones que además de elegidas están contando (su grupo no está bloqueado). */
  activeOptions: string[];
}
