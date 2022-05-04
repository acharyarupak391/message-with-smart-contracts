export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(
    /^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
  );
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const getAddressNumber = (chainId) => {
  const match = chainId.toString().match(/^0x[a-zA-Z0-9]+$/);
  if (!match) return chainId;
  return parseInt(chainId, 16);
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};
