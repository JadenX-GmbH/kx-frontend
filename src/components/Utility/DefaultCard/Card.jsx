import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

const DefaultCard = (props) => {
  return (
    <Card body className="app-default-card" {...props}>
      <CardTitle>
        {props.title}
        {props.headerButtons ? (
          <span style={{ float: "right" }}>{props.headerButtons}</span>
        ) : null}
      </CardTitle>
      <CardBody>{props.children}</CardBody>
    </Card>
  );
};

export default DefaultCard;
