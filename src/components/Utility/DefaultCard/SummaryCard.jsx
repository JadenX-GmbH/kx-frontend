import React from "react";
import { CardBody } from "reactstrap";

const SummaryCard = ({ title, total, percentage, children }) => {
  return (
    <CardBody>
      <div className="row">
        <div className="col">
          <h5 className="card-title text-uppercase text-muted mb-0">{title}</h5>
          <span className="h2 font-weight-bold mb-0">{total}</span>
        </div>
        <div className="col-auto">{children}</div>
      </div>
      <p className="mt-3 mb-0 text-sm">
        <span className="text-success mr-2">
          <i className="fa fa-arrow-up"></i> {percentage}%
        </span>
        <span className="text-nowrap">Since last month</span>
      </p>
    </CardBody>
  );
};

export default SummaryCard;
