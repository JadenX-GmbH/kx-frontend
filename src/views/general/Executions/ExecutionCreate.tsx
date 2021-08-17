import React, { useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import InputSection from "../../../components/Utility/Form/InputSection";
import Background from "../Gigs/pexels-christina-morillo-1181675.jpeg";

// core components

const ExecutionCreate = () => {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

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
              <h1 className="display-3 text-white">New Execution</h1>
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
                      <h3 className="mb-0">Start New Execution</h3>
                    </Col>
                    <Col className="text-right gig-action-button" xs="4">
                      <Button
                        className="btn btn-success btn-sm"
                        onClick={(e) => e.preventDefault()}
                      >
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
                          <Input type="select" name="select">
                            <option>file1.csv</option>
                            <option>file2.csv</option>
                            <option>file3.csv</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </InputSection>

                  <InputSection title="Code">
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <div className="file-upload-box">
                            <div>Drop files here to upload</div>
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

export default ExecutionCreate;
