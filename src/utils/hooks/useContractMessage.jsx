import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useWalletContext } from "../../context/wallet";
const ABI = require("../../ABI/Message.json");

export const useContractMessage = () => {
  const { provider, account, chainId } = useWalletContext();
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS ?? "";
  const signer = provider?.getSigner();
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

  async function checkIfValid(methodName, methodArgs) {
    try {
      const gas = await instance.estimateGas[methodName](...methodArgs);
      console.log({ gas, str: gas.toString() });
      return true;
    } catch (err) {
      if (err?.data === "Reverted") {
        return false;
      }
    }
  }

  async function setMessageInContract(msg, force = false) {
    setLoading(true);
    try {
      let tx;
      if (force) {
        const overrides = {
          gasLimit: "10000000",
          gasPrice: "50000",
          value: ethers.utils.parseEther("0"),
        };
        tx = await instance.setMessage(msg, overrides);
      } else {
        tx = await instance.setMessage(msg);
      }
      await tx?.wait();
      setLoading(false);
      fetchAndUpdate();
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

      setLoading(false);
      fetchAndUpdate();
    } catch (err) {
      console.log({ err });
      setLoading(false);
    }
  }

  const fetchAndUpdate = async () => {
    const msg = await getMessage();
    if (msg) {
      setMessage({
        data: msg[0],
        ts: msg[1].toString(),
      });
    }
  };

  useEffect(async () => {
    fetchAndUpdate();
  }, []);

  useEffect(() => {
    fetchAndUpdate();
  }, [account, chainId]);

  return {
    message,
    getMessage,
    getMessageByAccount,
    setMessage: setMessageInContract,
    deleteMessage,
    loading,
    refetch: fetchAndUpdate,
    checkArgs: checkIfValid,
  };
};
