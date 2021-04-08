import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="background">
      <div className="text-light text-center m-5">
        <h1>
          Welcome to <br/><span className="logo display-3">Share Your Meal</span>
        </h1>
        <div className="mediumtext">Connects people across the world!</div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6 m-auto">
          <div className="card card-body text-center bg-light border border-0 shadow m-5">
            
            <p>Create an account or login</p>
            <Link
              to="/register"
              className="btn purple-button btn-block mb-2"
            >
              Register
            </Link>
            <Link to="/login" className="btn purple-button btn-block">
              Login
            </Link>
          </div>
        </div>
        <div className="col-md-6 m-auto">
          <div className="card card-body text-center bg-light border border-0 shadow m-5">
            <p>Jump in as a guest</p>
            <Link
              to="/guest"
              className="btn purple-button btn-block mb-2 textColor"
            >
              Join as a guest
            </Link>
          </div>
        </div>
      </div>
      {/* Welcome Text */}
      <div className="justify-content-center">
        <div className="p-3 text m-5 bg-light rounded border border-0 shadow m-5">
          <div className="d-flex flex-row ">
            <div className="">
              <h2 className=" text-center p-2 m-2">
                What is <span className="logo">SYM</span>?
              </h2>
              <p className="pr-5 pl-5">
                <img
                  className=" welcome-image pr-5"
                  alt="logo"
                  src="/img/logo6.png"
                />
              </p>
              <p className=" pr-5 pl-5">
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
  );
};

export default WelcomePage;
