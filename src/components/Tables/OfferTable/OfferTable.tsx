import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  Col,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Row,
} from "reactstrap";

import OfferRow from "./OfferRow";
import TableLoader from "../../Utility/Loader/TableLoader";
import { useSelector } from "react-redux";

import { Store, OfferType, PaginationType } from "../../../util/types";
import axios from "axios";
import { USER_OFFERS } from "../../../util/api";
import ProgressIndicator from "../../Utility/ProgressIndicator/ProgressIndicator";

const GigTable = () => {
  const token = useSelector((state: Store) => state.token);

  const [offers, setOffers] = useState<OfferType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 0,
    size: 10,
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
    setLoading(true);

    if (token.length) {
      axios
        .get(`${USER_OFFERS}?page=${pagination.page}&size=${pagination.size}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoading(false);
          if (response.data.data) {
            setOffers(response.data.data);
            setPagination({
              page: response.data.page,
              size: response.data.size,
              totalPages: response.data.totalPages,
              totalElements: response.data.totalElements,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  }, [token, pagination.page]);

  return (
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Your Potential Matches</h3>
              </Col>
              {/* <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  onClick={() => history.push(`/gigs/new`)}
                  size="sm"
                >
                  Add Offer
                </Button>
              </Col> */}
            </Row>
          </CardHeader>

          {loading && offers.length === 0 ? (
            <div
              className="notification-container"
              style={{ minHeight: "250px" }}
            >
              <ProgressIndicator message="Loading Offers..." />
            </div>
          ) : null}

          <Table className="align-items-center table-flush" responsive>
            {offers.length ? (
              <thead className="thead-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col" className="text-center">
                    Status
                  </th>
                  <th scope="col" className="text-center">
                    Price
                  </th>
                  <th scope="col">Description</th>
                  <th scope="col" className="text-center">
                    Gig
                  </th>
                </tr>
              </thead>
            ) : null}
            <tbody className="loader-container">
              {loading ? <TableLoader colspan={"6"} /> : null}
              {offers.map((offer: OfferType, index: number) => {
                return <OfferRow key={index} offer={offer} />;
              })}
            </tbody>
          </Table>
          {offers.length ? (
            <CardFooter className="py-4">
              <nav aria-label="...">
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
              </nav>
            </CardFooter>
          ) : null}
        </Card>
      </div>
    </Row>
  );
};

export default GigTable;
