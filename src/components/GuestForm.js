import React from "react";
import ReactFlagsSelect from "react-flags-select";
import Select from "react-select";
import Footer from "./Footer";
import { Button } from "react-bootstrap";
import "../styles/GuestForm.css";

const GuestForm = ({ onConnect, onChangeForm, setMe, me }) => {
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
    {
      value: 6,
      label: "Mandarin Chinese",
    },
    {
      value: 7,
      label: "Hindi",
    },
    {
      value: 8,
      label: "Arabic",
    },
    {
      value: 9,
      label: "Russian",
    },
    {
      value: 10,
      label: "Portuguese",
    },
  ];

  const handleSetCountry = (code) => {
    setMe((prevState) => ({ ...prevState, country: code }));
  };

  const handleLanguage = (e) => {
    setMe((prevState) => ({ ...prevState, language: e }));
  };
  const handleComStyle = (e) => {
    setMe((prevState) => ({ ...prevState, comStyle: e.target.value }));
    // setRadio(e.target.value);
  };

  return (
    <div>
      <div className="main-div mt-4">
        <h1>Enter your info</h1>
        <form className="text-center" onSubmit={onConnect}>
          <div className="row">
            <div className="col-md-6 m-auto">
              <div className="card animated zoomIn mt-5 shadow-lg">
                <div className="card card-body border border-0 m-4">
                  <h1 className="text-center mb-3">Guest info</h1>

                  <div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                        onChange={onChangeForm}
                      />
                    </div>
                    <ReactFlagsSelect
                      searchable
                      type="country"
                      id="country"
                      name="country"
                      className="bg-white"
                      placeholder="Select Country"
                      selected={me.country}
                      onSelect={(code) => handleSetCountry(code)}
                    />
                    <br />
                    <div className="form-group">
                      <Select
                        options={languagelist}
                        onChange={handleLanguage}
                        type="languages"
                        id="languages"
                        name="languages"
                        className="text-left"
                        placeholder="Select Languages"
                        isMulti
                      />
                    </div>
                    <h5 className="pt-4">Communication Style</h5>
                    <div className="form-group pb-3">
                      <input
                        type="radio"
                        className=" mr-1"
                        checked={me.comStyle && me.comStyle === "Speaker"}
                        value="Speaker"
                        onChange={handleComStyle}
                      />
                      <label>Speaker </label>

                      <input
                        type="radio"
                        className="ml-5 mr-1"
                        checked={me.comStyle && me.comStyle === "Listener"}
                        value="Listener"
                        onChange={handleComStyle}
                      />
                      <label>Listener </label>

                      <input
                        type="radio"
                        className="ml-5 mr-1"
                        checked={me.comStyle && me.comStyle === "Both"}
                        value="Both"
                        onChange={handleComStyle}
                      />
                      <label>Both </label>
                    </div>
                    <Button className="roundButton mr-md-4" href="/">
                      {" "}
                      Go back{" "}
                    </Button>
                    <Button type="submit" className="roundButton ml-md-4">
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default GuestForm;
