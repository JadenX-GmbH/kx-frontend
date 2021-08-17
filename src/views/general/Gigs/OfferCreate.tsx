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
import Background from "./pexels-christina-morillo-1181675.jpeg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// core components

const OfferCreate = () => {
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
              <h1 className="display-3 text-white">New Offer for Gig #12343</h1>
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
                      <h3 className="mb-0">Make a new Offer</h3>
                    </Col>
                    <Col className="text-right gig-action-button" xs="4">
                      <Button
                        className="btn btn-success btn-sm"
                        onClick={(e) => e.preventDefault()}
                      >
                        Offer
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <InputSection title="Business Information">
                    <Row>
                      <Col md={5}>
                        <FormGroup>
                          <Label>Price</Label>
                          <Input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="27930 &euro;"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </InputSection>

                  <InputSection title="Description">
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label>
                            Describe your project to a data scientists
                          </Label>
                          {/* <Input
                            type="textarea"
                            name="email"
                            placeholder="Here goes your description"
                          /> */}
                          <ReactQuill
                            value={description}
                            onChange={(value) => setDescription(value)}
                          />
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
