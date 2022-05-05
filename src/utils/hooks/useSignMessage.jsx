import { ethers } from "ethers";
import { useCallback, useEffect, useState } from "react";

export const useSignMessage = ({ provider, account }) => {
  const [verified, setVerified] = useState(false);
  const [signing, setSigning] = useState(false);

  const sign = useCallback(async () => {
    if (!account || !provider) return;
    setSigning(true);
    try {
      const _account = account;
      const signer = await provider.getSigner();
      const hash = await ethers.utils.keccak256(_account);
      const signedMsg = await signer.signMessage(hash);

      const verified = await ethers.utils.verifyMessage(hash, signedMsg);
      setVerified(verified === _account);
    } catch (err) {
      console.log({ err });
    }
    setSigning(false);
  }, [account, provider]);

  return {
    verified,
    signing,
    sign,
  };
};
