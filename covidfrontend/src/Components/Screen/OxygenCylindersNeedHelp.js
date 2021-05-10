import React, { useEffect, useState } from "react";
import axios from "axios";
import cardOptionsData from "../CardData";
import cityData from "../data.json";

export default function OxygenCylindersNeedHelp(props) {
  const pathname = props.location.pathname.slice(1);
  let cityNameSplit = pathname.split("/")[0];
  let cityName = cityNameSplit.charAt(0).toUpperCase() + cityNameSplit.slice(1);
  // let optionType = props.match.params.option;

  const reqOption = cardOptionsData.cards.find(
    (obj) => obj.routeTitle === props.match.params.option
  );
  const reqCity = cityData.find(
    (obj) => obj.region === props.match.params.city
  );

  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    showDataHandler();
  }, []);

  const showDataHandler = () => {
    // e.preventDefault();

    axios({
      method: "GET",
      url: `/api/${pathname}`,
    })
      .then((response) => {
        console.log("NEED HELP-DISPLAY SUCCESS", response.data);
        setDisplayData(response.data);
      })
      .catch((error) => {
        console.log("NEED HELP-DISPLAY ERROR", error);
      });
  };

  if (!reqOption || !reqCity) {
    return <div>Not Found</div>;
    //break
  }
  //else
  return (
    <div style={{ margin: "8px" }}>
      <div>
        <h1
          className="text-center font-bold optionTitle"
          style={{ color: "#0069d9" }}
        >
          {cityName} {reqOption.title} Information
        </h1>
      </div>
      {displayData.length > 0 ? (
        displayData.map((m) => (
          <div key={m._id} className="displayContainer text-center CenterBody">
            <p>
              <span className="font-bold displayContainer-title">
                @{m.fullName.replace(/\s+/g, "")}
              </span>
            </p>

            {m.phone ? (
              <p>
                <span>
                  <i className="fas fa-mobile"></i>&nbsp;
                </span>
                {m.phone}
              </p>
            ) : null}

            <p className="color-red font-weight600">
              {/* <span ><i className="fas fa-info"></i>&nbsp;</span> */}
              {m.address}
            </p>

            {m.link ? (
              <p>
                <span>
                  <i className="fas fa-link"></i>&nbsp;
                </span>
                <a href={`${m.link}`}>{m.link}</a>
              </p>
            ) : null}

            <p>
              <span>
                <i className="fas fa-calendar-day"></i>&nbsp;
              </span>
              {m.createdAt}
            </p>

            {/* {m.articleImage ? ( */}
              <img
                alt="share image"
                src={`/upload/${m.articleImage}`}
                className="NeedHelp-img zoom"
              ></img>
            {/* ) : null} */}
          </div>
        ))
      ) : (
        <h5 className="text-center color-red">No Data Found</h5>
      )}
    </div>
  );
}
