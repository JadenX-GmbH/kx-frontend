import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
  Progress,
  Table,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardHeader,
  Badge,
} from 'reactstrap';

import DefaultCard from '../../../components/Utility/DefaultCard/Card';
import Background from './pexels-christina-morillo-1181675.jpeg';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TableLoader from '../../../components/Utility/Loader/TableLoader';
import OfferRow from '../../../components/Tables/OfferTable/OfferRow';
import {
  GigType,
  Store,
  Execution,
  Exploration,
  User,
  UserType,
  PaginationType,
  OfferType,
  DataSet,
  ExecutionGig,
  Skill,
  Skills,
} from '../../../util/types';
import { DETAIL_GIGS, EXPLORATION, USER_DETAIL, base, DATASETS_OWNER, SKILLS } from '../../../util/api';
import axios from 'axios';
import UserCard from '../../../components/Common/UserCard';
import ProgressIndicator from '../../../components/Utility/ProgressIndicator/ProgressIndicator';
import Modal from '../../../components/Utility/Modal/Modal';
import Empty from '../../../components/Utility/Empty/Empty';
import parse from 'html-react-parser';

const { default: TruncateText } = require('../../../util/Truncate');
// core components

const GidDetail = () => {
  const token = useSelector((state: Store) => state.token);
  const user = useSelector((state: Store) => state.user);
  let history = useHistory();
  let { gigId } = useParams<{ gigId: string }>();
  let [dataModal, setDataModal] = useState<boolean>(false);
  let [Gig, setGig] = useState<GigType | null>(null);
  let [executionGig, setExecutionGig] = useState<ExecutionGig | null>(null);
  let [executions, setExecutions] = useState<Execution[]>([]);
  let [explorations, setExplorations] = useState<Exploration[]>([]);
  let [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [skillsAll, setskillsAll] = useState<Skills[]>();
  const [gigSkillsID, setGigSkillsID] = useState<{ skillsetId: string }[]>();
  const [requiredSkills, setRequiredSkills] = useState<Skills[]>([]);
  const [selectedDatasetsModal, setSelectedDatasetsModal] = useState<DataSet[]>([]);
  const [selectedDatasetsFull, setSelectedDatasetsFull] = useState<DataSet[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [loadingOffer, setLoadingOffer] = useState<Boolean>(false);
  const [offers, setOffers] = useState<OfferType[]>([]);
  const [ownerdataSets, setOD] = useState<DataSet[]>([]);
  const [loadingOD, setLoadingOD] = useState<Boolean>(false);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 0,
    size: 10,
    totalPages: 0,
    totalElements: 0,
  });

  useEffect(() => {
    if (token.length && gigId) {
      console.log(token);
      setLoading(true);
      axios
        .get(`${DETAIL_GIGS}${gigId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('gig detail', response.data);
          if (response.data?.id) {
            setGig(response.data);
            setGigSkillsID(response.data.skillsetDTOList);
            // try {
            //   if (response.data.gigChosenSpecialists[0]) {
            //     fetchChosenSpecialist(
            //       response.data.gigChosenSpecialists[0] as number
            //     );
            //   }
            // } catch (e) {
            //   console.log("no gigChosenSpecialists ", e);
            // }

            fetchOffers(response.data.id);
          }

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${EXPLORATION}${gigId}/executions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('gig executions', response.data);
          if (Array.isArray(response.data)) setExecutions(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${EXPLORATION}${gigId}/explorations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (Array.isArray(response.data)) setExplorations(response.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${EXPLORATION}${gigId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('dataset', response, response.data);
          if (response.data) {
            setExecutionGig(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${EXPLORATION}${gigId}/datasets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('datasets', response, response.data.data);
          if (response.data.data) {
            console.log('execution datsets', response.data.data);
            setSelectedDatasetsFull(response.data.data);
            if (user?.type === 'DS') {
              const obsDatasets = response.data.data.filter((dataset: DataSet) => dataset.type === 'OBFUSCATED');
              setSelectedDatasetsFull(obsDatasets);
            } else {
              setSelectedDatasetsFull(response.data.data);
            }
            setSelectedDatasetsModal(response.data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(`${DATASETS_OWNER}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('owner datasets ', response.data);
          if (response?.data?.data) setOD(response.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get(SKILLS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setskillsAll(response.data);
          console.log('skills', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token, gigId]);

  useEffect(() => {
    if (skillsAll && gigSkillsID) {
      const gigSkills: Skills[] = [];
      skillsAll.map((skill) => {
        gigSkillsID.map((gigSkill) => {
          if (skill.id.toString() === gigSkill.skillsetId) gigSkills.push(skill);
        });
      });

      setRequiredSkills(gigSkills);
    }
  }, [skillsAll, gigSkillsID]);

  const fetchChosenSpecialist = (uid: string) => {
    console.log(uid);
    axios
      .get(`${USER_DETAIL}${uid}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('user detail', response.data);
        if (response.data.uid) {
          let user = {
            dataOwner: response.data.dataOwner,
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
          };
          setSelectedUser(user as User);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchOffers = (id: number) => {
    setLoadingOffer(true);
    let url = '';

    if (user?.type !== 'DS') url = `${base}/gig/gigs/${id}/offers?page=${pagination.page}&size=${pagination.size}`;
    else url = `${base}/gig/gigs/${id}/specialist/offers`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('gig offers', response.data);

        let list = [];

        if (response.data.data) {
          list = response.data.data;
        } else list = response.data;

        setOffers(list);

        if (response.data.data)
          setPagination({
            page: response.data.page,
            size: response.data.size,
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements,
          });
        else {
          setPagination({
            page: 0,
            size: 1,
            totalPages: 1,
            totalElements: 1,
          });
        }

        setLoadingOffer(false);

        //setSelectedUser(user as User);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (selectedUser === null && offers) {
      if (user?.type === 'DS' && Gig?.dataOwner) {
        fetchChosenSpecialist(Gig.dataOwner);
      } else {
        let offer = offers.find((item: OfferType) => item.accepted) as OfferType;
        console.log('a', offer, user?.id, Gig?.dataOwner);
        if (offer) fetchChosenSpecialist(offer.specialist);
      }
    }
    // if (selectedUser === null && offers) {
    //   let offer = offers.find((item: OfferType) => item.accepted) as OfferType;
    //   console.log('a', offer, user?.id, Gig?.dataOwner);
    //   if (offer) fetchChosenSpecialist(user?.id === Gig?.dataOwner ? offer.specialist : Gig?.dataOwner!);
    // }
  }, [offers]);

  const datasetsCheckboxHandle = (e: any, item: DataSet) => {
    const target = e.target;

    if (target.checked) {
      setSelectedDatasetsModal((previousState) => {
        return [...previousState, item];
      });
    } else {
      setSelectedDatasetsModal((previousState) => {
        const newState = previousState.filter((elem) => {
          return elem.id !== item.id;
        });
        return [...newState];
      });
    }
  };

  const connectDatasetToGig = () => {
    if (executionGig) {
      setSelectedDatasetsFull(selectedDatasetsModal);
      let selectedDatasetsID: number[] = [];
      selectedDatasetsModal.map((elem) => selectedDatasetsID.push(elem.id));

      setExecutionGig((prevState: any) => {
        return { ...prevState, gigDatasets: selectedDatasetsID };
      });
      const updatedExecutionGig = { ...executionGig, gigDatasets: selectedDatasetsID };

      axios
        .put(`${EXPLORATION}${gigId}`, updatedExecutionGig, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('execution gig', response, response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setDataModal(false);
  };

  useEffect(() => {
    if (offers.length && Gig?.id) fetchOffers(Number(Gig.id));
  }, [pagination.page]);

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
                    <ProgressIndicator message="Loading Gig...." textColor="#fff" />
                  </div>
                </Col>
            </Row>
          </Container>
        </div>
      ) : Gig ? (
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
            <span className="mask bg-gradient-green opacity-8" />

            <Container className="d-flex align-items-center" fluid>
              <Row>
                <Col lg="12" md="12">
                  <h1 className="display-3 text-white">Gig # {Gig.id}</h1>
                  <h3 className="display-5 text-white">{Gig.title}</h3>
                </Col>
                <Col lg="12" md="12">
                  <a className="back-link" onClick={() => history.push(`/gigs/`)}>
                    Back to Gigs
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
                        <CardTitle>Price for your Specialist</CardTitle>
                        <CardText>
                          {Gig.maxPrice}&euro; ({Gig.maxPrice} KXT)
                        </CardText>
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
                        <CardTitle>Price for execution in kx infrastructure</CardTitle>
                        <CardText>135,23 &euro; (50 RLC)</CardText>
                      </Card>
                    </div>
                  </div>
                  <div className="gig-action-buttons app-info-section">
                    {user?.type === 'DS' && !Gig.offerAccepted && (
                      <Button size="sm" onClick={() => history.push(`/gigs/${Gig?.id}/offers/new`)}>
                        Make Offer
                      </Button>
                    )}
                    {user?.type === 'DS' && Gig.offerAccepted && (
                      <Button
                        size="sm"
                        disabled={selectedDatasetsFull.length === 0}
                        onClick={() => history.push(`/executions/explorations/new/${gigId}`)}
                      >
                        Add Exploration
                      </Button>
                    )}
                    {user?.type === 'RDO' && Gig.offerAccepted && (
                      <Button
                        size="sm"
                        disabled={selectedDatasetsFull.length === 0}
                        onClick={() => history.push(`/executions/new/${gigId}`)}
                      >
                        Start Execution
                      </Button>
                    )}
                    {user?.type === 'RDO' && <Button size="sm">Finish Gig</Button>}
                    {/* {Gig.offerAccepted && Gig.status === 'IN_PROGRESS' && <Button size="sm">Finish Gig</Button>} */}
                  </div>

                  {console.log(selectedDatasetsFull)}
                  <div className="full-width app-info-section">
                    <DefaultCard title="Description">{parse(Gig.description)}</DefaultCard>
                  </div>

                  <div className="full-width app-info-section">
                    <DefaultCard title="Skills" shortVersion={true}>
                      {requiredSkills.length > 0 ? (
                        <div className="badges">
                          {requiredSkills.map((elem) => (
                            <Badge color="success" key={elem.id}>
                              {elem.name}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <div>No required skills</div>
                      )}
                    </DefaultCard>
                  </div>

                  <div className="full-width app-info-section">
                    <DefaultCard title="Results">
                      <div>No results yet</div>
                    </DefaultCard>
                  </div>

                  <div className="full-width app-info-section">
                    <DefaultCard title="Service Level Agreements">
                      {Gig.slaStatementDTOList.length > 0 ? (
                        <>
                          {Gig.slaStatementDTOList.map((sla, index) => {
                            return (
                              <div key={index} className="mb-2">
                                <b>Subject: </b>
                                <span>{sla.subject}</span>
                                <br />
                                <b>Restiction: </b> <span>{sla.restriction}</span>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <div>No required SLA</div>
                      )}
                    </DefaultCard>
                  </div>

                  <div className="full-width app-info-section">
                    {/* <DefaultCard title="Offers"> */}

                    <Card className="shadow">
                      <CardHeader className="border-0">
                        <Row className="align-items-center">
                          <Col xs="8">
                            <h3 className="mb-0">Offers</h3>
                          </Col>
                        </Row>
                      </CardHeader>
                      {loadingOffer && offers.length === 0 ? (
                        <div className="notification-container" style={{ minHeight: '250px' }}>
                          <ProgressIndicator message="Loading Offer..." />
                        </div>
                      ) : null}

                      {offers.length === 0 && !loadingOffer ? (
                        <div className="notification-container" style={{ minHeight: '250px' }}>
                          <Empty message="No Offer Found" />
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
                          {loadingOffer ? <TableLoader colspan={'6'} /> : null}
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
                              <PaginationItem className={pagination.page === 0 ? 'disabled' : ''}>
                                <PaginationLink
                                  href="#pablo"
                                  onClick={(e) => {
                                    e.preventDefault();

                                    setPagination((values) => {
                                      return {
                                        ...values,
                                        page: pagination.page - 1,
                                      };
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
                                className={pagination.page === pagination.totalPages - 1 ? 'disabled' : ''}
                              >
                                <PaginationLink
                                  href="#pablo"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setPagination((values) => {
                                      return {
                                        ...values,
                                        page: pagination.page + 1,
                                      };
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
                      {/* </DefaultCard> */}
                    </Card>
                  </div>
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" className="flex-column">
                  <div className="full-width app-info-section">
                    {console.log(selectedUser)}
                    {selectedUser ? <UserCard user={selectedUser} /> : null}
                  </div>

                  <div className="full-width app-info-section">
                    <DefaultCard title="Execution and explorations">
                      {executions.map((item: Execution) => (
                        <div key={item.id}>
                          <p className="execution-info">
                            Execution job{' '}
                            <a className="link" onClick={() => history.push(`/executions/${item.id}`)}>
                              {item.id}
                            </a>
                          </p>
                          <Progress color="success" value="25" />
                        </div>
                      ))}

                      {explorations.map((item: Exploration) => (
                        <div key={item.id}>
                          <p className="execution-info">
                            Exploration job{' '}
                            <a className="link" onClick={() => history.push(`/executions/explorations/${item.id}`)}>
                              {item.id}
                            </a>
                          </p>
                          <Progress color="success" value="25" />
                        </div>
                      ))}

                      {executions.length === 0 && explorations.length === 0 ? (
                        <div className="notification-container" style={{ minHeight: '100px' }}>
                          <Empty message="No Data Available " />
                        </div>
                      ) : null}
                    </DefaultCard>
                  </div>

                  <div className="full-width app-info-section">
                    <DefaultCard
                      title="Gig Data"
                      headerbuttons={[
                        <Button
                          key="gig-dataset"
                          size="sm"
                          color="default"
                          style={user?.type === 'DS' ? { display: 'none' } : {}}
                          onClick={() => {
                            setDataModal(true);
                          }}
                        >
                          Connect Dataset
                        </Button>,
                      ]}
                    >
                      <div className="notification-container">
                        <div className="wrap-table-sidebar">
                          {selectedDatasetsFull.length > 0 ? (
                            <Table className="align-items-center table-flush table-sidebar" size="sm">
                              <thead className="thead-light">
                                <tr>
                                  <th scope="col">File Name</th>
                                  <th scope="col">Storage</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody className="loader-container">
                                {selectedDatasetsFull.map((dataset, index) => {
                                  if (user?.type === 'DS' && dataset.type === 'RAW') return;
                                  else {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <TruncateText text={dataset.title} length={12} />
                                        </td>
                                        <td>
                                          {/* <TruncateText text={dataset.storageType} length={12} /> */}
                                          {dataset.storageType}
                                        </td>
                                        <td className="text-right">
                                          <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                              window.open(
                                                dataset.location,
                                                '_blank',
                                                'noopener,noreferrer'
                                              );
                                            }}
                                          >
                                            Download
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  }
                                })}
                              </tbody>
                            </Table>
                          ) : (
                            <Empty message="No Data Available " />
                          )}
                        </div>
                      </div>
                    </DefaultCard>
                  </div>
                </Col>
              </Row>
            </div>

            {dataModal ? (
              <Modal title="Available Datasets" closeModal={setDataModal} submitModal={connectDatasetToGig}>
                {loadingOD && ownerdataSets.length === 0 ? (
                  <div className="notification-container" style={{ minHeight: '250px' }}>
                    <ProgressIndicator message="Loading Available Data sets..." />
                  </div>
                ) : null}
                <Table className="align-items-center table-flush" responsive>
                  {ownerdataSets.length ? (
                    <thead className="thead-light">
                      <tr>
                        <th scope="col" style={{ width: '45px', maxWidth: '45px' }}></th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                  ) : null}
                  <tbody className="loader-container">
                    {loading ? <TableLoader colspan={'6'} /> : null}
                    {ownerdataSets.map((item: DataSet) => {
                      return (
                        <tr key={item.id}>
                          <th scope="row">
                            <input
                              type="checkbox"
                              name="datasets"
                              id={`dataset-${item.id}`}
                              value={item.title}
                              defaultChecked={selectedDatasetsFull?.some((elem) => elem.id === item.id)}
                              onChange={(e) => datasetsCheckboxHandle(e, item)}
                            />
                          </th>

                          <td>{item.title}</td>

                          <td>{item.description}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Modal>
            ) : null}
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
                <h1 className="display-3 text-white">No Gig Found</h1>
              </Col>
              <Col lg="12" md="12">
                <a className="back-link" onClick={() => history.push(`/gigs/`)}>
                  Back to Gigs
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
