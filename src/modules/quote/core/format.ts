/*
  Formato de cifras. Los decimales aparecen sólo cuando existen: hay importes
  redondos y otros con centavos, y «$240,00» sobra tanto como «$127,5» falta.

  El sitio es monolingüe (es-EC), pero `Lang` y `locale()` se conservan: el
  resto del módulo los importa, y así la moneda o el separador decimal se
  cambian en un único lugar si algún día hace falta otro locale, sin tocar el
  cálculo.

  Ya no hay formateo de jornadas. El presupuesto dejó de medirse en tiempo:
  cada pieza trae su precio cerrado y lo único que se formatea es dinero.
*/
export type Lang = 'es' | 'en';

const LOCALES: Record<Lang, string> = { es: 'es-EC', en: 'en-US' };

export function locale(lang: Lang): string {
  return LOCALES[lang] ?? LOCALES.en;
}

/** Importe en dólares, con centavos sólo si los hay. */
export function formatMoney(amount: number, lang: Lang): string {
  return `$${amount.toLocaleString(locale(lang), {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

/** Fecha larga de emisión del documento. */
export function formatIssueDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(locale(lang), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** N.º AN-20260902 — sello estable, legible y ordenable. */
export function quoteNumber(date: Date, prefix: string): string {
  const stamp = [
    String(date.getFullYear()).padStart(4, '0'),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('');
  return `${prefix}-${stamp}`;
}
