import React, { useEffect } from "react";
import { Container, Row, Col, Card, Progress } from "reactstrap";
import { API } from "aws-amplify";
import axios from "axios";
import DefaultCard from "../../../components/Utility/DefaultCard/Card";
import GigTable from "../../../components/Tables/GigTable/GigTable";
import Background from "../Gigs/pexels-photomix-company-95916.jpg";
import { useHistory } from "react-router-dom";
import SummaryCard from "../../../components/Utility/DefaultCard/SummaryCard";
import OfferSummaryItem from "../../../components/Utility/DefaultCard/OfferSummaryItem";

// core components

const Home = () => {
  let history = useHistory();

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "320px",
          backgroundImage: "url(" + Background + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* mask bg-gradient-default opacity-8 */}
        <span className="mask bg-gradient-green opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row style={{ width: "100%" }}>
            <Col xl="3" md="6">
              <Card className="card-stats">
                <SummaryCard
                  title="Working Data Scientists"
                  total={120}
                  percentage={3.48}
                >
                  <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                    <i className="ni ni-active-40"></i>
                  </div>
                </SummaryCard>
              </Card>
            </Col>

            <Col xl="3" md="6">
              <Card className="card-stats">
                <SummaryCard
                  title="Gigs in Progress"
                  total={20}
                  percentage={3.48}
                >
                  <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                    <i className="ni ni-chart-pie-35"></i>
                  </div>
                </SummaryCard>
              </Card>
            </Col>

            <Col xl="3" md="6">
              <Card className="card-stats">
                <SummaryCard
                  title="Working Data Scientists"
                  total={120}
                  percentage={3.48}
                >
                  <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                    <i className="ni ni-money-coins"></i>
                  </div>
                </SummaryCard>
              </Card>
            </Col>

            <Col xl="3" md="6">
              <Card className="card-stats">
                <SummaryCard
                  title="Executed Jobs"
                  total={2973}
                  percentage={3.48}
                >
                  <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                    <i className="ni ni-chart-bar-32"></i>
                  </div>
                </SummaryCard>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt--5" fluid>
        <div>
          <Row className="gigDetailContainer">
            <Col xs="12" sm="12" md="12" lg="8" className="flex-column">
              <GigTable />
            </Col>
            <Col xs="12" sm="12" md="12" lg="4" className="flex-column">
              <div className="full-width app-info-section">
                <DefaultCard title="Offers">
                  <OfferSummaryItem
                    text={`Offer for Gigs XYZ for $1234`}
                    time={`10:30 AM`}
                  />
                  <OfferSummaryItem
                    text={`Offer for Gigs ABC for $y645`}
                    time={`01:30 PM`}
                  />
                </DefaultCard>
              </div>

              <div className="full-width app-info-section">
                <DefaultCard title="Execution and explorations">
                  <p className="execution-info">
                    Execution job #aksjfhadsd5443
                  </p>
                  <Progress color="success" value="25" />

                  <p className="execution-info">Execution job #sdfd3534</p>
                  <Progress color="success" value="85" />
                </DefaultCard>
              </div>

              <div className="full-width app-info-section">
                <DefaultCard title="My Data"></DefaultCard>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Home;
