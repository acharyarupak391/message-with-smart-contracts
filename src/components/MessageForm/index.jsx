import { useState, useEffect } from "react";

import { AnnotationIcon, CalendarIcon } from "@heroicons/react/outline";
import { TrashIcon } from "@heroicons/react/solid";
import { classNames } from "../../utils/methods";
import { useContractMessage } from "../../utils/hooks/useContractMessage";

export const MessageForm = () => {
  const { loading, message, setMessage, deleteMessage } = useContractMessage();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddOrUpdate = async () => {
    await setMessage(inputValue);
    setInputValue("");
  };

  const handleDelete = async () => {
    await deleteMessage();
  };

  const disabled =
    loading ||
    (message?.data
      ? !Boolean(inputValue && inputValue !== message?.data)
      : !Boolean(inputValue));

  return (
    <div className="max-w-screen-lg p-2 mx-auto mt-4 bg-gray-200 rounded-md">
      <div className="flex items-start gap-3 p-2 text-gray-700 bg-white rounded-sm md:w-3/4 lg:w-1/2">
        <AnnotationIcon className="w-5 h-5" />
        {message?.data ? (
          <div className="flex-grow">
            <p className="text-lg">{message?.data}</p>
            <p className="flex items-center justify-end gap-1 mt-2 text-xs font-semibold text-gray-500">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {new Date(parseInt(message?.ts) * 1000).toUTCString()}
              </span>
            </p>
          </div>
        ) : (
          <p className="italic text-center text-gray-500">No Message set</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <input
          className="p-2 border-2 border-gray-400 rounded-md outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 md:min-w-[500px] disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Type your message..."
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
    </div>
  );
};
