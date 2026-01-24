'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode
} from 'react';
import {messages, Lang} from './i18n';

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: keyof typeof messages['en']) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({children}: {children: ReactNode}) {
  const [lang, setLang] = useState<Lang>('en');

  function t(key: keyof typeof messages['en']) {
    return messages[lang][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{lang, setLang, t}}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return ctx;
}
