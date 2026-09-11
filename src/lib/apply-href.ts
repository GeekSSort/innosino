/**
 * Applications go to the one address the site already publishes. A careers@
 * alias would be a mailbox nobody can promise is read — the same reason the
 * Organization markup refuses to invent a street address.
 */
export const applyHref = (email: string, role: string) =>
  `mailto:${email}?subject=${encodeURIComponent(`Application — ${role}`)}`;
