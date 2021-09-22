import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Store, DataSet } from '../../../util/types';
import { EXPLORATION, EXPLORATION_JOBS, EXPLORATION_RESULTS } from '../../../util/api';

import { Container, Row, Col, Card, CardBody, CardHeader, Button, FormGroup, Label, Input } from 'reactstrap';

import InputSection from '../../../components/Utility/Form/InputSection';
import Background from '../Gigs/pexels-christina-morillo-1181675.jpeg';

import ReactQuill from 'react-quill';
import { useDropzone } from 'react-dropzone';

const IPFS = require('ipfs-core');
const zip = require('jszip')();

// core components

const ExplorationCreate = () => {
  const history = useHistory();
  const token = useSelector((state: Store) => state.token);
  const { gigId } = useParams<{ gigId: string }>();
  const [description, setDescription] = useState('');
  const [datasets, setDatasets] = useState<DataSet[]>();
  const [choosenDataset, setChoosenDataset] = useState('');
  const [files, setFiles] = useState<{}[]>([]);
  const [filesFull, setFilesFull] = useState<File[]>([]);
  const [hash, setHash] = useState('');

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prevState) => {
        let fileInfo: string[] = acceptedFiles.map((file: any) => `${file.path} - ${file.size} bytes`);
        return [...prevState, fileInfo];
      });
      setFilesFull((prevState: any) => {
        let fileInfo: File[] = acceptedFiles.map((file: File) => file);
        return [...prevState, fileInfo];
      });
    },
  });

  const fileRow = acceptedFiles.map((file: any) => (
    <div key={file.path}>
      {file.path} - {file.size} bytes
    </div>
  ));

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
          console.log('datasets', response, response.data.data);
          if (response.data.data) {
            const obsDatasets = response.data.data.filter((dataset: DataSet) => dataset.type === 'OBFUSCATED');
            setDatasets(obsDatasets);
            setChoosenDataset(obsDatasets[0].title);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [token]);

  const updateExplorationResults = (explorationResult: {location: string, storateType:string, explorationJob: number}) => {
    axios
      .post(EXPLORATION_RESULTS, explorationResult, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('exploration result', response, response.data);

        if (!isNaN(response.data)) {
          history.push(`/executions/explorations/${explorationResult.explorationJob}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const trySubmit = () => {
    filesFull.map((file: any, index) => {
      zip.file(file[0].name, file);
      console.log(filesFull[index].name, file, file[0].name);
    });

    zip.generateAsync({ type: 'blob' }).then((content: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        let ipfs = await IPFS.create();
        const addedFile = await ipfs.add(reader.result);
        console.log(addedFile.cid.toString());
        setHash(addedFile.cid.toString());
      };

      reader.readAsArrayBuffer(content);
    });
  };

  useEffect(() => {
    if (hash) {
      const explorationJob = {
        description,
        gig: gigId,
        dataset: datasets?.filter((elem) => elem.title === choosenDataset)[0].id,
        explorationResultDTO: {
          location: hash,
          storateType: 'IPFS',
        }
      };

      console.log(explorationJob);
      axios
        .post(EXPLORATION_JOBS, explorationJob, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log('gig create response', response, response.data);
          console.log('hash', hash);

          updateExplorationResults({
            location: hash,
            storateType: 'IPFS',
            explorationJob: response.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [hash]);

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
              <h1 className="display-3 text-white">New Exploration for Gig #{gigId}</h1>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt--6" fluid>
        <div>
          <Row className="gigDetailContainer">
            <Col xs="12" sm="12" md="12" lg="12" className="flex-column">
              <Card className="app-default-card" body>
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Start New Exploration</h3>
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
                      <Col md={6}>
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
                            {datasets?.map((elem, index) => {
                              return <option key={index}>{elem.title}</option>;
                            })}
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </InputSection>

                  <InputSection title="Description">
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label>Describe your exploration</Label>
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

                  <InputSection title="Results">
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label>Attach Results</Label>
                          <div className="file-upload-box">
                            <section className="container">
                              <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                              </div>
                            </section>
                          </div>
                          {files.length > 0 && (
                            <ul className="mt-3">
                              {files.map((elem, index) => {
                                return <li key={index}>{elem}</li>;
                              })}
                            </ul>
                          )}
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
    </>
  );
};

export default ExplorationCreate;
