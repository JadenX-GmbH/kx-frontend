import React from "react";
import { Container, Row, Col, Progress } from "reactstrap";
import GigTable from "../../../components/Tables/GigTable/GigTable";
import DefaultCard from "../../../components/Utility/DefaultCard/Card";
import { Link } from "react-router-dom";
// core components

const Gigs = () => {
  return (
    <>
      {/*<Header />*/}
      <div className="header bg-secondary pb-6 pt-5 pt-md-8"></div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col xs="12" sm="12" md="12" lg="8">
            <GigTable />
          </Col>

          <Col xs="12" sm="12" md="12" lg="4" className="flex-column">
            <div className="full-width app-info-section">
              <DefaultCard title="Latest Offers">
                <p className="navigate-all">
                  <Link to="/admin/gigs/offers">All Offers</Link>
                </p>
              </DefaultCard>
            </div>

            <div className="full-width app-info-section">
              <DefaultCard title="Execution and explorations">
                <p className="execution-info">Execution job #aksjfhadsd5443</p>
                <Progress color="success" value="25" />

                <p className="execution-info">Execution job #sdfd3534</p>
                <Progress color="success" value="85" />
              </DefaultCard>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Gigs;
