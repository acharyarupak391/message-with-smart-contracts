import { useState } from "react";
import { DEFAULT_CHARACTER_SHOW } from "../../utils/contants";

export const RenderMessage = ({ msg = "" }) => {
  const [showMore, setShowMore] = useState(false);
  const [showMsg, setShowMsg] = useState(
    msg.length > DEFAULT_CHARACTER_SHOW
      ? msg.substring(0, DEFAULT_CHARACTER_SHOW) + "..."
      : msg
  );

  const handleClick = () => {
    if (msg.length > DEFAULT_CHARACTER_SHOW) {
      if (showMore)
        setShowMsg(msg.substring(0, DEFAULT_CHARACTER_SHOW) + "...");
      else setShowMsg(msg);
      setShowMore((val) => !val);
    }
  };

  return msg ? (
    <div>
      <p className="italic text-gray-700 break-all font-raleway">{showMsg}</p>
      {msg.length > DEFAULT_CHARACTER_SHOW && (
        <button className="text-xs text-slate-500" onClick={handleClick}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  ) : (
    <></>
  );
};
