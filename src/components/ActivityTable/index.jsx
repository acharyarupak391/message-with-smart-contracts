import { useQuery } from "../../utils/hooks/useQuery";
import { classNames, sortDataByTimestamp } from "../../utils/methods";
import {
  PlusCircleIcon,
  XCircleIcon,
  RefreshIcon,
  ExternalLinkIcon,
} from "@heroicons/react/outline";
import { truncateAddress } from "../../utils/utils";
import { TX_SCAN_URL } from "../../utils/contants";

export const ActivityTable = () => {
  const { data, loading, refetch } = useQuery();

  const sorted = sortDataByTimestamp(
    data.createdEntities,
    data.deletedEntities
  );

  const handleRefresh = () => {
    refetch();
  };

  return (
    <div className="box-border max-w-screen-lg p-2 mx-auto mt-4 bg-blue-100 border-2 border-blue-700 border-dashed rounded-md">
      <div className="flex justify-between w-full px-2">
        <h1 className="text-lg font-bold text-blue-900">Activities</h1>
        <button
          className={classNames(
            "p-2 text-gray-800 bg-black bg-opacity-0 rounded-full hover:bg-opacity-10 disabled:cursor-default",
            loading ? "animate-spin" : ""
          )}
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col gap-2 p-1 mt-4 overflow-y-auto bg-white rounded-sm h-400px">
        {sorted.map((entity, idx) => (
          <div
            className={classNames(
              "flex",
              entity._message ? "bg-green-100" : "bg-red-100"
            )}
            key={idx}
          >
            <div
              className={classNames(
                "p-2",
                entity._message ? "text-green-700" : "text-red-700"
              )}
            >
              {entity._message ? (
                <PlusCircleIcon className="w-5 h-5" />
              ) : (
                <XCircleIcon className="w-5 h-5" />
              )}
            </div>
            <div className={classNames("p-2 flex-grow ")}>
              <div className="flex flex-wrap justify-between gap-1 mb-2">
                <h2 className="flex gap-2 font-mono text-sm font-semibold text-gray-700 md:text-base">
                  <span className="block sm:hidden">
                    {truncateAddress(entity._sender)}
                  </span>
                  <span className="hidden sm:block">{entity._sender}</span>{" "}
                  <span
                    className={classNames(
                      "font-sans font-medium",
                      entity._message ? "text-green-700" : "text-red-700"
                    )}
                  >
                    {entity._message
                      ? "added a message"
                      : "deleted the message"}
                  </span>
                </h2>
                <a
                  target={"_blank"}
                  rel="noreferrer"
                  className="flex items-end gap-1 text-xs text-blue-500"
                  href={`${TX_SCAN_URL}/${entity.id}`}
                >
                  View on etherscan
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              </div>
              {entity._message && (
                <p className="italic text-gray-600 font-raleway">
                  {entity._message}
                </p>
              )}
              <p
                className="w-full mt-1 text-xs font-semibold text-right text-gray-500"
                title={new Date(entity._timestamp * 1000).toString()}
              >
                {new Date(entity._timestamp * 1000).toUTCString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
