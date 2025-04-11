import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useColorScheme } from "react-native";

const ThemeContext = createContext<ThemeContextType | null>(null)

export function useTheme() {
  const themeCtx = useContext(ThemeContext)

  if(themeCtx === null)
    throw new Error("Theme ctx is null!")

  return themeCtx
}

export type ThemeContextType = {
  colors: ThemeColorsType
}

export type ThemeColorsType = {
  primary: string,
  secondary: string,
  onPrimary: string,
  onSecondary: string,
  background: string,
  onBackground: string,
  error: string,
  onError: string
}

const lightMode: ThemeColorsType = {

}

const darkMode: ThemeColorsType = {

}

function ThemeContextProvider({children}: {children: ReactNode}) {
  const [colors, setColors] = useState<ThemeColorsType>(lightMode)
  let colorScheme = useColorScheme();

  useEffect(() => {
    setColors(colorScheme === 'dark' ? darkMode : lightMode)
  }, [colorScheme])

  const ctx: ThemeContextType = {
    colors
  }

  return <ThemeContext.Provider value={ctx}>{children}</ThemeContext.Provider>
}

export default ThemeContextProvider