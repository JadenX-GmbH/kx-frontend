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
  Badge,
} from "reactstrap";
import { useDetectClickOutside } from "react-detect-click-outside";

import InputSection from "../../../components/Utility/Form/InputSection";
import Background from "./pexels-christina-morillo-1181675.jpeg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// core components

const Gigs = () => {
  const [skillOptions, setSkillOptions] = useState<string[]>([
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
  const [skillKey, setSkillKey] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
        <span className="mask bg-gradient-green opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="12" md="12">
              <h1 className="display-3 text-white">New Gig</h1>
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
                      <h3 className="mb-0">Create a new Gig</h3>
                    </Col>
                    <Col className="text-right gig-action-button" xs="4">
                      <Button
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => e.preventDefault()}
                      >
                        Create
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <InputSection>
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Title</Label>
                          <Input
                              type="text"
                              name="title"
                              placeholder="Gig's title"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </InputSection>
                  <InputSection title="Business Information">
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Max Price</Label>
                          <Input
                            type="text"
                            name="email"
                            placeholder="Your email"
                          />
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

                  <InputSection title="Description">
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label>
                            Describe your project to a data scientists
                          </Label>
                          <ReactQuill
                            value={description}
                            onChange={(value) => setDescription(value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </InputSection>

                  <InputSection title="Execution">
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Execution Mode</Label>
                          <Input type="select" name="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Worker Pool</Label>
                          <Input type="select" name="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </InputSection>

                  <InputSection title="Service Level Agreements (SLAs)">
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label>Add SLAs to your Gig</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row form>
                      <Col md={3}>
                        <FormGroup>
                          <Input
                            type="text"
                            name="city"
                            placeholder="subject"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={3}>
                        <FormGroup>
                          <Input
                            type="text"
                            name="state"
                            placeholder="restriction"
                          />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup
                          className="gig-action-button"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            minHeight: "42px",
                          }}
                        >
                          <Button className="btn btn-sm">
                            &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                          </Button>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <FormGroup
                          className="gig-action-button"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            minHeight: "42px",
                          }}
                        >
                          <Button className="btn btn-sm">
                            &nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;
                          </Button>
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

export default Gigs;
