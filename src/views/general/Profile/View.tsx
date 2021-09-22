import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";

// import { useDetectClickOutside } from "react-detect-click-outside";

import InputSection from "../../../components/Utility/Form/InputSection";
import Background from "../Gigs/pexels-christina-morillo-1181675.jpeg";
import { useSelector } from "react-redux";
import { Store, UserType, User } from "../../../util/types";
import { useHistory, useParams } from "react-router-dom";
import UserCard from "../../../components/Common/UserCard";
import axios from "axios";
import { USER_DETAIL } from "../../../util/api";
import ProgressIndicator from "../../../components/Utility/ProgressIndicator/ProgressIndicator";

// core components

const Profile = () => {
  let { userId } = useParams<{ userId: string }>();
  let history = useHistory();
  const LoggedInuser = useSelector((state: Store) => state.user);
  const token = useSelector((state: Store) => state.token);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${USER_DETAIL}${userId}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("user detail", response.data);
        if (response.data.uid) {
          let user = {
            interId: response.data.id,
            id: response.data.uid,
            userPhoto: response.data.userPhoto,
            description: response.data.description,
            firstName: response.data.details.name,
            lastName: response.data.details.surname,
            email: response.data.details.email,
            type: response.data.type as UserType,
            addresses: response.data.userAddresses,
            skills: response.data.userSkillsets,
            backgroundPhoto: response.data.backgroundPhoto,
            tagLine: response.data.tagLine,
            userGigs: response.data.userGigs,
          };

          setUser(user);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, userId]);

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
          {user && !loading ? (
            <Row>
              <Col lg="12" md="12">
                <h1 className="display-2 text-white">
                  {user.firstName} {user.lastName}
                </h1>

                {LoggedInuser?.id === user?.id ? (
                  <Button
                    color="info"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`${window.location.pathname}/edit`);
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : null}
              </Col>
            </Row>
          ) : !loading && !user ? (
            <p>No User Found</p>
          ) : null}
        </Container>
      </div>
      <Container className="mt--7" fluid>
        <Row>
          {loading ? (
            <Col className="order-xl-1" xl="12">
              <div style={{ minHeight: "400px" }}>
                {" "}
                <ProgressIndicator
                  message="Loading Profile..."
                  textColor="#fff"
                />{" "}
              </div>
            </Col>
          ) : user ? (
            <>
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <div className="full-width app-info-section">
                  <UserCard user={user} />
                </div>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardBody>
                    <InputSection title="User information">
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Email Address</Label>
                            <div className="profile-info-unit">
                              {user.email}
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label>First name</Label>
                            <div className="profile-info-unit">
                              {user.firstName}
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Last name</Label>
                            <div className="profile-info-unit">
                              {user.lastName}
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </InputSection>

                    {user.type === "DS" && (
                      <InputSection title="My Skills">
                        <Row>
                          <Col md={12}>
                            <FormGroup>
                              <div className="selectedSkillContainer">
                                {user.skills?.map((item, keyIndex) => (
                                  <div key={`ssa-${item.skill}`}>
                                    <Badge color="dark">{item.skill}</Badge>
                                  </div>
                                ))}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      </InputSection>
                    )}

                    <InputSection title="About me">
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label>Description</Label>
                            <div className="profile-info-unit">
                              {user.description}
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </InputSection>

                    <hr className="my-4" />

                    <InputSection title="Contact information">
                      {user.addresses.map((addressInfo, index) => {
                        return (
                          <InputSection
                            key={`ssa-${index}`}
                            {...(user.addresses.length > 1
                              ? { title: `Address ${index + 1}` }
                              : {})}
                          >
                            <Row>
                              <Col md={4}>
                                <FormGroup>
                                  <Label>Street</Label>
                                  <div className="profile-info-unit">
                                    {addressInfo.address.replace(/[0-9]/g, "")}
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Label>Number</Label>
                                  <div className="profile-info-unit">
                                    {addressInfo.address.replace(/^\D+/g, "")}
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md={4}>
                                <FormGroup>
                                  <Label>City</Label>
                                  <div className="profile-info-unit">
                                    {addressInfo.city}
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Label>Country</Label>
                                  <div className="profile-info-unit">
                                    {addressInfo.country}
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Label>Postal code</Label>
                                  <div className="profile-info-unit">
                                    {addressInfo.postalCode}
                                  </div>
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
                            <div className="profile-info-unit">
                              <img
                                alt="Profile picture"
                                width="140"
                                src={user.userPhoto}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label>Background Picture</Label>
                            <div className="profile-info-unit">
                              <img
                                alt="Profile picture"
                                width="140"
                                src={user.backgroundPhoto}
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </InputSection>
                  </CardBody>
                </Card>
              </Col>
            </>
          ) : null}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
