/**
 * Datos reales de Ancestral. Un solo lugar para cambiarlos.
 * Fuente: marca/ (las cuatro capturas), el perfil de Instagram
 * @ancestralcocinadeautor y la página de Facebook «Grupo Ancestral Ec».
 */

/** Número de WhatsApp en formato internacional, solo dígitos. */
export const WHATSAPP = '593979196044';

/** El mismo número, escrito como lo lee un ecuatoriano. */
export const WHATSAPP_LEGIBLE = '0979 196 044';

export const INSTAGRAM = 'ancestralcocinadeautor';
export const INSTAGRAM_URL = 'https://instagram.com/ancestralcocinadeautor';

export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61579061879221';
export const FACEBOOK_NOMBRE = 'Grupo Ancestral Ec · Catering y Eventos';

/**
 * Texto literal de la bio de Instagram. No se expande: no está confirmado
 * cuál de las tres ciudades tiene local y cuál es solo cobertura de catering.
 */
export const CIUDADES = ['Latacunga', 'Ambato', 'Salcedo'];

export const SITIO = {
  nombre: 'Ancestral',
  descriptor: 'Cocina de Autor',
  arco: 'Cocina Ecuatoriana',
  chef: 'Alexander Santamaría',
  grupo: 'Grupo Ancestral',
  serviciosGrupo: 'Catering · Gastronomía · Eventos',
  lema: 'Alta gastronomía por el Chef Alexander Santamaría',
  titulo: 'Ancestral · Cocina de Autor',
  /*
   * Encuadre literal de la bio de Instagram. No dice «restaurante en Latacunga,
   * Ambato y Salcedo»: PRODUCT.md deja sin confirmar cuál de las tres ciudades
   * tiene local y cuál es solo cobertura de catering, y esta cadena se publica
   * en <meta name="description"> y og:description de todas las páginas.
   */
  descripcion:
    'Alta gastronomía por el Chef Alexander Santamaría. Cocina ecuatoriana de autor, catering y eventos. Latacunga · Ambato · Salcedo.',
};

/** Arma el enlace de WhatsApp con el mensaje ya escrito. */
export function whatsapp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
}
