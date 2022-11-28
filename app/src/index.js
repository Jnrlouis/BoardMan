import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
// import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';
import App from "./App";
import { chain, configureChains, WagmiConfig } from "wagmi";
import { createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "BoardMan",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
// const activeChainId = ChainId.Mumbai;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <App>
            <TawkMessengerReact
              propertyId={`${process.env.REACT_APP_TAWK_PROJECT_ID}`}
              widgetId={`${process.env.REACT_APP_TAWK_WIDGET_ID}`}
            />
          </App>
        </RainbowKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
