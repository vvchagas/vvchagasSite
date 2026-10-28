/**
 * Canais públicos de contato. Fonte única para header, footer, hero,
 * /contato e barra fixa mobile: mudou o número, muda aqui.
 */

/** DDI + DDD + número, só dígitos (o wa.me exige o DDI, ex: 55). */
export const WHATSAPP_NUMBER = "5514997760049";

/**
 * E-mail público. Vazio = usa o link antigo do Gmail (só funciona na SUA conta).
 * Preencha para um mailto: que funciona para qualquer visitante.
 */
export const CONTACT_EMAIL = "";

const LEGACY_GMAIL_COMPOSE =
  "https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZXhjGdXcDqqFVrNpsqdnDjmqDsNHZLZBKLWqnWNGkCVZSfTPmBxgsJLDhNQTtmnCbFsFL";

export function waLink(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function mailLink(subject: string): string {
  return CONTACT_EMAIL
    ? `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
    : LEGACY_GMAIL_COMPOSE;
}
