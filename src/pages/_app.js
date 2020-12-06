import { ColorModeProvider, CSSReset, ThemeProvider } from "@chakra-ui/core";
import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider value="dark">
        <CSSReset />
        <Component {...pageProps} />
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default MyApp;
