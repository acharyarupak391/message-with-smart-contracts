import { useWalletContext } from "../../context/wallet";
import { classNames } from "../../utils/methods";
import { getAddressNumber, truncateAddress } from "../../utils/utils";
import {
  LinkIcon,
  MinusCircleIcon,
  InformationCircleIcon as IIcon,
} from "@heroicons/react/outline";
import { CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/solid";

export const ConnectWallet = () => {
  const {
    account,
    chainId,
    provider,
    connect,
    disconnect,
    error,
    switchNetwork,
  } = useWalletContext();
  const parsedId = chainId ? getAddressNumber(chainId) : null;
  console.log({ account, chainId, provider, parsedId });

  return (
    <div
      className={classNames(
        "border-2 rounded-lg p-2 max-w-screen-lg",
        account ? "border-green-500" : "border-gray-400"
      )}
    >
      <div
        className={classNames(
          "flex items-center gap-4 flex-wrap",
          account ? "justify-between" : "justify-start"
        )}
      >
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

        {account && parsedId !== 80001 && (
          <div className="flex gap-1 p-2 text-xs text-orange-700 bg-orange-600 rounded-md bg-opacity-10">
            <IIcon className="w-4 h-4" />
            <div>
              <p>Unsupported network selected!</p>
              <p>
                Please{" "}
                <button
                  className="box-border font-semibold text-blue-500 border-b hover:border-b-blue-500"
                  onClick={() => switchNetwork("80001")}
                >
                  switch to Mumbai Polygon network
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
      {/* {!account ? (
        <button
          className="text-white bg-green-700 rounded-lg"
          onClick={async () => await connect()}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className="text-white bg-red-500 rounded-lg"
          onClick={disconnect}
        >
          Disconnect
        </button>
      )}
      <div>
        <div>
          <p className="text-blue-700">{`Connection Status: `}</p>
          {account ? <span>Connected</span> : <span>Not Connected</span>}
        </div>

        <p>{`Account: ${truncateAddress(account)}`}</p>
        <p>{`Network ID: ${chainId ? chainId : "No Network"}`}</p>
      </div> */}
      {/* {account && (
        <div>
          <div>
            <div>
              <button onClick={switchNetwork} disabled={!network}>
                Switch Network
              </button>
              <select placeholder="Select network" onChange={handleNetwork}>
                <option value="3">Ropsten</option>
                <option value="4">Rinkeby</option>
                <option value="42">Kovan</option>
                <option value="80001">Mumbai</option>
                <option value="42220">Celo</option>
              </select>
            </div>
          </div>
        </div>
      )} */}
      <p className="">{error ? error.message : null}</p>
    </div>
  );
};
