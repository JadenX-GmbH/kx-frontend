import React from "react";

const OfferSummaryCard = ({ text, time }) => {
  return (
    <div className="offer-summary">
      {text}
      <br />
      <span className="time">{time}</span>
    </div>
  );
};

export default OfferSummaryCard;
