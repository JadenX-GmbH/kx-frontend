import React from "react";
import { Card, CardTitle, CardText, CardBody } from "reactstrap";

const DefaultCard = (props) => {
  return (
    <Card body className="app-default-card" {...props}>
      <CardTitle style={props.shortVersion ? {marginBottom: '.8rem'} : {}}>
        {props.title}
        {props.headerbuttons ? (
          <span style={{ float: "right" }}>{props.headerbuttons}</span>
        ) : null}
      </CardTitle>
      <CardBody style={props.shortVersion ? { padding: "0" } : { padding: "10px 0px 10px 0px" }}>
        {props.children}
      </CardBody>
    </Card>
  );
};

export default DefaultCard;
