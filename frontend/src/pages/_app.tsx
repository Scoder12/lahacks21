import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme,
} from "@chakra-ui/react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/style.css";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#a24cc4",
      200: "#222",
      300: "#333",
      400: "#eee",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
          initialColorMode: "dark",
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
