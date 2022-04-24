import { ConnectWallet } from "./components/ConnectWallet";

export default function Home() {
  return (
    <div className="min-h-screen p-2 bg-gray-100">
      <ConnectWallet />
    </div>
  );
}
