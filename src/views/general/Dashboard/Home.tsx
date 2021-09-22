import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Progress,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
} from "reactstrap";
import { useSelector } from "react-redux";
// import SummaryCard from "../../../components/Utility/DefaultCard/SummaryCard";
import OfferSummaryItem from "../../../components/Utility/DefaultCard/OfferSummaryItem";

import { Store, OfferType, PaginationType } from "../../../util/types";
import axios from "axios";
import { USER_OFFERS } from "../../../util/api";

import DefaultCard from "../../../components/Utility/DefaultCard/Card";
import GigTable from "../../../components/Tables/GigTable/GigTable";
import Background from "../Gigs/pexels-photomix-company-95916.jpg";
import ProgressIndicator from "../../../components/Utility/ProgressIndicator/ProgressIndicator";

const { default: TruncateText } = require("../../../util/Truncate");

// core components

const Home = () => {
  const token = useSelector((state: Store) => state.token);
  const user = useSelector((state: Store) => state.user);

  const [offers, setOffers] = useState<OfferType[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [exist, setExist] = useState(false);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });

  let paginationElement = [];

  for (let i = 0; i < pagination.totalPages; i++) {
    paginationElement.push(
      <PaginationItem
        key={`p${i}`}
        className={pagination.page === i ? "active" : ""}
      >
        <PaginationLink
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();

            setPagination((values) => {
              return { ...values, page: i };
            });
          }}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    );
  }

  useEffect(() => {
    if (user?.type === "DS") {
      if(initialLoading) {
        setInitialLoading(false);
        setLoading(true);
      }

      if (token.length) {
        axios
          .get(
            `${USER_OFFERS}?page=${pagination.page}&size=${pagination.size}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if(initialLoading) setLoading(false);
            if (response.data.data) {
              setExist(true);
              setOffers(response.data.data);
              setPagination({
                page: response.data.page,
                size: response.data.size,
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
              });
            } else {
              setExist(false);
            }
          })
          .catch((err) => {
            if(initialLoading) setLoading(false);
            setExist(false);
            console.log(err);
          });
      }
    }
  }, [token, pagination.page, user]);

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "278px",
          backgroundImage: "url(" + Background + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* mask bg-gradient-default opacity-8 */}
        <span className="mask bg-gradient-green opacity-8" />
        {/* Header container */}
        {/* <Container className="d-flex align-items-center" fluid>
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
        </Container> */}
      </div>

      <Container className="mt--9" fluid>
        <div>
          <Row className="gigDetailContainer">
            <Col xs="12" sm="12" md="12" lg="8" className="flex-column">
              <GigTable />
            </Col>
            <Col xs="12" sm="12" md="12" lg="4" className="flex-column">
              {user?.type === "DS" && (
                <div className="full-width app-info-section">
                  <DefaultCard title="Offers">
                    {loading ? (
                      <>
                        {exist ? (
                          <h1 className="display-3 text-white">No Gig Found</h1>
                        ) : (
                          <div className="notification-container">
                            <ProgressIndicator message="Loading Offers...." />
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {offers && (
                          <>
                            {offers.map((offer, index) => {
                              const strippedDescription =
                                offer.description.replace(/(<([^>]+)>)/gi, "");
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
                      </>
                    )}
                  </DefaultCard>
                  <CardFooter>
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem
                        className={pagination.page === 0 ? "disabled" : ""}
                      >
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();

                            setPagination((values) => {
                              return { ...values, page: pagination.page - 1 };
                            });
                          }}
                          // tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>

                      {paginationElement}
                      <PaginationItem
                        className={
                          pagination.page === pagination.totalPages - 1
                            ? "disabled"
                            : ""
                        }
                      >
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            e.preventDefault();
                            setPagination((values) => {
                              return { ...values, page: pagination.page + 1 };
                            });
                          }}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </CardFooter>
                </div>
              )}

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
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Home;
