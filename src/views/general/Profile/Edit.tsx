import React, { useState, useRef, useEffect, useMemo } from "react";

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
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import InputSection from "../../../components/Utility/Form/InputSection";
import backImage from "../Gigs/pexels-photomix-company-95916.jpg";
import Background from "../Gigs/pexels-christina-morillo-1181675.jpeg";
import { useSelector } from "react-redux";
import { Store, User, AddressInfo, GigType } from "../../../util/types";
import { SKILLS } from "../../../util/api";

// core components

const Profile = () => {
  let history = useHistory();
  const user = useSelector((state: Store) => state.user);
  const token = useSelector((state: Store) => state.token);

  interface userImages {
    userPhoto: string;
    backgroundPhoto: string;
  }

  const [emailVal, setEmailVal] = useState("");
  const [firstNameVal, setFirstNameVal] = useState("");
  const [lastNameVal, setLastNameVal] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");
  const [addressVal, setAddressVal] = useState<AddressInfo[]>([]);
  const [imagesVal, setImagesVal] = useState<userImages>({
    userPhoto: "",
    backgroundPhoto: "",
  });
  // const [skillOptions, setSkillOptions] = useState([]);

  // const [showSkills, setShowSkills] = useState<boolean>(false);
  // const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // const [skillKey, setSkillKey] = useState("");
  // const [description, setDescription] = useState("");

  // const filteredSkills = (data: any) => {
  //   console.log(data);
  //   if (skillKey.trim() !== "")
  //     return data.filter(
  //       (item: any) => item.toLowerCase().indexOf(skillKey.toLowerCase()) !== -1
  //     );
  //   return skillOptions;
  // };

  useEffect(() => {
    if (user) {
      setEmailVal(user.email);
      setFirstNameVal(user.firstName);
      setLastNameVal(user.lastName);
      setAddressVal(user.addresses);
      setDescriptionVal(user.tagLine);
      setImagesVal({
        userPhoto: user.userPhoto,
        backgroundPhoto: user.backgroundPhoto,
      });
    }

    // axios
    //   .get(SKILLS, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     const filteredData = filteredSkills(response.data);
    //     console.log(filteredData);
    //     setSkillOptions(response.data);

    //     console.log(filteredSkills);
    //   })
    //   .catch((err) => {});
  }, [user]);

  const userImagesHandler = (event: any, photoField: string) => {
    setImagesVal((prevState: userImages): userImages => {
      return { ...prevState, [photoField]: event.target.value };
    });
  };

  const userAddressHandler = (
    event: any,
    inputField: string,
    index: number
  ) => {
    setAddressVal((prevState: AddressInfo[]): AddressInfo[] => {
      const currentArr = [...prevState];
      console.log(currentArr);
      currentArr[index] = {
        ...currentArr[index],
        [inputField]: event.target.value,
      };
      return currentArr;
    });
  };

  const onSubmitUpdates = (event: any) => {
    event.preventDefault();
  };

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

  return (
    <>
      {user && (
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
                  <h1 className="display-2 text-white">
                    Hello {user.firstName}
                  </h1>
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
                      height="230"
                      src={user.backgroundPhoto}
                      alt="Card image cap"
                    />
                    <Row className="justify-content-center">
                      <Col className="order-lg-2" lg="3">
                        <div className="card-profile-image">
                          <a
                            href="#pablo"
                            onClick={(e) => {
                              e.preventDefault();
                              history.push(`/profile/${user.id}`);
                            }}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              width="130"
                              height="130"
                              src={user.userPhoto}
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
                              <span className="heading">
                                {user.userGigs?.length}
                              </span>
                              <span className="description">Previous Job</span>
                            </div>
                            {/*<div>*/}
                            {/*  <span className="heading">10 / 10</span>*/}
                            {/*  <span className="description">Reputation</span>*/}
                            {/*</div>*/}
                          </div>
                        </div>
                      </Row>
                      <div className="text-center">
                        <h4>
                          {user.firstName} {user.lastName}
                        </h4>
                        <div className="h5 font-weight-300">
                          {user.addresses[0].city}, {user.addresses[0].country}
                        </div>
                        {/*<div className="h5 mt-4">For Gig #</div>*/}
                        {/*<div className="h5 font-weight-300">*/}
                        {/*  {user.tagLine}*/}
                        {/*</div>*/}
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
                          onClick={onSubmitUpdates}
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
                            <Label>Email Address</Label>
                            <Input
                              type="email"
                              placeholder="jesse@example.com"
                              value={emailVal}
                              onChange={(e) => setEmailVal(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label>First name</Label>
                            <Input
                              type="text"
                              placeholder="First name"
                              value={firstNameVal}
                              onChange={(e) => setFirstNameVal(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Last name</Label>
                            <Input
                              type="email"
                              placeholder="Last name"
                              value={lastNameVal}
                              onChange={(e) => setLastNameVal(e.target.value)}
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
                              Search here for your required skills and add them
                              to the list
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
                              value={descriptionVal}
                              onChange={(value) => setDescriptionVal(value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </InputSection>

                    <hr className="my-4" />

                    <InputSection title="Contact information">
                      {addressVal.map((addressInfo, index) => {
                        return (
                          <InputSection
                            key={`ssa-${index}`}
                            {...(user.addresses.length > 1
                              ? { title: `Address ${index + 1}` }
                              : {})}
                          >
                            <Row>
                              <Col md={5}>
                                <FormGroup>
                                  <Label>Street</Label>
                                  <Input
                                    type="text"
                                    placeholder="Street"
                                    value={addressInfo.address.replace(
                                      /[0-9]/g,
                                      ""
                                    )}
                                    onChange={(e) =>
                                      userAddressHandler(e, "address", index)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={5}>
                                <FormGroup>
                                  <Label>Number</Label>
                                  <Input
                                    type="text"
                                    placeholder="Street number"
                                    value={addressInfo.address.replace(
                                      /^\D+/g,
                                      ""
                                    )}
                                    onChange={(e) =>
                                      userAddressHandler(e, "address", index)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4}>
                                <FormGroup>
                                  <Label>City</Label>
                                  <Input
                                    type="text"
                                    placeholder="City"
                                    value={addressInfo.city}
                                    onChange={(e) =>
                                      userAddressHandler(e, "city", index)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Label>Country</Label>
                                  <Input
                                    type="text"
                                    placeholder="Country"
                                    value={addressInfo.country}
                                    onChange={(e) =>
                                      userAddressHandler(e, "country", index)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Label>Postal code</Label>
                                  <Input
                                    type="text"
                                    placeholder="Postal code"
                                    value={addressInfo.postalCode}
                                    onChange={(e) =>
                                      userAddressHandler(e, "postalCode", index)
                                    }
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </InputSection>
                        );
                      })}
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
                              label={imagesVal.userPhoto}
                              onChange={(e) =>
                                userImagesHandler(e, "userPhoto")
                              }
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
                              label={imagesVal.backgroundPhoto}
                              onChange={(e) =>
                                userImagesHandler(e, "backgroundPhoto")
                              }
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
      )}
    </>
  );
};

export default Profile;
