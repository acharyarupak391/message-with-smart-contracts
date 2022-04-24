export const networkParams = {
  "0x63564c40": {
    chainId: "0x63564c40",
    rpcUrls: ["https://api.harmony.one"],
    chainName: "Harmony Mainnet",
    nativeCurrency: { name: "ONE", decimals: 18, symbol: "ONE" },
    blockExplorerUrls: ["https://explorer.harmony.one"],
    iconUrls: ["https://harmonynews.one/wp-content/uploads/2019/11/slfdjs.png"],
  },
  "0xa4ec": {
    chainId: "0xa4ec",
    rpcUrls: ["https://forno.celo.org"],
    chainName: "Celo Mainnet",
    nativeCurrency: { name: "CELO", decimals: 18, symbol: "CELO" },
    blockExplorerUrl: ["https://explorer.celo.org"],
    iconUrls: [
      "https://celo.org/images/marketplace-icons/icon-celo-CELO-color-f.svg",
    ],
  },
  "0x13881": {
    chainId: "0x13881",
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    chainName: "Polygon Testnet Mumbai",
    nativeCurrency: {
      name: "tMATIC",
      symbol: "tMATIC", // 2-6 characters long
      decimals: 18,
    },
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};
