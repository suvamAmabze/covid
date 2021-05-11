import React, { useState } from "react";
import { Form, Input, Label, FormGroup } from "reactstrap";
import Select from "react-select";
import data from "./cities.json";

export default function CitySelectContainer(props) {
  let city;
  let state;

  const [country, setCountry] = useState("India");
  const [DDLstate, setDDLState] = useState("");
  const [DDLcity, setDDLCity] = useState("");
  const [DDLcityList, setDDLCityList] = useState([]);

  const [DDLcityErr, setDDLcityErr] = useState({});
  const [DDLstateErr, setDDLstateErr] = useState({});

  const formValidation = () => {
    const DDLcityErr = {};
    const DDLstateErr = {};
    let isValid = true;

    if (DDLcity === "") {
      DDLcityErr.nameEmpty = `City can not be blank`;
      isValid = false;
    }
    if (DDLstate === "") {
      DDLstateErr.nameEmpty = `State can not be blank`;
      isValid = false;
    }

    setDDLcityErr(DDLcityErr);
    setDDLstateErr(DDLstateErr)
    return isValid;
  };

  // handle change state dropdown
  const handleStateChange = (obj) => {
    setDDLState(obj);
    setDDLCityList(obj.cities);
    setDDLCity("");
  };

  // handle change city dropdown
  const handleCityChange = (obj) => {
    setDDLCity(obj);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      city = DDLcity.name.split(" ").join("").toLowerCase();
      state = DDLstate.state.split(" ").join("").toLowerCase();
      alert(city)
      alert(state)
      // props.history.push(`/${city}`);
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
        <Label for="State">
          <span>State, Union territory</span>
        </Label>
        <Select
          placeholder="Select state or union territory"
          value={DDLstate}
          options={data}
          onChange={handleStateChange}
          getOptionLabel={(x) => x.state}
          getOptionValue={(x) => x.state_code}
        />
        {Object.keys(DDLstateErr).map((key) => {
          return (
            <div style={{ color: "red", fontWeight: "bold" }} key={key}>
              {DDLstateErr[key]}&nbsp;<i className="fas fa-exclamation"></i>
            </div>
          );
        })}
      </FormGroup>

      <FormGroup>
        <Label for="City">
          <span>Cities, Towns</span>
        </Label>
        <Select
          placeholder="Select city or town"
          value={DDLcity}
          options={DDLcityList}
          onChange={handleCityChange}
          getOptionLabel={(x) => x.name}
          getOptionValue={(x) => x.code}
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
