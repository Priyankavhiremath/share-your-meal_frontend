import React from "react";
import Select from "react-select";
import { countries } from "country-data";
import { Container, Row, Col } from "react-bootstrap";

const UserFilter = ({ filter, setFilter }) => {
  const countrylist = countries.all.map((country) => ({
    value: country.alpha2,
    label: country.name,
  }));

  const languagelist = [
    {
      value: 1,
      label: "English",
    },
    {
      value: 2,
      label: "German",
    },
    {
      value: 3,
      label: "Spanish",
    },
    {
      value: 4,
      label: "French",
    },
    {
      value: 5,
      label: "Japanese",
    },
  ];

  const commStylelist = [
    {
      value: 1,
      label: "Speaker",
    },
    {
      value: 2,
      label: "Listener",
    },
    {
      value: 3,
      label: "Both",
    },
  ];

  const handleCountry = (e) => {
    setFilter((prevState) => ({ ...prevState, country: e }));
  };
  const handleLanguage = (e) => {
    setFilter((prevState) => ({ ...prevState, language: e }));
  };
  const handleComStyle = (e) => {
    setFilter((prevState) => ({ ...prevState, comStyle: e }));
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <h4>filter by</h4>
      </Row>
      <Row>
        <Col className="form-group" md={4}>
          <Select
            options={countrylist}
            onChange={handleCountry}
            type="countries"
            id="countries"
            name="countries"
            className="text-left"
            placeholder="Country"
            isMulti
          />
        </Col>

        <Col className="form-group" md={4}>
          <Select
            options={languagelist}
            onChange={handleLanguage}
            type="languages"
            id="languages"
            name="languages"
            className="text-left"
            placeholder="Languages"
            isMulti
          />
        </Col>

        <Col className="form-group " md={4}>
          <Select
            options={commStylelist}
            onChange={handleComStyle}
            type="commStylelist"
            id="commStylelist"
            name="commStylelist"
            className="text-left"
            placeholder="Communication Style"
            isMulti
          />
        </Col>
      </Row>
    </Container>
  );
};

export default UserFilter;
