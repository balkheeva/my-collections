import { Context, ReactNode, createContext, useEffect, useState } from 'react';

import locales from '../../constants/locales';

type LocaleValue = string;

const localizationContext: Context<{
  currentLocale: LocaleValue;
  onSwitchLocale: (newLocale: LocaleValue) => void;
}> = createContext<any>(locales.EN) as any;

export { localizationContext };

export function LocaleProvider(props: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<LocaleValue>(
    () => (localStorage.getItem('locale') as LocaleValue) || 'en',
  );

  const value = {
    currentLocale,
    onSwitchLocale: (newLocale: LocaleValue) => {
      setCurrentLocale(newLocale);
      localStorage.setItem('locale', newLocale);
    },
  };
  return (
    <localizationContext.Provider value={value}>
      {props.children}
    </localizationContext.Provider>
  );
}
