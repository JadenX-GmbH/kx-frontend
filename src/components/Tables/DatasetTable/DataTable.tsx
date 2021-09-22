import React, { useState, useEffect } from "react";

// reactstrap components
import { Card, Col, Button, CardHeader, CardFooter, Pagination, PaginationItem, PaginationLink, Table, Row } from "reactstrap";

// core components

import DataRow from "./DataRow";
import TableLoader from "../../Utility/Loader/TableLoader";
import { useHistory } from "react-router-dom";
import { DataSet, Store, PaginationType } from "../../../util/types";
import { useSelector } from "react-redux";
import axios from "axios";
import { DATASETS_OWNER } from "../../../util/api";
import ProgressIndicator from "../../Utility/ProgressIndicator/ProgressIndicator";
import Empty from "../../Utility/Empty/Empty";

const GigTable = () => {
  let history = useHistory();
  const token = useSelector((state: Store) => state.token);
  const user = useSelector((state: Store) => state.user);
  const [data, setData] = useState<DataSet[]>([]);
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
      <PaginationItem key={`p${i}`} className={pagination.page === i ? "active" : ""}>
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
    if (token.length) {
      console.log(token);
      setLoading(true);

      axios
        .get(`${DATASETS_OWNER}?page=${pagination.page}&size=${pagination.size}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoading(false);
          console.log("datasets", response, response.data);

          if (response.data.data) {
            setData(response.data.data);
            setPagination({
              page: response.data.page,
              size: response.data.size,
              totalPages: response.data.totalPages,
              totalElements: response.data.totalElements,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user, pagination.page, token]);

  return (
    <Row>
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Your Data Sets</h3>
              </Col>
              <Col className="text-right" xs="4">
                {user?.type === "RDO" ? (
                  <Button color="primary" onClick={() => history.push(`/data-sets/new`)} size="sm">
                    Add Data Set
                  </Button>
                ) : null}
              </Col>
            </Row>
          </CardHeader>

          {loading && data.length === 0 ? (
            <div className="notification-container" style={{ minHeight: "250px" }}>
              <ProgressIndicator message="Loading Datasets..." />
            </div>
          ) : null}

          {data.length === 0 && !loading ? (
            <div className="notification-container" style={{ minHeight: "250px" }}>
              <Empty message="No Data Found" />
            </div>
          ) : null}

          <Table className="align-items-center table-flush" responsive>
            {data.length ? (
              <thead className="thead-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  {/* <th scope="col">Location</th> */}
                  <th scope="col" className="text-center">
                    Storage Type
                  </th>
                </tr>
              </thead>
            ) : null}
            <tbody>
              {/* {loading ? <TableLoader colspan={"6"} /> : null} */}
              {data.map((item: DataSet, index: number) => {
                return <DataRow key={index} data={item} />;
              })}
            </tbody>
          </Table>
          {data.length ? (
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                  <PaginationItem className={pagination.page === 0 ? "disabled" : ""}>
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
                  <PaginationItem className={pagination.page === pagination.totalPages - 1 ? "disabled" : ""}>
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
