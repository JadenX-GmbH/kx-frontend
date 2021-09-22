import React, { useState } from "react";
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

import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

import { OFFERS } from "../../../util/api";
import { Store } from "../../../util/types";
import InputSection from "../../../components/Utility/Form/InputSection";
import Background from "./pexels-christina-morillo-1181675.jpeg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// core components

const OfferCreate = () => {
  let history = useHistory();
  const token = useSelector((state: Store) => state.token);
  const user = useSelector((state: Store) => state.user);
  let { gigId } = useParams<{ gigId: string }>();
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<{
    price: boolean;
    description: boolean;
  }>({
    price: false,
    description: false,
  });

  const onSubmitHandler = (event: any) => {
    event.preventDefault();

    let errorFree = true;

    if (price.length === 0) {
      setErrors((values) => {
        return { ...values, price: true };
      });
      errorFree = false;
    }

    if (description.length === 0) {
      setErrors((values) => {
        return { ...values, description: true };
      });
      errorFree = false;
    }

    if (errorFree && user) {
      const offer = {
        price,
        priceToken: 0.0,
        description,
        gig: gigId,
        specialist: user.id,
      };

      if (token.length) {
        axios
          .post(OFFERS, offer, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("gig create response", response.data);
            if (!isNaN(response.data)) {
              history.push(`/gigs/${gigId}/offers/${response.data}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
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
              <h1 className="display-3 text-white">
                New Offer for Gig #{gigId}
              </h1>
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
                        onClick={onSubmitHandler}
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
                            className={errors.price ? "input-error" : ""}
                            value={price}
                            onChange={(e) => {
                              setPrice(e.target.value);
                              setErrors((values) => {
                                return { ...values, price: false };
                              });
                            }}
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
                            className={errors.description ? "input-error" : ""}
                            value={description}
                            onChange={(value) => {
                              setDescription(value);
                              setErrors((values) => {
                                return { ...values, description: false };
                              });
                            }}
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
