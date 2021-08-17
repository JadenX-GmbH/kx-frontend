import React, { useState, useMemo } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  CardImg,
  Badge,
} from "reactstrap";
import { useHistory } from "react-router-dom";
// import { useDetectClickOutside } from "react-detect-click-outside";

import InputSection from "../../../components/Utility/Form/InputSection";
import backImage from "../Gigs/pexels-photomix-company-95916.jpg";
import Background from "../Gigs/pexels-christina-morillo-1181675.jpeg";

// core components

const Profile = () => {
  let history = useHistory();

  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Skill 1",
    "Skill 2",
    "Skill 3",
  ]);

  const [description, setDescription] = useState<string>(
    "<p>Hi i am jessica<strong> . owner of <em>EROWZ</em></strong></p>"
  );

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
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="12" md="12">
              <h1 className="display-2 text-white">Jessica Brown</h1>

              <Button
                color="info"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/admin/profile/profileId/edit`);
                }}
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <div className="full-width app-info-section">
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={backImage}
                  alt="Card image cap"
                />
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/admin/profile/profileId`);
                        }}
                      >
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={
                            require("../../../assets/img/theme/team-4-800x800.jpg")
                              .default
                          }
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-2">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Previous Job</span>
                        </div>
                        <div>
                          <span className="heading">10 / 10</span>
                          <span className="description">Reputation</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h4>Dr. Oliver Biege</h4>
                    <div className="h5 font-weight-300">Bucharest, Romania</div>
                    <div className="h5 mt-4">For Gig #132434</div>
                    <div className="h5 font-weight-300">
                      Your Selected Data Scientist
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardBody>
                <InputSection title="User information">
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Username</Label>
                        <div className="profile-info-unit">jesse_1</div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Email Address</Label>
                        <div className="profile-info-unit">
                          jesse@example.com
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>First name</Label>
                        <div className="profile-info-unit">jesse</div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Last name</Label>
                        <div className="profile-info-unit">brown</div>
                      </FormGroup>
                    </Col>
                  </Row>
                </InputSection>

                <InputSection title="My Skills">
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <div className="selectedSkillContainer">
                          {selectedSkills.map((item, keyIndex) => (
                            <div key={`ssa-${item}`}>
                              <Badge color="dark">{item}</Badge>
                            </div>
                          ))}
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </InputSection>

                <InputSection title="About me">
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label>Description</Label>
                        <div
                          className="profile-info-unit"
                          dangerouslySetInnerHTML={{
                            __html: description,
                          }}
                        ></div>
                      </FormGroup>
                    </Col>
                  </Row>
                </InputSection>

                <hr className="my-4" />

                <InputSection title="Contact information">
                  <Row>
                    <Col md={5}>
                      <FormGroup>
                        <Label>Street</Label>
                        <div className="profile-info-unit">street name</div>
                      </FormGroup>
                    </Col>
                    <Col md={5}>
                      <FormGroup>
                        <Label>Number</Label>
                        <div className="profile-info-unit">street number</div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label>City</Label>
                        <div className="profile-info-unit">city name</div>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Country</Label>
                        <div className="profile-info-unit">country name</div>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Postal code</Label>
                        <div className="profile-info-unit">code</div>
                      </FormGroup>
                    </Col>
                  </Row>
                </InputSection>

                <hr className="my-4" />
                {/* Description */}
                <InputSection title="Pictures">
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Profile Picture</Label>
                        <div className="profile-info-unit">Pic 1</div>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Background Picture</Label>
                        <div className="profile-info-unit">Pic 2</div>
                      </FormGroup>
                    </Col>
                  </Row>
                </InputSection>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
