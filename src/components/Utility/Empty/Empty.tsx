import React, { FunctionComponent } from "react";

type ModalProps = {
  message: string;
  textColor?: string;
};

const Empty: FunctionComponent<ModalProps> = ({ message, children }) => {
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          width: "100%",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <i style={{ fontSize: "25px" }} className="ni ni-app"></i>
      </div>
      <p
        style={{
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        {message}
      </p>
    </div>
  );
};

export default Empty;
