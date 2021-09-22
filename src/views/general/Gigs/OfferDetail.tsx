import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';

import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import { useSelector } from 'react-redux';

import { Store, OfferType, User, UserType, GigType, Contract } from '../../../util/types';
import { OFFERS, USER_DETAIL, DETAIL_GIGS } from '../../../util/api';

import UserCard from '../../../components/Common/UserCard';
import DefaultCard from '../../../components/Utility/DefaultCard/Card';
import ProgressIndicator from '../../../components/Utility/ProgressIndicator/ProgressIndicator';
import Background from './pexels-christina-morillo-1181675.jpeg';

import parse from 'html-react-parser';
import ReactJson from 'react-json-view';

// core components

const Gigs = () => {
  const token = useSelector((state: Store) => state.token);
  const loggedUser = useSelector((state: Store) => state.user);
  const history = useHistory();
  let { gigId } = useParams<{ gigId: string }>();
  let { offerId } = useParams<{ offerId: string }>();

  const [loading, setLoading] = useState(false);
  const [gig, setGig] = useState<GigType>();
  const [offer, setOffer] = useState<OfferType>();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [user, setUser] = useState<User>();
  const [userCardID, setCardUserID] = useState('');

  const [fetchingContract, setFetchingContract] = useState(false);
  const [loadingContract, setLoadingContract] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (token.length) {
      console.log(token);
      axios
        .get(`${OFFERS}${offerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoading(false);
          if (response.data && response.data.httpStatus !== 404) {
            setOffer(response.data);
            console.log(response.data);
            setOfferAccepted(response.data.accepted);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });

      axios
        .get(`${DETAIL_GIGS}${gigId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('gig detail', response.data);
          if (response.data) {
            setGig(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  useEffect(() => {
    if (offer) {
      if (loggedUser?.type === 'RDO') {
        setCardUserID(offer.specialist);
      } else {
        axios
          .get(`${DETAIL_GIGS}${offer.gig}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setCardUserID(response.data.dataOwner);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [offer]);

  useEffect(() => {
    if (offerAccepted) {
      setLoadingContract(true);
      if ((loggedUser?.type === 'DS' && offer?.specialist === loggedUser.id) || loggedUser?.type === 'RDO') {
        axios
          .get(`${DETAIL_GIGS}${gigId}/contracts`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log('contracts detail', response.data);
            if (response.data.length > 0) {
              setLoadingContract(false);
              console.log('get contract!');
              setContracts(response.data);
            } else {
              console.log('no contract, trying to fetch again');
              setTimeout(() => {
                setFetchingContract((prevState: boolean) => {
                  return !prevState;
                });
              }, 3000);
            }
          })
          .catch((err) => {
            setLoadingContract(false);
            console.log(err);
          });
      }
    }
  }, [offerAccepted, fetchingContract]);

  useEffect(() => {
    if (userCardID) {
      axios
        .get(`${USER_DETAIL}${userCardID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.uid) {
            setUser({
              interId: response.data.id,
              id: response.data.uid,
              userPhoto: response.data.userPhoto,
              description: response.data.description,
              firstName: response.data.details.name,
              lastName: response.data.details.surname,
              email: response.data.details.email,
              type: response.data.type as UserType,
              addresses: response.data.userAddresses,
              skills: response.data.userSkillsets,
              backgroundPhoto: response.data.backgroundPhoto,
              tagLine: response.data.tagLine,
              userGigs: response.data.userGigs,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userCardID]);

  const acceptOffer = () => {
    if (token.length) {
      console.log(offerAccepted);
      setOfferAccepted(true);
      axios
        .patch(
          `${OFFERS}${offerId}?accepted=true`,
          {
            accepted: 'true',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {loading ? (
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: '320px',
            backgroundImage: 'url(' + Background + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          {/* mask bg-gradient-default opacity-8 */}
          <span className="mask bg-gradient-green opacity-8" />
          {/* Header container */}
          <Container className={`align-items-center`} fluid>
            <Row>
              <Col lg="12" md="12">
                  <div className="notification-container">
                    <ProgressIndicator message="Loading Offer...." textColor="#fff" />
                  </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : offer ? (
        <>
          <div
            className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style={{
              minHeight: '320px',
              backgroundImage: 'url(' + Background + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          >
            {/* mask bg-gradient-default opacity-8 */}
            <span className="mask bg-gradient-default opacity-8" />
            {/* Header container */}
            <Container className="d-flex align-items-center" fluid>
              <Row>
                <Col lg="12" md="12">
                  <h1 className="display-3 text-white">
                    Offer #{offerId} For {gig?.title}
                  </h1>
                </Col>
                <Col lg="12" md="12">
                  <a className="back-link" onClick={() => history.push(`/gigs/${offer.gig}`)}>
                    Back to Gig {gigId}
                  </a>
                </Col>
              </Row>
            </Container>
          </div>

          <Container className="mt--6" fluid>
            <div>
              <Row className="gigDetailContainer">
                <Col xs="12" sm="12" md="12" lg="8" className="flex-column">
                  <div className="gig-price app-info-section">
                    <div className="price-card">
                      <Card
                        body
                        inverse
                        style={{
                          backgroundColor: '#6c6c7f',
                          borderColor: '#6c6c7f',
                        }}
                      >
                        <CardTitle>Offered Price</CardTitle>
                        <CardText>{offer.price} &euro; (1730 KXT)</CardText>
                      </Card>
                    </div>
                    <div className="price-card">
                      <Card
                        body
                        inverse
                        style={
                          offerAccepted
                            ? {
                                backgroundColor: '#2dce89',
                                borderColor: '#2dce89',
                              }
                            : {
                                backgroundColor: '#6c6c7f',
                                borderColor: '#6c6c7f',
                              }
                        }
                      >
                        <CardTitle>Status</CardTitle>
                        <CardText>{offerAccepted ? 'Accepted' : 'Open'}</CardText>
                      </Card>
                    </div>
                  </div>

                  <div className="full-width app-info-section">
                    <DefaultCard
                      title="Details"
                      headerbuttons={
                        loggedUser?.type === 'RDO' && !offerAccepted
                          ? [
                              <Button onClick={acceptOffer} key="bt-1" size="sm" color="success">
                                Accept
                              </Button>,
                              <Button key="bt-2" size="sm" color="danger">
                                Reject
                              </Button>,
                            ]
                          : []
                      }
                    >
                      <div>{parse(offer.description)}</div>
                    </DefaultCard>
                  </div>

                  {offerAccepted && (
                    <div className="full-width app-info-section">
                      <DefaultCard title="Contract">
                        {loadingContract ? (
                          <div>Loading contract...</div>
                        ) : contracts.length > 0 ? (
                          <>
                            {contracts.map((contract) => {
                              return (
                                <div key={contract.id}>
                                  <div>
                                    Contract Creation Transaction:
                                    <br />
                                    <a
                                      href={'https://rinkeby.etherscan.io/tx/' + contract.transactionId}
                                      target="_blank"
                                    >
                                      {contract.transactionId}
                                    </a>
                                  </div>
                                  <div className="mt-3">Contract Details:</div>
                                  <ReactJson
                                    src={JSON.parse(contract.aggregatedJson)}
                                    theme="summerfruit:inverted"
                                    displayDataTypes={false}
                                    displayObjectSize={false}
                                    collapsed={true}
                                    enableClipboard={false}
                                  />
                                </div>
                              );
                            })}
                          </>
                        ) : (
                          <div>No contract yet</div>
                        )}
                      </DefaultCard>
                    </div>
                  )}
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" className="flex-column">
                  <div className="full-width app-info-section">
                    {user ? (
                      <UserCard user={user} />
                    ) : (
                      <div className="notification-container">
                        <ProgressIndicator message="Loading ...." textColor="#fff" />
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      ) : (
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: '320px',
            backgroundImage: 'url(' + Background + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          {/* mask bg-gradient-default opacity-8 */}
          <span className="mask bg-gradient-green opacity-8" />
          {/* Header container */}
          <Container className={`align-items-center`} fluid>
            <Row>
              <Col lg="12" md="12">
                <h1 className="display-3 text-white">No Offer Found</h1>
              </Col>
              <Col lg="12" md="12">
                <a className="back-link" onClick={() => history.push(`/gigs/${gigId}`)}>
                  Back to Gig {gigId}
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Gigs;
