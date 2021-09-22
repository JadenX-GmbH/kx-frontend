import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import { useSelector } from "react-redux";

import { Store, OfferType, PaginationType } from "../../../util/types";
import axios from "axios";
import { USER_OFFERS } from "../../../util/api";

import OfferTable from "../../../components/Tables/OfferTable/OfferTable";
import DefaultCard from "../../../components/Utility/DefaultCard/Card";
import OfferSummaryItem from "../../../components/Utility/DefaultCard/OfferSummaryItem";

const { default: TruncateText } = require("../../../util/Truncate");

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
            <OfferTable />
          </Col>

          {/* {user?.type === "DS" && (
            <Col xs="12" sm="12" md="12" lg="4" className="flex-column">
              <div className="full-width app-info-section">
                <DefaultCard title={"Offers you made"}>
                  {loading ? (
                    <div>Your offers is loading...</div>
                  ) : (
                    <>
                      {offers.map((offer, index) => {
                        const strippedDescription = offer.description.replace(
                          /(<([^>]+)>)/gi,
                          ""
                        );
                        return (
                          <OfferSummaryItem
                            key={index}
                            accepted={offer.accepted}
                            text={`Offer for Gigs ${offer.gig} for ${offer.price}€`}
                            description={
                              <TruncateText
                                text={strippedDescription}
                                length={34}
                              />
                            }
                          />
                        );
                      })}
                    </>
                  )}
                </DefaultCard>
              </div>
            </Col>
          )} */}
        </Row>
      </Container>
    </>
  );
};

export default Gigs;
