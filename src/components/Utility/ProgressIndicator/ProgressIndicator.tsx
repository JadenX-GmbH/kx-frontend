import React, { FunctionComponent, useEffect, useRef } from "react";

type ModalProps = {
  message: string;
  textColor?: string;
};

const ProgressIndicator: FunctionComponent<ModalProps> = ({
  textColor,
  message,
  children,
}) => {
  const inputEl = useRef<HTMLDivElement>(null);
  let increaseTimer: number = 5;
  useEffect(() => {
    inputEl.current!.style.width = "0%";
    let start_width = 0;
    setInterval(() => {
      if (start_width >= 100) clearInterval(increaseTimer);
      else {
        start_width++;

        if (inputEl.current) inputEl.current!.style.width = start_width + "%";
      }
    }, 20);

    return () => {
      clearInterval(increaseTimer);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <p
        style={{
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "15px",
          color: textColor ? textColor : "",
        }}
      >
        {message}
      </p>
      <div style={{ width: "100%" }}>
        <div ref={inputEl} className="progress-indicator">
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
