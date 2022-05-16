import { useState, useEffect } from "react";

import {
  AnnotationIcon,
  CalendarIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/solid";
import { classNames } from "../../utils/methods";
import { useContractMessage } from "../../utils/hooks/useContractMessage";
import { CHARACTER_LIMIT } from "../../utils/contants";
import Popup from "../common/Popup";

export const MessageForm = () => {
  const {
    loading,
    message,
    setMessage,
    deleteMessage,
    checkArgs,
  } = useContractMessage();
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOrUpdate = async () => {
    const isValid = await checkArgs("setMessage", [inputValue]);
    if (isValid) {
      await setMessage(inputValue);
      setInputValue("");
    } else {
      setShowModal(true);
    }
  };

  const handleDelete = async () => {
    await deleteMessage();
  };

  const handleForceTxn = async () => {
    await setMessage(inputValue, true);
  };

  const disabled =
    loading ||
    (message?.data && Boolean(inputValue === message?.data)) ||
    inputValue.length > CHARACTER_LIMIT;
  // (message?.data
  //   ? !Boolean(inputValue && inputValue !== message?.data)
  //   : !Boolean(inputValue)) ||
  // inputValue.length > CHARACTER_LIMIT;

  return (
    <div className="max-w-screen-lg p-2 mx-auto mt-4 bg-gray-200 rounded-md">
      <div className="flex items-start gap-3 p-2 pr-4 text-gray-700 bg-white rounded-sm lg:w-3/4 2xl:w-1/2">
        <AnnotationIcon className="flex-shrink-0 w-5 h-5" />
        {message?.data ? (
          <div className="flex-grow">
            <p className="text-lg break-all font-raleway">{message?.data}</p>
            <p className="flex items-center justify-end gap-1 mt-2 text-xs font-semibold text-gray-500">
              <CalendarIcon className="w-4 h-4" />
              <span title={new Date(parseInt(message?.ts) * 1000).toString()}>
                {new Date(parseInt(message?.ts) * 1000).toUTCString()}
              </span>
            </p>
          </div>
        ) : (
          <p className="italic text-center text-gray-500">No Message set</p>
        )}
      </div>
      <div className="flex flex-wrap items-end gap-4 mt-4">
        <textarea
          className="p-2 border-2 border-gray-400 rounded-md outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 min-w-full md:min-w-[550px] disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Type your message..."
          rows={8}
          value={inputValue}
          onChange={handleInputChange}
          disabled={loading}
        />
        <div className="flex justify-between flex-grow">
          <button
            className={classNames(
              "p-2 px-4 rounded-md outline-none focus:ring-1 focus:ring-blue-400 disabled:opacity-75 disabled:cursor-not-allowed",
              message?.data
                ? "border-blue-600 text-white bg-blue-600"
                : "border-green-600 text-white bg-green-600"
            )}
            onClick={handleAddOrUpdate}
            disabled={disabled}
          >
            {message?.data ? "Update Message" : "Add Message"}
          </button>
          {message?.data && (
            <button
              className="flex items-center gap-2 p-2 text-sm text-red-800 bg-red-800 border border-red-800 rounded-sm bg-opacity-5 hover:bg-opacity-20 disabled:cursor-not-allowed"
              onClick={handleDelete}
              disabled={loading}
            >
              <TrashIcon className="w-6 h-6" />
              <span>Delete Message</span>
            </button>
          )}
        </div>
      </div>

      {/* Force Transaction Popup */}
      <Popup open={showModal} handleClose={() => setShowModal(false)}>
        <div className="flex items-center p-1 text-red-800 bg-red-100 rounded gap-x-2">
          <ExclamationCircleIcon className="w-8 h-8 " />
          <span className="text-xl font-semibold font-raleway">
            Invalid Transaction !!!
          </span>
        </div>

        <div className="p-2 mt-4 text-orange-800 bg-orange-200 rounded">
          <div className="flex items-center gap-2">
            <InformationCircleIcon className="w-6 h-6" />
            <span>
              You can still force this transaction ignoring this error!!!
            </span>
          </div>

          <div className="flex justify-end gap-2 mt-8">
            <button
              className="px-3 py-2 font-medium text-white uppercase rounded bg-slate-500"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2 font-medium text-white uppercase bg-red-500 rounded"
              onClick={handleForceTxn}
            >
              Send transaction anyway
            </button>
          </div>
        </div>
      </Popup>
    </div>
  );
};
