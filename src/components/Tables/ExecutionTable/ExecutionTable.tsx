import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  Col,
  Button,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Row,
} from "reactstrap";


// core components

import axios from "axios";

import ExecutionRow from "./ExecutionRow";
import TableLoader from "../../Utility/Loader/TableLoader";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Execution, Exploration } from "../../../util/types";

import { Store, PaginationType } from "../../../util/types";
import { EXECUTION_JOBS, EXPLORATION_JOBS } from "../../../util/api";

const GigTable = () => {
  let history = useHistory();
  const token = useSelector((state: Store) => state.token);
  const user = useSelector((state: Store) => state.user);
  // const [offers, setOffers] = useState<Execution[]>([]);
  const [executionJobs, setExecutionJobs] = useState<Execution[]>([]);
  const [explorationJobs, setExplorationJobs] = useState<Exploration[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  // const fetchPage = (pageNum: number) => {
  //   setCurrentPage(pageNum);
  // };

  useEffect(() => {
    if (token.length) {
      setLoading(true);

      try {
        axios
        .get(`${EXECUTION_JOBS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("execution jobs", response.data);
          setExecutionJobs(response.data);
        })

        axios
        .get(`${EXPLORATION_JOBS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("expolation jobs", response.data);
          setExplorationJobs(response.data);
        })
      } catch(err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }, [token]);

  return (
    <Row>
      <div className="col">
        <Card className="shadow mb-5">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Your Execution jobs</h3>
              </Col>
            </Row>
          </CardHeader>

          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">
                  Type
                </th>
                <th scope="col" className="text-center">
                  Worker Pool
                </th>
                <th scope="col" className="text-center">
                  Worker
                </th>
                <th scope="col" className="text-center">
                  Created
                </th>

                <th scope="col" className="text-center">
                  Updated
                </th>
                <th scope="col" className="text-center">
                  Gig
                </th>
              </tr>
            </thead>
            <tbody className="loader-container">
              {loading ? <TableLoader colspan={"6"} /> : null}
              {executionJobs.length > 0 ? executionJobs.map((executionJob: Execution, index: number) => {
                return <ExecutionRow key={index} data={executionJob} isExecution={true} />;
              }): null}
            </tbody>
          </Table>
          {/* <CardFooter className="py-4">
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
          </CardFooter> */}
        </Card>
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Your Exploration jobs</h3>
              </Col>
            </Row>
          </CardHeader>

          <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">
                  Created
                </th>

                <th scope="col" className="text-center">
                  Updated
                </th>
                <th scope="col" className="text-center">
                  Gig
                </th>
              </tr>
            </thead>
            <tbody className="loader-container">
              {loading ? <TableLoader colspan={"6"} /> : null}
              {explorationJobs.length > 0 ? explorationJobs.map((explorationJob: Exploration, index: number) => {
                return <ExecutionRow key={index} data={explorationJob} isExecution={false} />;
              }): null}
            </tbody>
          </Table>
        </Card>
      </div>
    </Row>
  );
};

export default GigTable;
