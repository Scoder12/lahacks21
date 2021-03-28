import {
  ChakraProvider,
  ColorModeProvider,
  extendTheme,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "../styles/sample_project.css";
import "../styles/style.css";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#a24cc4",
      200: "#222",
      300: "#333",
      400: "#eee",
      500: "#444",
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("brand.200", "brand.200")(props),
      },
    }),
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
          bg: "brand.100",
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
          textAlign: "center",
          fontSize: "30px",
        },
      },
    },
    // kinda hacky
    Link: {
      baseStyle: {
        color: "#eee",
        _hover: { color: "brand.100", textDecoration: "none" },
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
