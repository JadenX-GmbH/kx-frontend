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
import { Offer } from "../../../util/types";

import { generateOffers } from "../../../mock-data/Mock";
// core components

import OfferRow from "./OfferRow";
import TableLoader from "../../Utility/Loader/TableLoader";
// import { useHistory } from "react-router-dom";

const GigTable = () => {
  // let history = useHistory();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOffers(generateOffers(2));
    }, 400);
  }, [currentPage]);

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
                  onClick={() => history.push(`/admin/gigs/new`)}
                  size="sm"
                >
                  Add Offer
                </Button>
              </Col> */}
            </Row>
          </CardHeader>

          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col" className="text-center">
                  Accepted
                </th>
                <th scope="col" className="text-center">
                  Price
                </th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">
                  Created
                </th>

                <th scope="col" className="text-center">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="loader-container">
              {loading ? <TableLoader colspan={"6"} /> : null}
              {offers.map((offer: Offer, index: number) => {
                return <OfferRow key={index} offer={offer} />;
              })}
            </tbody>
          </Table>
          <CardFooter className="py-4">
            <nav aria-label="...">
              <Pagination
                className="pagination justify-content-end mb-0"
                listClassName="justify-content-end mb-0"
              >
                <PaginationItem className="disabled">
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    // tabIndex="-1"
                  >
                    <i className="fas fa-angle-left" />
                    <span className="sr-only">Previous</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className={currentPage === 1 ? "active" : ""}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchPage(1);
                    }}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className={currentPage === 2 ? "active" : ""}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchPage(2);
                    }}
                  >
                    2 <span className="sr-only">(current)</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className={currentPage === 3 ? "active" : ""}>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      fetchPage(3);
                    }}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-angle-right" />
                    <span className="sr-only">Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </CardFooter>
        </Card>
      </div>
    </Row>
  );
};

export default GigTable;
