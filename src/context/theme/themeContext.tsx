import {Context, createContext, ReactNode, useState} from "react";

const themeContext: Context<{ mode: string | null}> = createContext<any>(null) as any
export {themeContext}
export function ThemeProvider(props: {children: ReactNode}) {

    const [theme, setTheme] = useState('light')
    function toggleTheme() {
        if (theme === "dark") setTheme("light")
        else setTheme("dark")
    }
    const value = {
        theme: theme,
        toggleTheme: toggleTheme
    }

    return (
        <themeContext.Provider></>
    )

}
