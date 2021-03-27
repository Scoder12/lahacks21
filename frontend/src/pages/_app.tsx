import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme,
} from "@chakra-ui/react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/style.css";
import "../styles/sample_project.css";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#a24cc4",
      200: "#222",
      300: "#333",
      400: "#eee",
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "7px",
        _hover: { opacity: "0.5" },
      },
      sizes: {
        sm: {
          w: "110px",
          h: "40px",
          fontSize: "17px",
          fontWeight: "500",
        },
        lg: {
          w: "100%",
          h: "2.5rem",
        },
      },
      variants: {
        primary: {
          bg: "#a24cc4",
        },
        secondary: {
          bg: "transparent",
          borderColor: "#eeeeee",
          borderWidth: "2px",
          borderStyle: "solid",
        },
        fullW: {
          w: "100%",
        },
      },
    },
    Text: {
      variants: {
        h1: {
          fontSize: "30px",
        },
      },
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
