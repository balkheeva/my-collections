import { Context, ReactNode, createContext, useState } from 'react';
import { IntlProvider } from 'react-intl';

import locales from '../../constants/locales';
import enMessages from '../../localizations/en.json';
import ruMessages from '../../localizations/ru.json';

type LocaleValue = string;

const messages = {
  [locales.RU]: ruMessages,
  [locales.EN]: enMessages,
};

const localizationContext: Context<{
  currentLocale: LocaleValue;
  onSwitchLocale: (newLocale: LocaleValue) => void;
}> = createContext<any>(locales.EN) as any;

export { localizationContext };

export function LocaleProvider(props: { children: ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<LocaleValue>(
    () => (localStorage.getItem('locale') as LocaleValue) || (navigator.language.includes('en') ? 'en' : 'ru'),
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
      <IntlProvider locale={currentLocale} messages={messages[currentLocale]}>
        {props.children}
      </IntlProvider>
    </localizationContext.Provider>
  );
}
