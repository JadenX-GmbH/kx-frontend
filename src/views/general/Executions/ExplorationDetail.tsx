import React, { useState, useEffect } from 'react';

import ProgressIndicator from '../../../components/Utility/ProgressIndicator/ProgressIndicator';

import { useSelector } from 'react-redux';

import axios from 'axios';

import { useHistory, useParams } from 'react-router-dom';
import { Store, Exploration, User, DataSet } from '../../../util/types';
import { EXPLORATION_JOBS, EXPLORATION, USER_DETAIL, DATASETS } from '../../../util/api';

import parse from 'html-react-parser';

import { Container, Row, Col } from 'reactstrap';
import UserCard from '../../../components/Common/UserCard';
import DefaultCard from '../../../components/Utility/DefaultCard/Card';
import Background from '../Gigs/pexels-christina-morillo-1181675.jpeg';

// core components

const GidDetail = () => {
  let history = useHistory();
  const token = useSelector((state: Store) => state.token);
  const user = useSelector((state: Store) => state.user);
  const { explId } = useParams<{ explId: string }>();
  const [explorationInfo, setExplorationInfo] = useState<Exploration>();
  const [gigID, setGigID] = useState();
  const [userID, setUserID] = useState();
  const [userCard, setUserCard] = useState<User | null>(null);
  const [datasetID, setDatasetID] = useState();
  const [dataset, setDataSet] = useState<DataSet>();
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    if (token.length) {
      setLoading(true);
      axios
        .get(`${EXPLORATION_JOBS}${explId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setLoading(false);
          console.log('execution job', response.data);
          if (response.data && response.data.httpStatus !== 404) {
            setExplorationInfo(response.data);
            setGigID(response.data.gig);
            setDatasetID(response.data.dataset);
          }
        })
        .catch((err) => {
          console.log('err', err);
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
          console.log('gig info', response.data);

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
          console.log('userInfo', response.data);
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
                    <ProgressIndicator message="Loading Exploration...." textColor="#fff" />
                  </div>
                </Col>
            </Row>
          </Container>
        </div>
      ) : explorationInfo ? (
        <>
          {console.log('exploration', explorationInfo)}
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
                    Exploration #{explorationInfo.id} for Gig #{explorationInfo.gig}
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
                  <div className="full-width app-info-section">
                    <DefaultCard title="Details">{parse(explorationInfo.description)}</DefaultCard>
                  </div>

                  <div className="full-width app-info-section">
                    <DefaultCard title="Results">
                      <div>
                        <b>Exploration Job:</b> {explorationInfo.explorationResultDTO.explorationJob}
                      </div>
                      <div>
                        <b>Storage Type:</b> <span>{explorationInfo.explorationResultDTO.storateType}</span>
                      </div>
                      <div className="mt-3">
                        <a
                          className="btn btn-primary btn-sm"
                          href={'https://ipfs.io/ipfs/' + explorationInfo.explorationResultDTO.location}
                          // download={'https://ipfs.io/ipfs/' + explorationInfo.explorationResultDTO.location}
                        >
                          Download results
                        </a>
                      </div>
                    </DefaultCard>
                  </div>
                </Col>
                <Col xs="12" sm="12" md="12" lg="4" className="flex-column">
                  <div className="full-width app-info-section">
                    <DefaultCard title="Data in this execution">
                      {dataset ? dataset.title : 'No attached dataset'}
                    </DefaultCard>
                  </div>

                  {/* <div className="full-width app-info-section">
                <DefaultCard title="Program code used" inverse style={{ backgroundColor: '#333', borderColor: '#333' }}>
                  info 1
                  <br />
                  info 2
                  <br />
                  info 3
                </DefaultCard>
              </div> */}

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
                <h1 className="display-3 text-white">No Exploration Found</h1>
              </Col>
              <Col lg="12" md="12">
                <a className="back-link" onClick={() => history.push(`/executions/`)}>
                  Back to Explorations
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
