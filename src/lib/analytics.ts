/** Hooks kept intentionally side-effect free until a privacy-compliant analytics provider is configured. */
export function track(_name: string, _data?: Record<string, string>) {}

export const trackCta = (source: string) => track("cta_click", { source });
export const trackPhone = () => track("phone_click");
export const trackWhatsApp = () => track("whatsapp_click");
export const trackPageView = (pathname: string) => track("page_view", { pathname });
export const trackFormSuccess = (ref: string, sourcePage: string) =>
  track("form_submit_success", { ref, sourcePage });
