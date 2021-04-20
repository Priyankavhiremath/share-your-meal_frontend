import React from "react";
import { Link } from "react-router-dom";
import { Fade, Zoom } from "react-awesome-reveal";
import Footer from "./Footer"
import Button from "react-bootstrap/Button";

const WelcomePage = () => {
  return (
    <div className="welcome">
      <div className="main-div">
        <div className="text-light text-center md-2 py-5">
          <h2>Welcome to</h2>
          <br/> 
          <Fade delay={500}><h2><span className="logo display-3">Share Your Meal</span></h2></Fade>
          <Zoom delay={1500}><div className="mediumtext pb-3">Connects people across the world!</div></Zoom>
          <h5>Click here to <Link to="/register" className="link-style">
            Register</Link> or <Link to="/login" className="link-style">Login</Link> </h5>
        </div>

        
          <div className="col-sm-3 py-5 mx-auto">
            <div className="guest-div shadow-lg  mb-5 bg-white rounded">
              <h5 className="mt-2 pt-3">Jump in as a guest</h5>
              <Link to="/guest">
                <Button className="btn mt-2 pb-2 textColor fontFamily shadow guest-button">
                  Start
                </Button>
              </Link>
            </div>
          </div>

        <div className="justify-content-center pt-3">
          <div className="p-3 text m-5 bg-white rounded border border-0 shadow-lg m-5">
            <div className="d-flex flex-row ">
              <div className="">
                
                <p className="pr-5 pl-5">
                  <img
                    className=" welcome-image pr-5"
                    alt="logo"
                    src="/img/meal.jpg"
                  />
                </p>
                <div>
                <h2 className=" text-center p-2 m-2">
                  What is <span className="logo">SYM</span>?
                </h2>
                <p className="aboutSYM pr-5 pl-5">
                    Eating is often more enjoyable with a bit of company, whether
                    you like to discuss over your plates or just want to munch along
                    in silence. However, modern work settings and lifestyles can
                    make it difficult to find the lighthearted setting that keeps
                    your belly happy. Share Your Meal provides the opportunity to
                    connect with another person from around the world for a casual
                    online mealtime. Just enter your nickname, language and location
                    and set yourself as available - you can now receive a call or
                    choose your mealbuddy from a randomly picked selection of other
                    Share Your Meal users. No complicated decision process, and also
                    no awkward ‘How to find an end?’ situation, because all Share
                    Your Meal calls will be automatically closed after 20 minutes.
                    Slip out of your daily routine within an everyday experience!
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WelcomePage;
