/*
  Puente entre el modelo y el DOM. El estado vive aquí, en un único objeto
  Selection; el DOM es la vista y nunca la fuente de verdad. Cada interacción
  hace lo mismo: cambia la selección, la normaliza contra los requisitos,
  recalcula y vuelve a pintar.

  Las clases que pinta son las del mundo de Ancestral, no estados genéricos:
  `desplegada` es una faceta abierta, `colapsada` es una que perdió su
  requisito y cayó plana. La cadena de `requires` es el grafo de pliegues.
*/
import {
  clampCounter,
  computeQuote,
  indexQuote,
  pruneSelection,
  type QuoteIndex,
} from './quote';
import { decodeSelection, isReadonly, syncUrl } from './url';
import { formatIssueDate, formatMoney, pluralize, quoteNumber, type Lang } from './format';
import type { CounterItem, QuoteData, QuoteResult, Selection } from './types';

/** Cuánto dura el aviso del botón de guardar antes de volver a su etiqueta. */
const NOTICE_MS = 2600;

interface Refs {
  pieces: HTMLElement[];
  options: HTMLElement[];
  variants: HTMLElement[];
  phaseTotals: HTMLElement[];
  surfaceCells: HTMLElement[];
  totalAmount: HTMLElement | null;
  totalCount: HTMLElement | null;
  docPhases: HTMLElement[];
  docTotalAmount: HTMLElement | null;
}

function collect(root: ParentNode): Refs {
  return {
    pieces: Array.from(root.querySelectorAll<HTMLElement>('[data-piece]')),
    options: Array.from(root.querySelectorAll<HTMLElement>('[data-option]')),
    variants: Array.from(root.querySelectorAll<HTMLElement>('[data-variant]')),
    phaseTotals: Array.from(root.querySelectorAll<HTMLElement>('[data-phase-total]')),
    surfaceCells: Array.from(root.querySelectorAll<HTMLElement>('[data-surface-cell]')),
    totalAmount: root.querySelector('[data-total-amount]'),
    totalCount: root.querySelector('[data-total-count]'),
    docPhases: Array.from(root.querySelectorAll<HTMLElement>('[data-doc-phase]')),
    docTotalAmount: root.querySelector('[data-doc-total-amount]'),
  };
}

export function mountQuote(root: HTMLElement, data: QuoteData, lang: Lang): void {
  const index = indexQuote(data);
  const refs = collect(root);
  const ui = data.ui;

  const params = new URLSearchParams(location.search);
  const readonly = isReadonly(params);
  let selection: Selection = decodeSelection(params, data, index);

  const money = (value: number) => formatMoney(value, lang);

  /** «2 páginas · $60», o «$30 c/u» mientras el contador está en cero. */
  function priceForCounter(item: CounterItem, count: number): string {
    if (count === 0) return `${money(item.pricePerUnit)} ${ui.each}`;
    const unit = pluralize(count, item.unit.singular, item.unit.plural);
    return `${count} ${unit} · ${money(count * item.pricePerUnit)}`;
  }

  function paintPieces(result: QuoteResult): void {
    const counted = new Set(result.lines.map((line) => line.id));

    for (const element of refs.pieces) {
      const id = element.dataset.id ?? '';
      const item = index.items.get(id);
      if (!item) continue;

      const free = result.available[id] !== false;
      element.classList.toggle('colapsada', !free);

      const lock = element.querySelector<HTMLElement>('[data-lock]');
      if (lock) lock.hidden = free;

      const price = element.querySelector<HTMLElement>('[data-line-price]');

      if (item.kind === 'toggle') {
        const on = counted.has(id);
        element.classList.toggle('desplegada', on);
        element.setAttribute('aria-pressed', String(on));
        /*
          `aria-disabled` y no `disabled`: una pieza colapsada tiene que seguir
          siendo alcanzable con el teclado, porque el motivo por el que está
          colapsada se lee dentro de ella. El clic se corta en el manejador.
        */
        element.setAttribute('aria-disabled', String(!free));
        if (price) price.textContent = money(item.price);
        continue;
      }

      if (item.kind === 'counter') {
        const count = selection.counters[id] ?? 0;
        element.classList.toggle('desplegada', count > 0);
        if (price) price.textContent = priceForCounter(item, count);

        const value = element.querySelector<HTMLElement>('[data-counter-value]');
        if (value) value.textContent = String(count);

        for (const step of element.querySelectorAll<HTMLButtonElement>('[data-step]')) {
          const delta = Number(step.dataset.step);
          step.disabled = !free || (delta < 0 ? count <= item.min : count >= item.max);
        }
      }
    }

    for (const element of refs.options) {
      const id = element.dataset.id ?? '';
      const groupId = element.dataset.group ?? '';
      const chosen = selection.choices[groupId] === id;
      element.classList.toggle('desplegada', chosen);
      element.setAttribute('aria-checked', String(chosen));

      const group = index.items.get(groupId);
      if (group?.kind !== 'choice') continue;
      const option = group.options.find((candidate) => candidate.id === id);
      const price = element.querySelector<HTMLElement>('[data-line-price]');
      if (option && price) price.textContent = money(option.price);
    }

    const active = new Set(result.activeOptions);
    for (const element of refs.variants) {
      element.hidden = !active.has(element.dataset.variant ?? '');
    }
  }

  function paintTotals(result: QuoteResult): void {
    if (refs.totalAmount) refs.totalAmount.textContent = money(result.totalAmount);
    if (refs.totalCount) {
      const parts = pluralize(result.partCount, ui.partSingular, ui.partPlural);
      refs.totalCount.textContent = `${result.partCount} ${parts}`;
    }

    /* El subtotal en la cabecera de cada fase, emparejado por id. */
    const byPhase = new Map(result.byPhase.map((phase) => [phase.phaseId, phase.amount]));
    for (const element of refs.phaseTotals) {
      const amount = byPhase.get(element.dataset.phaseTotal ?? '') ?? 0;
      element.textContent = amount > 0 ? money(amount) : ui.phaseEmpty;
    }

    /*
      La superficie desplegada: una faceta encendida por pieza incluida. Es el
      mismo dato que el precio, dicho en el material en vez de en dólares.
    */
    refs.surfaceCells.forEach((cell, position) => {
      cell.classList.toggle('encendida', position < result.partCount);
    });
  }

  /**
   * El documento ya tiene todas las filas en el marcado: aquí sólo se tapan las
   * que no se contrataron y se rellenan las cifras. Una fase sin nada elegido
   * desaparece entera, subtotal incluido.
   */
  function paintDocument(result: QuoteResult): void {
    const byId = new Map(result.lines.map((line) => [line.id, line]));

    refs.docPhases.forEach((body, position) => {
      const phase = result.byPhase[position];
      let visible = 0;

      for (const row of body.querySelectorAll<HTMLElement>('[data-doc-row]')) {
        const line = byId.get(row.dataset.id ?? '');
        row.hidden = !line;
        if (!line) continue;
        visible += 1;

        const quantity = row.querySelector<HTMLElement>('[data-doc-quantity]');
        if (quantity) quantity.textContent = line.quantity > 1 ? ` ×${line.quantity}` : '';
        const rowAmount = row.querySelector<HTMLElement>('[data-doc-amount]');
        if (rowAmount) rowAmount.textContent = money(line.amount);
      }

      body.hidden = visible === 0;

      const subtotal = body.querySelector<HTMLElement>('[data-doc-subtotal]');
      if (subtotal && phase) {
        const cellAmount = subtotal.querySelector<HTMLElement>('[data-doc-amount]');
        if (cellAmount) cellAmount.textContent = money(phase.amount);
      }
    });

    if (refs.docTotalAmount) refs.docTotalAmount.textContent = money(result.totalAmount);
  }

  let latest: QuoteResult;

  function render(): void {
    selection = pruneSelection(data, index, selection);
    latest = computeQuote(data, index, selection);
    paintPieces(latest);
    paintTotals(latest);
    paintDocument(latest);
    syncUrl(selection, readonly);
  }

  if (!readonly) wireEvents(root, index, () => selection, render);
  wireActions(root, data, () => latest);

  stampDocument(root, data, lang);
  render();
}

