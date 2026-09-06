/* Journal d'événements de conversion — consultable dans /#/admin.
   Permet d'identifier où les visiteurs abandonnent le parcours. */

import { recordEvent } from "./store";

export function track(name: string, data?: Record<string, string>) {
  recordEvent(name, data);
}

export const trackCta = (source: string) => track("cta_click", { source });
export const trackPhone = () => track("phone_click");
export const trackWhatsApp = () => track("whatsapp_click");
