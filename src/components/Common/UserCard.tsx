import React from "react";
import { Card, CardHeader, CardBody, Row, Col, CardImg } from "reactstrap";
import { User } from "../../util/types";
import { useHistory } from "react-router-dom";

function UserCard({ user }: { user: User }) {
  let history = useHistory();
  return (
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
              href="#"
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
                <span className="heading">{user.userGigs?.length}</span>
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
          {user.addresses ? (
            <div className="h5 font-weight-300">
              {user.addresses[0].city}, {user.addresses[0].country}
            </div>
          ) : null}
          {/*<div className="h5 mt-4">For Gig #</div>*/}
          {/*<div className="h5 font-weight-300">*/}
          {/*  {user.tagLine}*/}
          {/*</div>*/}
        </div>
      </CardBody>
    </Card>
  );
}

export default UserCard;
