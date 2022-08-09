import { ThemeProvider } from "styled-components";
import { CyclesProvider } from "./context/CyclesContext";
import { GlobalStyle } from "./global/global";
import { defaultTheme } from "./global/themes/default";
import { Router } from "./routes/Routes";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesProvider>
        <Router />
        <GlobalStyle />
      </CyclesProvider>
    </ThemeProvider>
  );
}
