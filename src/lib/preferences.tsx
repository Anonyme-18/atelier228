import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "fr" | "en";
export type Theme = "light" | "dark";

interface PreferencesValue {
  language: Language;
  theme: Theme;
  toggleLanguage: () => void;
  toggleTheme: () => void;
}

const PreferencesContext = createContext<PreferencesValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem("atelier228:language") as Language) || "fr"
  );
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("atelier228:theme") as Theme) || "light"
  );

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("atelier228:language", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("atelier228:theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      language,
      theme,
      toggleLanguage: () => setLanguage((current) => (current === "fr" ? "en" : "fr")),
      toggleTheme: () => setTheme((current) => (current === "light" ? "dark" : "light")),
    }),
    [language, theme]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences must be used inside PreferencesProvider");
  return value;
}
