import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useWalletContext } from "../../context/wallet";
const ABI = require("../../ABI/Message.json");

export const useContractMessage = () => {
  const { provider, account } = useWalletContext();
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS ?? "";
  const signer = provider.getSigner();
  const instance = new ethers.Contract(contractAddress, ABI.abi, signer);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function getMessage() {
    setLoading(true);
    try {
      const [msg, timestamp] = await instance.readMessage(account);
      setLoading(false);
      return [msg, timestamp];
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  }

  async function getMessageByAccount(account) {
    setLoading(true);
    try {
      const [msg, timestamp] = await instance.readMessage(account);
      setLoading(false);
      return [msg, timestamp];
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  }

  async function setMessageInContract(msg) {
    setLoading(true);
    try {
      const tx = await instance.setMessage(msg);
      await tx?.wait();
      const [m, t] = await instance.readMessage(account);
      setLoading(false);
      setMessage({
        data: m,
        ts: t.toString(),
      });
      return [m, t];
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  }

  async function deleteMessage() {
    setLoading(true);
    try {
      const tx = await instance.deleteMessage(account);
      await tx?.wait();
      const [m, t] = await instance.readMessage(account);
      setLoading(false);
      setMessage({
        data: m,
        ts: t.toString(),
      });
      return [m, t];
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  }

  useEffect(async () => {
    const msg = await getMessage();
    if (msg) {
      setMessage({
        data: msg[0],
        ts: msg[1].toString(),
      });
    }
  }, []);

  return {
    message,
    getMessage,
    getMessageByAccount,
    setMessage: setMessageInContract,
    deleteMessage,
    loading,
  };
};
