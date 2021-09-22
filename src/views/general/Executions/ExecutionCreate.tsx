import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';

import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Store, DataSet, ExecutionType } from '../../../util/types';
import { EXPLORATION, EXECUTION_JOBS, PROGRAMS } from '../../../util/api';

import { Container, Row, Col, Card, CardBody, CardHeader, Button, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

import InputSection from '../../../components/Utility/Form/InputSection';
import Background from '../Gigs/pexels-christina-morillo-1181675.jpeg';

import ProgressIndicator from '../../../components/Utility/ProgressIndicator/ProgressIndicator';

import ReactQuill from 'react-quill';

// core components

const ExecutionCreate = () => {
  const history = useHistory();
  const token = useSelector((state: Store) => state.token);
  const { gigId } = useParams<{ gigId: string }>();
  const [datasets, setDatasets] = useState<DataSet[]>();
  const [inputParams, setInputParams] = useState<string[]>([]);
  const [choosenDataset, setChoosenDataset] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [executionType, setExecutionType] = useState<ExecutionType>('CLOUD');
  const [loading, setLoading] = useState(false);
  const [linkError, setLinkError] = useState(false);

  const inputParamRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (token.length) {
      console.log(token);
      axios
        .get(`${EXPLORATION}${gigId}/datasets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('datasets', response.data.data);
          if (response.data.data) {
            const rawDatasets = response.data.data.filter((dataset: DataSet) => dataset.type === 'RAW');
            setDatasets(rawDatasets);
            // setChoosenDataset(rawDatasets[0].title);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  const updatePrograms = (executionJob: number) => {
    let multiaddr: RegExpMatchArray | null | string = location.match(/(iexechub\/\w*)(\/[.\d]*)/);
    if (multiaddr) {
      multiaddr = 'docker.io/' + multiaddr[1] + multiaddr[2].replace(/\//, ':');
    }
    const hash: RegExpMatchArray | null = location.match(/sha256-(.*)\?/);

    if (hash && multiaddr) {
      axios
        .post(
          PROGRAMS,
          {
            hash: '0x8a682cce5175358b3cd53f3a8a084365bc9ed0c3474cc3d047008db65541c0f0',
            storageType: 'DOCKER',
            location: 'docker.io/iexechub/iexec-face-swap:1.0.0',
            executionJob,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log('program result', response, response.data);
          if (!isNaN(response.data)) {
            history.push(`/executions/${executionJob}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const trySubmit = () => {
    setLinkError(false);

    let multiaddr: RegExpMatchArray | null | string = location.match(/\/layers\/(\w*)\/([\w-]*)\/([.\d]*)/);
    if (multiaddr) {
      multiaddr = 'docker.io/' + multiaddr[1] + '/' + multiaddr[2] + ':' + multiaddr[3];
    }
    const hash: RegExpMatchArray | null = location.match(/sha256-([^?=]*)/);

    console.log('hash', hash, multiaddr, location);

    if (hash && multiaddr) {
      setLoading(true);
      
      console.log(hash, multiaddr, location);
      const executionJob = {
        description,
        gig: gigId,
        executionType,
        dataset: choosenDataset !== '' ? datasets?.filter((elem) => elem.title === choosenDataset)[0].id : null,
        inputParameters: inputParams,
        programDTOList: [
          {
            hash: '0x' + hash[1],
            storageType: 'DOCKER',
            location: multiaddr,
          },
        ],
      };

      console.log('exec job', executionJob);

      axios
        .post(EXECUTION_JOBS, executionJob, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('execution job response', response, response.data);
          if (!isNaN(response.data)) {
            history.push(`/executions/${response.data}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLinkError(true);
    }
  };

  const addInputParamHandler = (e: any) => {
    if (inputParamRef.current) {
      const inputParam = inputParamRef.current.value;
      setInputParams((prevState: any) => {
        return [...prevState, inputParam];
      });

      inputParamRef.current.value = '';
    }
  };

  const removeInputParamHandler = (inputParamToRemove: string) => {
    const updatedInputParams = inputParams.filter((elem) => elem !== inputParamToRemove);
    setInputParams(updatedInputParams);
  };

  return (
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
              <h1 className="display-3 text-white">New Execution for Gig #{gigId}</h1>
            </Col>
          </Row>
        </Container>
      </div>

      {loading ? (
        <Container className={`align-items-center`} fluid>
          <Row>
            <Col lg="12" md="12">
              <div className="notification-container mt-3">
                <ProgressIndicator message="Starting Execution..." />
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="mt--6" fluid>
          <div>
            <Row className="gigDetailContainer">
              <Col xs="12" sm="12" md="12" lg="12" className="flex-column">
                <Card className="app-default-card" body>
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">Start New Execution</h3>
                        {linkError && <p className="invalid-feedback d-block">Please check your DockerHub link</p>}
                      </Col>
                      <Col className="text-right gig-action-button" xs="4">
                        <Button className="btn btn-success btn-sm" onClick={trySubmit}>
                          Start
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>

                  <CardBody>
                    <InputSection title="Execution Details">
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <Label>Dataset</Label>
                            <Input
                              type="select"
                              name="dataset"
                              value={choosenDataset}
                              onChange={(e) => {
                                setChoosenDataset(e.target.value);
                              }}
                            >
                              <option value="No dataset">No dataset</option>
                              {datasets?.map((elem, index) => {
                                return <option key={index}>{elem.title}</option>;
                              })}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label>Execution Type</Label>
                            <Input
                              type="select"
                              value={executionType}
                              onChange={(e) => {
                                setExecutionType(e.target.value as ExecutionType);
                              }}
                            >
                              <option value="CLOUD">CLOUD</option>
                              <option value="TEE" disabled>
                                TEE
                              </option>
                              <option value="ON_PREMISES" disabled>
                                ON_PREMISES
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </InputSection>
                    <InputSection>
                      <Row>
                        <Col md={12}>
                          <Row>
                            <Col md={8}>
                              <FormGroup className="add-remove-block">
                                <Input
                                  type="text"
                                  name="inputParameters"
                                  innerRef={inputParamRef}
                                  placeholder="Input parameters"
                                />
                                <Button className="btn-sm btn-dark" onClick={addInputParamHandler}>
                                  &nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;
                                </Button>
                              </FormGroup>
                            </Col>
                          </Row>
                          <ul className="add-remove-results form-group">
                            {console.log(inputParams)}
                            {inputParams &&
                              inputParams.map((elem, index) => (
                                <li key={index}>
                                  <span>{elem}</span>
                                  <a className="remove" onClick={() => removeInputParamHandler(elem)}>
                                    remove
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </Col>
                      </Row>
                    </InputSection>

                    <InputSection title="Description">
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label>Describe your execution</Label>
                            <ReactQuill
                              value={description}
                              onChange={(value) => {
                                setDescription(value);
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </InputSection>

                    <InputSection title="Program DockerHub">
                      <Row>
                        <Col md={8}>
                          <FormGroup>
                            <Input
                              type="text"
                              name="location"
                              invalid={linkError}
                              value={location}
                              onChange={(e) => {
                                setLocation(e.target.value);
                                setLinkError(false);
                              }}
                              placeholder="DockerHub URL"
                            />
                            <FormFeedback>Provide a full docker hub link to the specific version of your image</FormFeedback>
                          </FormGroup>
                        </Col>
                      </Row>
                    </InputSection>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default ExecutionCreate;
