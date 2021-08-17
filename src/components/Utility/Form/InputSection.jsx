import React from "react";

const DefaultCard = (props) => {
  return (
    <div className="input-section">
      <p className="section-title">{props.title}</p>
      {props.children}
    </div>
  );
};

export default DefaultCard;
