import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader, Button, FormGroup, Label, Input, Badge } from 'reactstrap';
import { useDetectClickOutside } from 'react-detect-click-outside';

import InputSection from '../../../components/Utility/Form/InputSection';
import Background from './pexels-christina-morillo-1181675.jpeg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Store, Skill, Skills, SkillSet, Sla, ExecutionType } from '../../../util/types';
import { CREATE_GIG, SKILLS, SKILLSETS } from '../../../util/api';
import { useHistory } from 'react-router-dom';
const faker = require('faker');

// core components

const Gigs = () => {
  let history = useHistory();
  const token = useSelector((state: Store) => state.token);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [skillOptionsFull, setSkillOptionsFull] = useState([]);
  const [showSkills, setShowSkills] = useState<boolean>(false);
  const [skillKey, setSkillKey] = useState('');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');
  const [slas, setSlas] = useState<Sla[]>([]);
  const [executionType, setExecutionType] = useState<ExecutionType>('CLOUD');
  const [errors, setErrors] = useState<{
    title: boolean;
    description: boolean;
    maxPrice: boolean;
  }>({
    title: false,
    description: false,
    maxPrice: false,
  });

  const subjectRef = useRef<HTMLInputElement>(null);
  const restrictionRef = useRef<HTMLInputElement>(null);

  const ref = useDetectClickOutside({
    onTriggered: () => setShowSkills(false),
  });

  useEffect(() => {
    axios
      .get(SKILLS, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const skillNames = response.data.map((elem: Skills) => {
          return elem['name'];
        });
        setSkillOptions(skillNames);
        setSkillOptionsFull(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (token.length) {
      // axios
      //   .post(CREATE_GIG, data, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      //   .then((response) => {
      //     console.log("gig create response", response.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
  }, []);

  // const filteredSkills = useMemo(() => {
  //   if (skillKey.trim() !== "")
  //     return skillOptions.filter(
  //       (item) => item.toLowerCase().indexOf(skillKey.toLowerCase()) !== -1
  //     );

  //   return skillOptions;
  // }, [skillKey]);

  const filteredSkills = useMemo(() => {
    if (skillKey.trim() !== '') {
      return skillOptions.filter((item: string) => item.toLowerCase().indexOf(skillKey.toLowerCase()) !== -1);
    }

    return skillOptions;
  }, [skillKey, skillOptions]);

  const removeSkill = (index: number) => {
    let newArray = [...selectedSkills];
    newArray.splice(index, 1);
    setSelectedSkills(newArray);
  };

  const addSlaHandler = (e: any) => {
    if (subjectRef.current && restrictionRef.current) {
      const inputValue = {
        subject: subjectRef.current.value,
        restriction: restrictionRef.current.value,
      };
      console.log(e, e.target.previousElementSibling, inputValue);
      setSlas((prevState: any) => {
        return [...prevState, inputValue];
      });

      subjectRef.current.value = '';
      restrictionRef.current.value = '';
    }
  };

  const removeSlaHandler = (slaToRemove: Sla) => {
    const updatedSlas = slas.filter(
      (elem) => elem.subject !== slaToRemove.subject && elem.restriction !== slaToRemove.restriction
    );
    setSlas(updatedSlas);
  };

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

    if (Number(maxPrice) < 10) {
      setErrors((values) => {
        return { ...values, maxPrice: true };
      });
      errorFree = false;
    }

    if (errorFree) {
      const updatedSkills: { skillsetId: string }[] = [];
      selectedSkills.map((skill: Skill) => {
        skillOptionsFull.map((elem: Skills) => {
          if (skill === elem.name) {
            const skillID = elem.id.toString();
            updatedSkills.push({
              skillsetId: skillID,
            });
          }
        });
      });

      let data = {
        title,
        description,
        maxPrice: Number(maxPrice),
        executionType,
        status: 'IN_PROGRESS',
        skillsetDTOList: updatedSkills,
        slaStatementDTOList: slas,
      };
      console.log('data', data);

      if (token.length) {
        axios
          .post(CREATE_GIG, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response);
            console.log('gig create response', response.data);
            if (!isNaN(response.data)) {
              history.push(`/gigs/${response.data}`);
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
          minHeight: '320px',
          backgroundImage: 'url(' + Background + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
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
                        onClick={(e) => {
                          e.preventDefault();
                          trySubmit();
                        }}
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
                            className={errors.title ? 'input-error' : ''}
                            type="text"
                            value={title}
                            onChange={(e) => {
                              setTitle(e.target.value);
                              setErrors((values) => {
                                return { ...values, title: false };
                              });
                            }}
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
                            type="number"
                            className={errors.maxPrice ? 'input-error' : ''}
                            value={maxPrice}
                            onChange={(e) => {
                              setMaxPrice(e.target.value);
                              setErrors((values) => {
                                return { ...values, maxPrice: false };
                              });
                            }}
                            placeholder="Max price"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </InputSection>

                  <InputSection title="Required Skills">
                    <Row>
                      <Col md={12}>
                        <FormGroup>
                          <Label>Search here for your required skills and add them to the list</Label>

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
                                      className={selectedSkills.indexOf(item) !== -1 ? 'selected' : ''}
                                      onClick={() => {
                                        const newValues = [...selectedSkills, item];
                                        setSelectedSkills(Array.from(new Set(newValues)));
                                        setShowSkills(false);
                                        setSkillKey('');
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
                                  <span className="skill-remove-icon" onClick={() => removeSkill(keyIndex)}>
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
                          <Label>Describe your project to a data scientists</Label>
                          <ReactQuill
                            className={errors.description ? 'input-error' : ''}
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

                  <InputSection title="Execution">
                    <Row>
                      <Col md={4}>
                        <FormGroup>
                          <Label>Execution Mode</Label>
                          <Input
                            type="select"
                            value={executionType}
                            onChange={(e) => {
                              setExecutionType(e.target.value as ExecutionType);
                            }}
                          >
                            <option value="CLOUD">CLOUD</option>
                            <option value="TEE">TEE</option>
                            <option value="ON_PREMISES">ON_PREMISES</option>
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
                    <Row>
                      <Col md={12}>
                        <Row>
                          <Col md={8}>
                            <FormGroup className="add-remove-block">
                              <Input type="text" name="subject" innerRef={subjectRef} placeholder="Subject" />
                              <Input
                                type="text"
                                name="restriction"
                                innerRef={restrictionRef}
                                placeholder="Restriction"
                              />
                              <Button className="btn-sm btn-dark" onClick={addSlaHandler}>
                                &nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                        <ul className="add-remove-results">
                          {slas &&
                            slas.map((sla, index) => (
                              <li key={index}>
                                <b>Subject: </b>
                                <span>{sla.subject}</span>
                                <br />
                                <b>Restiction: </b> <span>{sla.restriction}</span>
                                <br />
                                <a className="remove ml-0" onClick={() => removeSlaHandler(sla)}>
                                  remove
                                </a>
                              </li>
                            ))}
                        </ul>
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
