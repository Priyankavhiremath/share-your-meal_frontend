import React, { useEffect, useState } from "react";
import { userContext } from "../utils/auth";
import { Button } from "react-bootstrap";

const Profile = ({ me, onLogout }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getContext = async () => {
      try {
        const { data: userData } = await userContext();
        if (!userData) return onLogout();
        // console.log({ userData });
        setUser(userData);
      } catch (e) {
        onLogout(); // bypassing this just to see the cookie
        // if there’s an error, send the user back to the login page
      }
    };
    getContext();
  }, [onLogout]);

  return (
    <div>
      {!user ? (
        <p>Enter valid credentials</p>
      ) : (
        <div className="text-light text-center">
          <div className="row mt-0">
            <div className="col-md-6 m-auto">
              <div className="card animated zoomIn mt-5">
                <div className="card card-body bg-light border border-0 shadow m-5">
                  <h1 className="text-center mb-3">Hello {user.nickName}</h1>
                  <p>Choose what would you like to change</p>

                  <form>
                    <div className="form-group">
                      {/* <p>Your name is {user.nickName} </p> */}
                      <label htmlFor="name">Change your name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                      />
                    </div>

                    <div className="form-group">
                      {/* <p>Your country is {user.location.country} </p> */}
                      <label htmlFor="country">Change your country</label>
                      <input
                        type="country"
                        id="country"
                        name="country"
                        className="form-control"
                        placeholder="Enter Country"
                      />
                    </div>

                    <div className="form-group">
                      {/* <p>Your language is {user.languages} </p> */}
                      <label htmlFor="language">Change your language</label>
                      <input
                        type="language"
                        id="language"
                        name="language"
                        className="form-control"
                        placeholder="Enter Language"
                      />
                    </div>
                    <p>
                      <Button className="roundButton" onClick={onLogout}>
                        Logout
                      </Button>
                      <br />
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
