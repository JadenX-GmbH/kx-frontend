import React, { useState, useMemo } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
  CardImg,
  Badge,
  CustomInput,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import InputSection from "../../../components/Utility/Form/InputSection";
import backImage from "../Gigs/pexels-photomix-company-95916.jpg";
import Background from "../Gigs/pexels-christina-morillo-1181675.jpeg";

// core components

const Profile = () => {
  let history = useHistory();

  const [skillOptions, setSkillOptions] = useState([
    "Skill 1",
    "Skill 2",
    "Skill 3",
    "Skill 4",
    "Skill 5",
    "Skill 6",
    "Skill 7",
  ]);

  const [showSkills, setShowSkills] = useState<boolean>(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillKey, setSkillKey] = useState("");
  const [description, setDescription] = useState("");

  const ref = useDetectClickOutside({
    onTriggered: () => setShowSkills(false),
  });

  const filteredSkills = useMemo(() => {
    if (skillKey.trim() !== "")
      return skillOptions.filter(
        (item) => item.toLowerCase().indexOf(skillKey.toLowerCase()) !== -1
      );

    return skillOptions;
  }, [skillKey]);

  const removeSkill = (index: number) => {
    let newArray = [...selectedSkills];
    newArray.splice(index, 1);
    setSelectedSkills(newArray);
  };

  console.log(description);

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
              <h1 className="display-2 text-white">Hello Jesse</h1>
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
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Edit Profile</h3>
                  </Col>
                  <Col className="text-right gig-action-button" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <InputSection title="User information">
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Username</Label>
                        <Input type="text" placeholder="username" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Email Address</Label>
                        <Input type="email" placeholder="jesse@example.com" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>First name</Label>
                        <Input type="text" placeholder="First name" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Last name</Label>
                        <Input type="email" placeholder="Last name" />
                      </FormGroup>
                    </Col>
                  </Row>
                </InputSection>

                <InputSection title="Required Skills">
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <Label>
                          Search here for your required skills and add them to
                          the list
                        </Label>

                        <div ref={ref}>
                          <Input
                            value={skillKey}
                            onChange={(event) => {
                              setSkillKey(event.target.value);
                            }}
                            onFocus={() => {
                              setShowSkills(true);
                            }}
                            type="text"
                            placeholder="e.g time series analysis"
                          />
                          {showSkills ? (
                            <div className="skillDropDownContainer">
                              <div className="skillDropDown">
                                {filteredSkills.map((item) => (
                                  <div
                                    className={
                                      selectedSkills.indexOf(item) !== -1
                                        ? "selected"
                                        : ""
                                    }
                                    onClick={() => {
                                      const newValues = [
                                        ...selectedSkills,
                                        item,
                                      ];
                                      setSelectedSkills(
                                        Array.from(new Set(newValues))
                                      );
                                      setShowSkills(false);
                                      setSkillKey("");
                                    }}
                                    key={`qqa-${item}`}
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : null}
                        </div>
                        <div className="selectedSkillContainer">
                          {selectedSkills.map((item, keyIndex) => (
                            <div key={`ssa-${item}`}>
                              <Badge color="dark">
                                {item}
                                <span
                                  className="skill-remove-icon"
                                  onClick={() => removeSkill(keyIndex)}
                                >
                                  <i className="ni ni-fat-remove"></i>
                                </span>
                              </Badge>
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
                        <ReactQuill
                          placeholder="I am the CEO of a SME in belgium with 13 employees"
                          value={description}
                          onChange={(value) => setDescription(value)}
                        />
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
                        <Input type="text" placeholder="username" />
                      </FormGroup>
                    </Col>
                    <Col md={5}>
                      <FormGroup>
                        <Label>Number</Label>
                        <Input type="email" placeholder="jesse@example.com" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label>City</Label>
                        <Input type="text" placeholder="city" />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Country</Label>
                        <Input type="text" placeholder="country" />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label>Postal code</Label>
                        <Input type="text" placeholder="Postal code" />
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
                        <CustomInput
                          id="file_1"
                          type="file"
                          name="customFile"
                          label="Select Profile Picture"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Background Picture</Label>
                        <CustomInput
                          id="file_2"
                          type="file"
                          name="customFile"
                          label="Select Background Picture"
                        />
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
