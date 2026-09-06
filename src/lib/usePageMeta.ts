import { useEffect } from "react";

/** SEO par page : title + meta description + Open Graph. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    const ensureMeta = (attr: "name" | "property", key: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`
      );
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      return el;
    };

    ensureMeta("name", "description").setAttribute("content", description);
    ensureMeta("property", "og:title").setAttribute("content", title);
    ensureMeta("property", "og:description").setAttribute("content", description);
  }, [title, description]);
}
