export const SUPPORTED_NETWORK_ID =
  parseInt(process.env.REACT_APP_CHAIN_ID) || 42;
export const SUPPORTED_NETWORK_NAME =
  process.env.REACT_APP_ETHEREUM_NETWORK || "Kovan";
export const TX_SCAN_URL = "https://kovan.etherscan.io/tx";

export const CHARACTER_LIMIT = 350;
export const DEFAULT_CHARACTER_SHOW = 180;
