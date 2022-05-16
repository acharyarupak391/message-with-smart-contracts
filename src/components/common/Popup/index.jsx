import React, { useEffect } from "react";
import styles from "./style.module.css";

const Popup = ({ open, handleClose, children }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflowY = "hidden";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [open]);

  return open ? (
    <div className={styles["popup-box"]}>
      <div className={styles["box"]}>
        <button className={styles["close-icon"]} onClick={handleClose}>
          x
        </button>
        <div>{children ?? <></>}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Popup;
