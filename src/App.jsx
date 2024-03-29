import { ActivityTable } from "./components/ActivityTable";
import { ConnectWallet } from "./components/ConnectWallet";
import { MessageForm } from "./components/MessageForm";
import { useWalletContext } from "./context/wallet";
import { SUPPORTED_NETWORK_ID } from "./utils/contants";

export default function Home() {
  const { account, chainId } = useWalletContext();
  return (
    <div className="min-h-screen p-2 pb-6 bg-gray-100">
      <ConnectWallet />
      {account && chainId === SUPPORTED_NETWORK_ID && <MessageForm />}
      <ActivityTable />
    </div>
  );
}
