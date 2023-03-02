import { Context, ReactNode, createContext, useEffect, useState } from 'react';

type ThemeValues = 'dark' | '';

const themeContext: Context<{
  theme: ThemeValues;
  onToggleTheme: (newTheme: ThemeValues) => void;
}> = createContext(null) as any;
export { themeContext };

export function ThemeProvider(props: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeValues>(
    () => (localStorage.getItem('theme') as ThemeValues) || '',
  );

  useEffect(() => {
    if (theme) {
      document.body.classList.add(theme);
      localStorage.setItem('theme', theme);
    } else {
      document.body.classList.remove('dark');
      localStorage.removeItem('theme');
    }
  }, [theme]);

  const value = {
    theme,
    onToggleTheme: (newTheme: ThemeValues) => setTheme(newTheme),
  };

  return (
    <themeContext.Provider value={value}>
      {props.children}
    </themeContext.Provider>
  );
}
