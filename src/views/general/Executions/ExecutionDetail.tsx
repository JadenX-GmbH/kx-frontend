import React, { useState, useEffect } from 'react';

import {
  Timeline,
  Container as ContainerTimeLine,
  YearContent,
  BodyContent,
  Section,
  Description,
} from 'vertical-timeline-component-react';

import ProgressIndicator from '../../../components/Utility/ProgressIndicator/ProgressIndicator';
import { useSelector } from 'react-redux';

import axios from 'axios';

import { useHistory, useParams } from 'react-router-dom';

import { Store, Execution, User, DataSet, Order, ExecutionStatus } from '../../../util/types';

import { EXECUTION_JOBS, EXPLORATION, USER_DETAIL, DATASETS, EXECUTION_STATUS, ORDERS } from '../../../util/api';

import parse from 'html-react-parser';

import { Container, Row, Col, Card, CardTitle, CardText } from 'reactstrap';

import ReactJson from 'react-json-view';

import UserCard from '../../../components/Common/UserCard';
import DefaultCard from '../../../components/Utility/DefaultCard/Card';
import Background from '../Gigs/pexels-christina-morillo-1181675.jpeg';

// core components

const GidDetail = () => {
  let history = useHistory();
  const token = useSelector((state: Store) => state.token);
  const user = useSelector((state: Store) => state.user);
  let { execId } = useParams<{ execId: string }>();
  const [executionInfo, setExecutionInfo] = useState<Execution>();
  const [gigID, setGigID] = useState();
  const [userID, setUserID] = useState();
  const [userCard, setUserCard] = useState<User | null>(null);
  const [datasetID, setDatasetID] = useState();
  const [dataset, setDataSet] = useState<DataSet>();
  const [loading, setLoading] = useState<Boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [executionStatus, setExecutionStatus] = useState();
  const [executionStatusFull, setExecutionStatusFull] = useState<ExecutionStatus>();
  const [fetchingExecutionStatus, setFetchingExecutionStatus] = useState(false);
  const [date, setDate] = useState<string>();

  useEffect(() => {
    if (token.length) {
      console.log(token);
      setLoading(true);
      axios
        .get(`${EXECUTION_JOBS}${execId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoading(false);
          console.log('execution job', response.data);
          console.log('execution status', response.data.httpStatus);
          if (response.data && response.data.httpStatus !== 404) {
            setExecutionInfo(response.data);
            setGigID(response.data.gig);
            setDatasetID(response.data.dataset);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [token]);

  useEffect(() => {
    console.log(datasetID);
    if (datasetID) {
      axios
        .get(`${DATASETS}${datasetID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('dataset info', response, response.data);
          setDataSet(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [datasetID]);

  useEffect(() => {
    if (gigID) {
      axios
        .get(`${EXPLORATION}${gigID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('gig info', response, response.data);

          if (user?.type === 'RDO') {
            setUserID(response.data.specialist);
          } else {
            setUserID(response.data.dataOwner);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [gigID]);

  useEffect(() => {
    if (userID) {
      axios
        .get(`${USER_DETAIL}${userID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('userInfo', response, response.data);
          if (response.data.uid) {
            let user = {
              id: response.data.uid,
              userPhoto: response.data.userPhoto,
              firstName: response.data.details.name,
              lastName: response.data.details.surname,
              addresses: response.data.userAddresses,
              backgroundPhoto: response.data.backgroundPhoto,
              userGigs: response.data.userGigs,
            };
            setUserCard(user as User);
          }
          // setGigInfo(response.data);

          // if (response.data) {
          //   setExecutionInfo(response.data);
          // }

          // setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // setExist(false);
        });
    }
  }, [userID]);

  const getExecutionStatus = () => {
    if (executionInfo?.dealId) {
      axios
        .get(`${EXECUTION_STATUS}${executionInfo.dealId}/results`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('execution status', response.data, response.data.statusName);
          if(response.data.statusName !== 'COMPLETED') {
            console.log('in progress', response.data);
            setExecutionStatus(response.data);
            setFetchingExecutionStatus((prevState: boolean) => {
              return !prevState;
            });
          } else {
            console.log('completed', response.data);
            setExecutionStatus(response.data.statusName);
            setExecutionStatusFull(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getExecutionStatus();
  }, [executionInfo]);

  useEffect(() => {
    console.log('status', executionStatus);
    if (executionStatus !== 'COMPLETED') {
      setTimeout(() => {
        getExecutionStatus();
      }, 5000);
    }
  }, [fetchingExecutionStatus]);

  useEffect(() => {
    if (token.length) {
      axios
        .get(`${ORDERS}?execution_job=${execId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('orders', response, response.data);
          setOrders(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, execId]);

  const customTheme = {
    yearColor: '#405b73',
    lineColor: '#d0cdc4',
    dotColor: '#262626',
    borderDotColor: '#d0cdc4',
    titleColor: '#405b73',
    subtitleColor: '#bf9765',
    textColor: '#262626',
  };

  const getDate = () => {
    const date = new Date();

    let offset = date.getTimezoneOffset();
    let time = new Date(date.getTime() - offset * 60 * 1000);
    return time.toISOString().split('T')[0].replace(/-/g, '/');
  };

  useEffect(() => {
    setDate(getDate());
  }, []);

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
                  <ProgressIndicator message="Loading Execution...." textColor="#fff" />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : executionInfo ? (
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
                    Execution #{executionInfo?.id} for Gig #{executionInfo?.gig}
                  </h1>
                </Col>
                <Col lg="12" md="12">
                  <a className="back-link" onClick={() => history.push(`/gigs/${gigID}`)}>
                    Back to Gig
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
                        <CardTitle>Cost</CardTitle>
                        <CardText>{executionInfo.priceToken ? executionInfo.priceToken : 0} tokens</CardText>
                      </Card>
                    </div>
                    <div className="price-card">
                      <Card
                        body
                        inverse
                        style={{
                          backgroundColor: '#6c6c7f',
                          borderColor: '#6c6c7f',
                        }}
                      >
                        <CardTitle>Type</CardTitle>
                        <CardText>{executionInfo.executionType}</CardText>
                      </Card>
                    </div>
                  </div>

                  <div className="full-width app-info-section">
                    <DefaultCard title="Details">{parse(executionInfo.description)}</DefaultCard>
                  </div>

                  {orders.map((order) => {
                    return (
                      <div className="full-width app-info-section">
                        <DefaultCard title={order.name}>
                          <div>
                            <a href={order.blockchainIdentifier + order.transactionId} target="_blank" rel="noreferrer">
                              {order.transactionId}
                            </a>
                            <div>
                              <ReactJson
                                src={JSON.parse(order.orderDetails)}
                                theme="summerfruit:inverted"
                                displayDataTypes={false}
                                displayObjectSize={false}
                                collapsed={true}
                                enableClipboard={false}
                              />
                            </div>
                          </div>
                        </DefaultCard>
                      </div>
                    );
                  })}

                  <div className="full-width app-info-section">
                    <DefaultCard title="Results">
                      {executionInfo.executionResultDTO ? (
                        <>
                          <div>
                            <div>
                              <b>Execution Job:</b> {executionInfo.executionResultDTO.executionJob}
                            </div>
                            <div>
                              <b>Storage Type:</b> {executionInfo.executionResultDTO.storageType}
                            </div>
                            <div>
                              <b>Transaction ID:</b> <a href={executionInfo.executionResultDTO.blockchainIdentifier + executionInfo.executionResultDTO.transactionId} target="_blank" rel="noreferrer">{executionInfo.executionResultDTO.transactionId}</a>
                            </div>
                            <div className="mt-3">
                              <a
                                className="btn btn-primary btn-sm"
                                href={executionInfo.executionResultDTO.location}
                                download={executionInfo.executionResultDTO.transactionId}
                              >
                                Download results
                              </a>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div>No results yet</div>
                      )}
                    </DefaultCard>
                  </div>
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" className="flex-column">
                  <div className="full-width app-info-section">
                    <DefaultCard title="Status">
                      {executionStatus && (
                        <Timeline theme={customTheme} dateFormat="l">
                          {(executionStatus === 'ACTIVE' ||
                            executionStatus === 'REVEALING' ||
                            executionStatus === 'COMPLETED') && (
                            <ContainerTimeLine>
                              <YearContent startDate={date} />
                              <BodyContent>
                                <Section title="Active">
                                  <Description text="Your Execution Job has been started!" />
                                </Section>
                              </BodyContent>
                            </ContainerTimeLine>
                          )}
                          {(executionStatus === 'REVEALING' ||
                            executionStatus === 'COMPLETED') && (
                            <ContainerTimeLine>
                              <YearContent startDate={date} />
                              <BodyContent>
                                <Section title="Revealing">
                                  <Description text="Process data..." />
                                </Section>
                              </BodyContent>
                            </ContainerTimeLine>
                          )}
                          {executionStatus === 'COMPLETED' && executionStatusFull && (
                            <ContainerTimeLine>
                              <YearContent startDate={date} />
                              <BodyContent>
                                <Section title="Completed!">
                                  <a href={executionStatusFull.resorceLink}>Get the results!</a>
                                </Section>
                              </BodyContent>
                            </ContainerTimeLine>
                          )}
                        </Timeline>
                      )}
                    </DefaultCard>
                  </div>

                  <div className="full-width app-info-section">
                    <DefaultCard title="Data in this execution">
                      {dataset ? dataset.title : 'No attached dataset'}
                    </DefaultCard>
                  </div>

                  <div className="full-width app-info-section">
                    <DefaultCard
                      title="Program code used"
                      inverse
                      style={{ backgroundColor: '#333', borderColor: '#333' }}
                    >
                      {executionInfo.programDTOList.map((elem, index) => {
                        return <div key={index}>{elem.location}</div>;
                      })}
                    </DefaultCard>
                  </div>

                  <div className="full-width app-info-section">{userCard ? <UserCard user={userCard} /> : null}</div>
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
                <h1 className="display-3 text-white">No Execution Found</h1>
              </Col>
              <Col lg="12" md="12">
                <a className="back-link" onClick={() => history.push(`/executions/`)}>
                  Back to Executions
                </a>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default GidDetail;
