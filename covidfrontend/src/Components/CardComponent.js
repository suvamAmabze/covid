import React from "react";
import { Card, Button } from "react-bootstrap";
import data from "./CardData";
import cityData from "./cities.json";

export default function CardComponets(props) {
  // const pathname = props.location.pathname.slice(1);
  // console.log(pathname)
  // console.log(props.match.params.city)

  const reqState = cityData.find(
    (obj) =>
      obj.state.split(" ").join("").toLowerCase() ===
      props.match.params.city.split("-")[0]
  );
  let reqCity;
  if (reqState) {
    reqCity = reqState.cities.find(
      (obj) =>
        obj.name.split(" ").join("").toLowerCase() ===
        props.match.params.city.split("-")[1]
    );
  }

  if (!reqState || !reqCity) {
    return <div>Data Not Found</div>;
    //break
  }
  //else
  return (
    <div className="cardContainer">
      {data.cards.map((card) => (
        <Card style={{ width: "18rem" }} key={card._id}>
          <Card.Img className="card-img" variant="top" src={card.img} />
          <Card.Body className="text-center">
            <Card.Title style={{ fontWeight: "bold" }}>{card.title}</Card.Title>

            <Button
              className="card-btn"
              variant="primary"
              onClick={() => {
                // props.history.push(
                //   `/${reqCity.region}/${card.routeTitle}/options`
                // );

                props.history.push(
                  `/${reqState.state
                    .split(" ")
                    .join("")
                    .toLowerCase()}-${reqCity.name
                    .split(" ")
                    .join("")
                    .toLowerCase()}/${card.routeTitle}/options`
                );
              }}
            >
              Details
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
