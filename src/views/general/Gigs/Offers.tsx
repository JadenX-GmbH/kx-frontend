import React from "react";
import { Container, Row, Col } from "reactstrap";
import OfferTable from "../../../components/Tables/OfferTable/OfferTable";
import DefaultCard from "../../../components/Utility/DefaultCard/Card";

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
            <OfferTable />
          </Col>

          <Col xs="12" sm="12" md="12" lg="4" className="flex-column">
            <div className="full-width app-info-section">
              <DefaultCard title="Offers you made">something</DefaultCard>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Gigs;