function wireEvents(
  root: HTMLElement,
  index: QuoteIndex,
  current: () => Selection,
  render: () => void,
): void {
  root.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const option = target.closest<HTMLElement>('[data-option]');
    if (option) {
      const group = option.dataset.group ?? '';
      const id = option.dataset.id ?? '';
      if (group && id) {
        current().choices[group] = id;
        render();
      }
      return;
    }

    const step = target.closest<HTMLElement>('[data-step]');
    if (step) {
      const piece = step.closest<HTMLElement>('[data-piece="counter"]');
      const item = index.items.get(piece?.dataset.id ?? '');
      if (piece && item?.kind === 'counter') {
        const selection = current();
        const now = selection.counters[item.id] ?? 0;
        selection.counters[item.id] = clampCounter(item, now + Number(step.dataset.step));
        render();
      }
      return;
    }

    const toggle = target.closest<HTMLElement>('[data-piece="toggle"]');
    if (toggle) {
      /* Colapsada: se puede enfocar y leer, pero no se puede desplegar. */
      if (toggle.getAttribute('aria-disabled') === 'true') return;
      const id = toggle.dataset.id ?? '';
      const selection = current();
      selection.toggles[id] = !selection.toggles[id];
      render();
    }
  });
}

/**
 * La selección no se guarda en ningún lado porque no hace falta: viaja entera
 * en la URL. Guardarla es quedarse con el enlace.
 */
function wireActions(root: HTMLElement, data: QuoteData, latest: () => QuoteResult): void {
  const print = root.querySelector<HTMLButtonElement>('[data-print]');
  print?.addEventListener('click', () => window.print());

  const save = root.querySelector<HTMLButtonElement>('[data-save]');
  const label = root.querySelector<HTMLElement>('[data-save-label]');
  let timer = 0;

  const notify = (text: string) => {
    if (!label) return;
    label.textContent = text;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      label.textContent = data.ui.save;
    }, NOTICE_MS);
  };

  save?.addEventListener('click', async () => {
    if (!latest().partCount) {
      notify(data.ui.saveEmpty);
      return;
    }
    try {
      await navigator.clipboard.writeText(location.href);
      notify(data.ui.saveDone);
    } catch {
      notify(data.ui.saveFallback);
    }
  });
}

function stampDocument(root: HTMLElement, data: QuoteData, lang: Lang): void {
  const today = new Date();

  for (const date of root.querySelectorAll<HTMLElement>('[data-doc-date]')) {
    date.textContent = formatIssueDate(today, lang);
  }

  const number = root.querySelector<HTMLElement>('[data-doc-number]');
  if (number) number.textContent = quoteNumber(today, data.settings.quotePrefix);
}
