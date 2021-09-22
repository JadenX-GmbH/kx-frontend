import React from "react";

const OfferSummaryCard = ({ accepted, text, description }) => {
  return (
    <div className={`offer-summary ${accepted ? '' : 'yellow'}`}>
      {text}
      <br />
      <span className="description">{description}</span>
    </div>
  );
};

export default OfferSummaryCard;
