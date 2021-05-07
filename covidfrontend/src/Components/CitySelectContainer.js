import React, { useState } from "react";
import { Form, Input, Label, FormGroup } from "reactstrap";
import Select from "react-select";
import data from "./data.json";

export default function CitySelectContainer(props) {
  let city;

  const [country, setCountry] = useState("India");
  const [DDLcity, setDDLCity] = useState("");

  const [DDLcityErr, setDDLcityErr] = useState({});

  const formValidation = () => {
    const DDLcityErr = {};
    let isValid = true;

    if (DDLcity === "") {
      DDLcityErr.nameEmpty = `City can not be blank`;
      isValid = false;
    }

    setDDLcityErr(DDLcityErr);
    return isValid;
  };

  // handle change event of the city dropdown
  const handleCityChange = (obj) => {
    setDDLCity(obj);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      city = DDLcity.region;
      props.history.push(`/${city}`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="UserAccountform">
      <div>
        <h1
          className="text-center font-bold optionTitle"
          style={{ color: "#0069d9" }}
        >
          SelfSeva
        </h1>
      </div>

      <FormGroup>
        <Label for="Country">
          <span>Country</span>
        </Label>
        <Input
          type="text"
          value={country}
          // onChange={(e) => setCountry(e.target.value)}
          disabled
        />
      </FormGroup>

      <FormGroup>
        <Label for="City">
          <span>City</span>
        </Label>
        <Select
          placeholder="Select City"
          value={DDLcity}
          options={data}
          onChange={handleCityChange}
          getOptionLabel={(x) => x.region}
          getOptionValue={(x) => x.country_code}
        />
        {Object.keys(DDLcityErr).map((key) => {
          return (
            <div style={{ color: "red", fontWeight: "bold" }} key={key}>
              {DDLcityErr[key]}&nbsp;<i className="fas fa-exclamation"></i>
            </div>
          );
        })}
      </FormGroup>

      <div>
        <label />
        <button className="primary btn btn-primary" type="submit">
          Continue
        </button>
      </div>
    </Form>
  );
}
