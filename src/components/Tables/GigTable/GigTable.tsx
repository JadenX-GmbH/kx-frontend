import React, { useState, useEffect } from 'react';

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
} from 'reactstrap';

// core components
import axios from 'axios';
import GigRow from './GigRow';
import TableLoader from '../../Utility/Loader/TableLoader';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GigType, Store, PaginationType, OfferType } from '../../../util/types';
import { RDO_GIGS, DS_GIGS, USER_OFFERS } from '../../../util/api';
import ProgressIndicator from '../../Utility/ProgressIndicator/ProgressIndicator';

const GigTable = () => {
  let history = useHistory();
  const token = useSelector((state: Store) => state.token);
  const user = useSelector((state: Store) => state.user);
  const [gigs, setGigs] = useState<GigType[]>([]);
  const [loading, setLoading] = useState(false);
  const [acceptOfferGigs, setAcceptOfferGigs] = useState<number[]>([]);

  const [pagination, setPagination] = useState<PaginationType>({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  });

  let paginationElement = [];

  for (let i = 0; i < pagination.totalPages; i++) {
    paginationElement.push(
      <PaginationItem key={`p${i}`} className={pagination.page === i ? 'active' : ''}>
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
      console.log(user?.type);
      axios
        .get(`${user?.type === 'RDO' ? RDO_GIGS : DS_GIGS}?page=${pagination.page}&size=${pagination.size}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoading(false);
          console.log(response);
          console.log('gigs', response.data);
          if (response.data.data) {
            setGigs(response.data.data);
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

      axios
        .get(`${USER_OFFERS}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.data) {
            console.log(response.data.data);
            const acceptedOffers = response.data.data.filter((offer: OfferType) => offer.accepted);
            const acceptedOffersGigs: number[] = [];
            acceptedOffers.map((offer: OfferType) => {
              acceptedOffersGigs.push(offer.gig);
            });
            console.log('acc off', acceptedOffersGigs);
            setAcceptOfferGigs(acceptedOffersGigs);
          }
        })
        .catch((err) => {
          console.log(err);
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
                <h3 className="mb-0">Your Gigs</h3>
              </Col>
              <Col className="text-right" xs="4">
                {user?.type === 'RDO' ? (
                  <Button color="primary" onClick={() => history.push(`/gigs/new`)} size="sm">
                    Add gig
                  </Button>
                ) : null}
              </Col>
            </Row>
          </CardHeader>

          {loading && gigs.length === 0 ? (
            <div className="notification-container" style={{ minHeight: '250px' }}>
              <ProgressIndicator message="Loading Gigs..." />
            </div>
          ) : null}

          <Table className="align-items-center table-flush" responsive>
            {gigs.length ? (
              <thead className="thead-light">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Title</th>
                  <th scope="col">Price</th>
                  <th scope="col">Max Price</th>
                  <th scope="col" className="text-center">
                    Offers
                  </th>
                  <th scope="col" className="text-center">
                    SLAS
                  </th>

                  <th scope="col">Status</th>
                </tr>
              </thead>
            ) : null}
            <tbody className="loader-container">
              {loading ? <TableLoader colspan={'6'} /> : null}
              {gigs.map((gig: GigType, index: number) => {
                console.log(gig.id, acceptOfferGigs, acceptOfferGigs.includes(gig.id));
                return <GigRow key={index} gig={gig} accepted={acceptOfferGigs.includes(gig.id)} />;
              })}
            </tbody>
          </Table>
          {gigs.length ? (
            <CardFooter className="py-4">
              <nav aria-label="...">
                <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                  <PaginationItem className={pagination.page === 0 ? 'disabled' : ''}>
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
                  <PaginationItem className={pagination.page === pagination.totalPages - 1 ? 'disabled' : ''}>
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
