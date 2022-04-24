import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@fontsource/sora";
import "./styles/global.css";
import { WalletContextProvider } from "./context/wallet";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <WalletContextProvider>
      <App />
    </WalletContextProvider>
  </StrictMode>,
  rootElement
);
