import React from "react";
import { Col, Row } from "reactstrap";
import cardOptionsData from "../CardData";
import cityData from "../allcities.json";

export default function twoOptions(props) {
  let reqCity;
  let reqDistrict;

  const pathname = props.location.pathname.slice(1);

  const reqOption = cardOptionsData.cards.find(
    (obj) => obj.routeTitle === props.match.params.option
  );
  // const reqCity = cityData.find(
  //   (obj) => obj.region === props.match.params.city
  // );
  const reqState = cityData.find(
    (obj) =>
      obj.state.split(" ").join("").toLowerCase() ===
      props.match.params.city.split("-")[0]
  );
  if (reqState) {
    reqDistrict = reqState.districts.find(
      (obj) =>
        obj.name.split(" ").join("").toLowerCase() ===
        props.match.params.city.split("-")[1]
    );
  }
  if (reqDistrict) {
    reqCity = reqDistrict.Cities.find(
      (obj) =>
        obj.name.split(" ").join("").toLowerCase() ===
        props.match.params.city.split("-")[2]
    );
  }

  if (!reqOption || !reqState || !reqDistrict || !reqCity) {
    return <div>Data Not Found</div>;
    //break
  }
  //else
  console.log("props",props)
  console.log(pathname)
  return (
    // <Container>
    <Row noGutters>
      <Col
        xs={12}
        md={6}
        onClick={() => {
          props.history.push(
            `/${props.match.params.city}/${props.match.params.option}/options/can-help`
          );
          // props.history.push(`/${pathname}/can-help`);
        }}
      >
        <img
          alt=""
          src="/images/help.webp"
          className="leftside optionsContainer-child cursor-pointer"
        ></img>
        <span className="twoOptionTitle cursor-pointer">I Can Help</span>
      </Col>

      <Col
        xs={12}
        md={6}
        onClick={() => {
          props.history.push(`/${pathname}/need-help`);
        }}
      >
        <img
          alt=""
          src="/images/needHelp.webp"
          className="rightside optionsContainer-child cursor-pointer"
        ></img>
        <span className="twoOptionTitle cursor-pointer">I Need Help</span>
      </Col>
    </Row>
    // </Container>
  );
}
