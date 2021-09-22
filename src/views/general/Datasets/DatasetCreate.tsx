import React, { useState, useCallback } from "react";
import { Container, Row, Col, Card, CardBody, CardHeader, Button, FormGroup, Label, Input } from "reactstrap";

import InputSection from "../../../components/Utility/Form/InputSection";
import Background from "../Gigs/pexels-christina-morillo-1181675.jpeg";
import axios from "axios";
import { useSelector } from "react-redux";
import { Store } from "../../../util/types";
import { DATASETS } from "../../../util/api";
import { useHistory } from "react-router-dom";
import { useDropzone } from "react-dropzone";

const IPFS = require("ipfs-core");

// core components

const OfferCreate = () => {
  let history = useHistory();
  const token = useSelector((state: Store) => state.token);
  const user = useSelector((state: Store) => state.user);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [hash, setHash] = useState("");
  const [storageType, setStorageType] = useState("IPFS");
  // const [storageType, setStorage] = useState("IPFS");
  const [type, setType] = useState<string>("RAW");
  const [errors, setErrors] = useState<{
    title: boolean;
    description: boolean;
    file: boolean;
  }>({
    title: false,
    description: false,
    file: false,
  });

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        let ipfs = await IPFS.create();
        const addedFile = await ipfs.add(reader.result);
        console.log(addedFile.cid.toString());
        // const sha256Sum = async (fileBytes = throwIfMissing()) => {
        //   const fileBuffer = await fileBufferSchema().validate(fileBytes);
        //   return sha256(fileBuffer);
        // };
        setHash(addedFile.cid.toString());
        setErrors((values) => {
          return { ...values, file: false };
        });
      };

      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  });

  const fileRow = acceptedFiles.map((file: any) => (
    <div key={file.path}>
      {file.path} - {file.size} bytes
    </div>
  ));

  const trySubmit = () => {
    let errorFree = true;

    if (title.length === 0) {
      setErrors((values) => {
        return { ...values, title: true };
      });
      errorFree = false;
    }

    if (description.length === 0) {
      setErrors((values) => {
        return { ...values, description: true };
      });
      errorFree = false;
    }

    if (hash.length === 0) {
      setErrors((values) => {
        return { ...values, file: true };
      });
      errorFree = false;
    }

    if (errorFree) {
      let data = {
        title,
        description,
        hash,
        type,
        location: 'https://ipfs.io/ipfs/' + hash,
        storageType,
        dataOwner: user?.id,
      };
      console.log(data);

      if (token.length) {
        axios
          .post(DATASETS, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("gig create response", response);
            if (!isNaN(response.data)) {
              history.push(`/data-sets`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        console.log('data sent', data);
      }
    }
  };

  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "320px",
          backgroundImage: "url(" + Background + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* mask bg-gradient-default opacity-8 */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="12" md="12">
              <h1 className="display-3 text-white">New Data Set</h1>
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
                      <h3 className="mb-0">Upload new data set</h3>
                    </Col>
                    <Col className="text-right gig-action-button" xs="4">
                      <Button className="btn btn-success btn-sm" onClick={trySubmit}>
                        Upload
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <InputSection title="General Info">
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Title</Label>
                          <Input
                            value={title}
                            className={errors.title ? "input-error" : ""}
                            type="text"
                            onChange={(e) => {
                              setTitle(e.target.value);
                              setErrors((values) => {
                                return { ...values, title: false };
                              });
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Description</Label>
                          <Input
                            type="text"
                            className={errors.description ? "input-error" : ""}
                            value={description}
                            onChange={(e) => {
                              setDescription(e.target.value);
                              setErrors((values) => {
                                return { ...values, description: false };
                              });
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </InputSection>
                  <InputSection title="Upload Location">
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Location</Label>
                          <Input
                            type="select"
                            value={storageType}
                            onChange={(e) => {
                              setStorageType(e.target.value);
                            }}
                          >
                            <option value="IPFS">IPFS</option>
                            <option value="Dropbox">Dropbox</option>
                            <option value="AWS">AWS</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label>Type</Label>
                          <Input
                            type="select"
                            value={type}
                            onChange={(e) => {
                              setType(e.target.value);
                            }}
                          >
                            <option value="RAW">RAW</option>
                            <option value="OBFUSCATED">OBFUSCATED</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </InputSection>

                  <InputSection title="">
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <div className={`file-upload-box ${errors.file ? "input-error" : ""}`}>
                            <section className="container">
                              <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                {fileRow.length > 0 ? <div>{fileRow}</div> : <p>Drag 'n' drop some files here, or click to select files</p>}
                              </div>
                            </section>
                          </div>
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

export default OfferCreate;
