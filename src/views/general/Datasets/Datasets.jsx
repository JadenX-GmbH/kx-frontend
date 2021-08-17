import React from "react";
import { Container, Row, Col, Progress } from "reactstrap";
import DataTable from "../../../components/Tables/DatasetTable/DataTable";

// core components

const Gigs = () => {
  return (
    <>
      {/*<Header />*/}
      <div className="header bg-secondary pb-6 pt-5 pt-md-8"></div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col xs="12" sm="12" md="12" lg="12">
            <DataTable />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Gigs;
