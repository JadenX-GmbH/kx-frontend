import generateDataScientists from "../../mock-data/DataScientistMock";
import React, { useState } from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components

const Contacts = () => {
  const [copiedText, setCopiedText] = useState();
  const dataScientists = generateDataScientists(24);

  const dataScientistTable = dataScientists.map((ds) => "a");

  return (
    <>
      {/*<Header />*/}
      <div className="header bg-secondary pb-6 pt-5 pt-md-8"></div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Under Construction</h3>
              </CardHeader>
              <CardBody>{dataScientistTable}</CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Contacts;
