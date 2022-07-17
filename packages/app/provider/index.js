import { NavigationProvider } from './navigation'
import React from 'react'
import { NativeBaseProvider, extendTheme } from 'native-base'
import { Appearance } from "react-native";

export function Provider({ children }) {

  const colorScheme = Appearance.getColorScheme();

  const theme = extendTheme({
    config: {
      initialColorMode: colorScheme,
    },
  });

  return (
    <NavigationProvider>
      <NativeBaseProvider isSSR={true} theme={theme}>{children}</NativeBaseProvider>
    </NavigationProvider>
  )
}
