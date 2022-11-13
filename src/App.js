import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import { useContext } from "react";

import { ThemeProvider } from "styled-components";

import { CSSReset } from "./components/CSSReset";
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/ColorMode";
import RegisterVideo from './components/RegisterVideo';

const theme = {
  light: {
    backgroundBase: "#f9f9f9",
    backgroundLevel1: "#ffffff",
    backgroundLevel2: "#f0f0f0",
    borderBase: "#e5e5e5",
    textColorBase: "#222222",
  },
  dark: {
    backgroundBase: "#181818",
    backgroundLevel1: "#202020",
    backgroundLevel2: "#313131",
    borderBase: "#383838",
    textColorBase: "#FFFFFF",
  }
};

function ProviderWrapper(props) {
  return (
    <ColorModeProvider initialMode={localStorage.getItem("USER_THEME") ? localStorage.getItem("USER_THEME") : "light"}>
      {props.children}
    </ColorModeProvider>
  )
}

function MyApp() {
  const contexto = useContext(ColorModeContext);

  return (
    <ThemeProvider theme={theme[contexto.mode]}>
      <CSSReset />
      {window.location.pathname === "/" ? <HomePage /> : window.location.pathname === "/video" ? <VideoPage /> : <>404 Page not found</>}
      <RegisterVideo />
    </ThemeProvider>
  )
}

export default function App(props) {
  return (
    <ProviderWrapper>
      <MyApp />
    </ProviderWrapper>
  )
}

// function Apps() {
//   return (
//     <div className="App">
//       {window.location.pathname === "/" ? <HomePage /> : <></>}
      
//     </div>
//   );
// }
