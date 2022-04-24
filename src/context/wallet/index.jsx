import { useState, useEffect, createContext, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { providerOptions } from "../../utils/providerOptions";
import { toHex } from "../../utils/utils";
import { networkParams } from "../../utils/networks";

const initialValue = {
  provider: null,
  account: null,
  network: null,
  chainId: null,
  error: null,
  connect: () => {},
  disconnect: () => {},
  switchNetwork: () => {},
};

const WalletContext = createContext(initialValue);

export function useWalletContext() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error(
      "useWalletContext must be used within a WalletContextProvider"
    );
  }
  return context;
}

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

export const WalletContextProvider = ({ children }) => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();

  const connectWallet = async () => {
    try {
      await web3Modal.setCachedProvider();
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  const switchNetwork = async (id) => {
    setNetwork(Number(id));
    // console.log()
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(id) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(id)]],
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
        connectWallet();
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <WalletContext.Provider
      value={{
        provider,
        account,
        network,
        chainId,
        error,
        connect: connectWallet,
        disconnect,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
