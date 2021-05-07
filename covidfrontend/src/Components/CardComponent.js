import React from "react";
import { Card, Button } from "react-bootstrap";
import data from "./CardData";
import cityData from "./data.json";

export default function CardComponets(props) {
  // const pathname = props.location.pathname.slice(1);
  // console.log(pathname)
  // console.log(props.match.params.city)

  const reqCity = cityData.find(
    (obj) => obj.region === props.match.params.city
  );

  if (!reqCity) {
    return <div>City Not Found</div>;
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
                props.history.push(
                  `/${reqCity.region}/${card.routeTitle}/options`
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
