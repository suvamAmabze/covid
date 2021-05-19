import React, { useState } from "react";
import { Form, Input, Label, FormGroup } from "reactstrap";
import axios from "axios";
import cardOptionsData from "../CardData";
import cityData from "../allcities.json";

export default function OxygenCylindersCanHelp(props) {
  let reqCity;
  let reqDistrict;

  const pathname = props.location.pathname.slice(1);
  let cityNameSplit = pathname.split("/")[0];
  let cityName = cityNameSplit.charAt(0).toUpperCase() + cityNameSplit.slice(1);
  let optionType = props.match.params.option;

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

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [link, setLink] = useState("");
  const [fileName, setFileName] = useState("");

  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
    console.log("F A", fileName);
  };

  const [fullNameErr, setFullNameErr] = useState({});
  const [phoneErr, setPhoneErr] = useState({});
  const [addressErr, setAddressErr] = useState({});
  const [linkErr, setLinkErr] = useState({});

  const formValidation = () => {
    const fullNameErr = {};
    const phoneErr = {};
    const addressErr = {};
    const linkErr = {};
    let isValid = true;

    if (fullName === "") {
      fullNameErr.nameEmpty = "Name can not be blank.";
      isValid = false;
    }
    if (fullName.trim().length > 20) {
      fullNameErr.nameLong = "Name text is too long.";
      isValid = false;
    }
    if (phone.trim().length <= 9 || phone.trim().length > 10 || phone === "") {
      phoneErr.telephoneLong = "Length of a phone number is 10 digits.";
      isValid = false;
    }
    if (link.trim().length > 250) {
      linkErr.nameLong = "Link text is too long.";
      isValid = false;
    }
    if (address === "") {
      addressErr.nameEmpty = "Information can not be blank.";
      isValid = false;
    }
    if (address.trim().length > 300) {
      addressErr.nameLong = "Information text is too long.";
      isValid = false;
    }

    setFullNameErr(fullNameErr);
    setPhoneErr(phoneErr);
    setAddressErr(addressErr);
    setLinkErr(linkErr);

    return isValid;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = formValidation();
    if (isValid) {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("link", link);
      formData.append("articleImage", fileName);

      axios({
        method: "POST",
        url: `/api/${pathname}`,
        // data: { fullName, address, link, image },
        data: formData,
      })
        .then((response) => {
          console.log("CAN HELP-SHARE SUCCESS", response);
          // setFullName("");
          // setAddress("");
          // setLink("");
        })
        .catch((error) => {
          console.log("CAN HELP-SHARE ERROR", error);
        });
      props.history.push(
        `/${reqState.state.split(" ").join("").toLowerCase()}-${reqDistrict.name
          .split(" ")
          .join("")
          .toLowerCase()}-${reqCity.name
          .split(" ")
          .join("")
          .toLowerCase()}/${optionType}/options/need-help`
      );
    }
  };

  if (!reqOption || !reqState || !reqDistrict || !reqCity) {
    return <div>Data Not Found</div>;
    //break
  }
  //else
  return (
    <div>
      <Form
        onSubmit={submitHandler}
        encType="multipart/form-data"
        className="UserAccountform"
      >
        <div>
          <h1
            className="text-center font-bold optionTitle"
            style={{ color: "#0069d9" }}
          >
            Share {cityName} {reqOption.title} Information
          </h1>
        </div>
        <div className="hr" />

        <FormGroup>
          <Label for="name">
            <span>Name</span>
          </Label>
          <Input
            placeholder="Enter name"
            className="form-control"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {Object.keys(fullNameErr).map((key) => {
            return (
              <div style={{ color: "red", fontWeight: "bold" }} key={key}>
                {fullNameErr[key]}
              </div>
            );
          })}
        </FormGroup>

        <FormGroup>
          <Label for="phone">
            <span>Phone</span>
          </Label>
          <Input
            placeholder="Enter number"
            className="form-control"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {Object.keys(phoneErr).map((key) => {
            return (
              <div style={{ color: "red", fontWeight: "bold" }} key={key}>
                {phoneErr[key]}
              </div>
            );
          })}
        </FormGroup>

        <FormGroup>
          <Label for="address">
            <span>Information</span>
          </Label>
          <Input
            type="textarea"
            placeholder="Enter information"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {Object.keys(addressErr).map((key) => {
            return (
              <div style={{ color: "red", fontWeight: "bold" }} key={key}>
                {addressErr[key]}
              </div>
            );
          })}
        </FormGroup>

        <FormGroup>
          <Label for="link">
            <span>Full Link</span>
          </Label>
          <Input
            type="text"
            placeholder="https://www.link.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          {Object.keys(linkErr).map((key) => {
            return (
              <div style={{ color: "red", fontWeight: "bold" }} key={key}>
                {linkErr[key]}
              </div>
            );
          })}
        </FormGroup>

        <FormGroup>
          <Label for="file">
            <span>Upload Image</span>
          </Label>
          <Input type="file" filename="articleImage" onChange={onChangeFile} />
        </FormGroup>

        <div>
          <label />
          <button className="primary btn btn-primary" type="submit">
            Share
          </button>
        </div>
      </Form>
    </div>
  );
}
