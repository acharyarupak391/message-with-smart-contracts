import { useWalletContext } from "../../context/wallet";
import { classNames } from "../../utils/methods";
import { truncateAddress } from "../../utils/utils";
import {
  LinkIcon,
  MinusCircleIcon,
  InformationCircleIcon as IIcon,
} from "@heroicons/react/outline";
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/solid";
import {
  SUPPORTED_NETWORK_ID,
  SUPPORTED_NETWORK_NAME,
} from "../../utils/contants";
import { useSignMessage } from "../../utils/hooks/useSignMessage";
import { useEffect } from "react";
import { VerifiedFilled, VerifiedOutlined } from "../SVG";

export const ConnectWallet = () => {
  const {
    account,
    chainId,
    connect,
    disconnect,
    error,
    switchNetwork,
    provider,
  } = useWalletContext();

  const { signing, sign, verified } = useSignMessage({ provider, account });

  const handleSignClick = () => {
    sign();
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <div
        className={classNames(
          "border-2 rounded-lg p-2",
          account ? "border-green-500" : "border-gray-400"
        )}
      >
        <div
          className={classNames(
            "flex items-center gap-4 flex-wrap",
            account ? "justify-between" : "justify-start"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {!account ? (
                <InformationCircleIcon className="flex-shrink-0 w-6 h-6 text-gray-500" />
              ) : (
                <CheckCircleIcon className="flex-shrink-0 w-6 h-6 text-teal-700" />
              )}
              <span
                className={classNames(
                  "italic text-sm",
                  account ? "text-teal-700" : "text-gray-500"
                )}
              >
                {!account ? "Not Connected" : "Connected "}
              </span>
            </div>

            {account && chainId === SUPPORTED_NETWORK_ID && (
              <button
                className={classNames(
                  "flex items-center gap-2 px-3 py-2 rounded-sm text-sm  text-white",
                  verified ? "bg-green-600" : "bg-gray-500"
                )}
                onClick={handleSignClick}
                disabled={signing || verified}
              >
                {verified ? (
                  <VerifiedFilled className="w-5 h-5" />
                ) : (
                  <VerifiedOutlined className="w-5 h-5" />
                )}
                {verified ? "Verified" : "Sign Message to Verify"}
              </button>
            )}
          </div>

          {account && chainId !== SUPPORTED_NETWORK_ID && (
            <div className="flex gap-1 p-2 text-xs text-orange-700 bg-orange-600 rounded-md bg-opacity-10">
              <IIcon className="w-4 h-4" />
              <div>
                <p>Unsupported network selected!</p>
                <p>
                  Please{" "}
                  <button
                    className="box-border font-semibold text-blue-500 border-b hover:border-b-blue-500"
                    onClick={() => switchNetwork(SUPPORTED_NETWORK_ID)}
                  >
                    switch to{" "}
                    <p className="inline capitalize">
                      {SUPPORTED_NETWORK_NAME}
                    </p>{" "}
                    network
                  </button>{" "}
                  to continue!
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            {account && chainId && (
              <div className="p-2 text-sm text-gray-700 bg-white rounded-sm shadow-sm">
                <p className="flex justify-between gap-5">
                  <span className="font-mono font-semibold">Account</span>
                  <span>{truncateAddress(account)}</span>
                </p>
                <p className="flex justify-between gap-5">
                  <span className="font-mono font-semibold">ChainId</span>
                  <span>{chainId ?? "No Network"}</span>
                </p>
              </div>
            )}
            <button
              className={classNames(
                "flex items-center gap-2 p-2 px-3 rounded-full bg-opacity-10 text-sm",
                !account
                  ? "text-teal-700 bg-green-900"
                  : "text-red-700 bg-red-900"
              )}
              onClick={() => (account ? disconnect() : connect())}
            >
              {!account ? (
                <LinkIcon className="w-5 h-5" />
              ) : (
                <MinusCircleIcon className="w-5 h-5" />
              )}
              <span>{!account ? "Connect Wallet" : "Disconnect"}</span>
            </button>
          </div>
        </div>
      </div>
      {error && (
        <div className="flex items-start gap-2 p-2 mt-2 text-sm text-red-500 bg-red-500 rounded-md bg-opacity-10 w-max">
          <IIcon className="w-4 h-4" />
          Error:
          <span className="font-semibold">
            {error?.message ?? "Something is wrong!!!"}
          </span>
        </div>
      )}
    </div>
  );
};
