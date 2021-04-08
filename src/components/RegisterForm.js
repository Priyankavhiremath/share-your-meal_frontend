import React from "react";
import  "../styles/RegisterForm.css"

const RegisterPage = () => {
  return (
    <div>
      <div className="text-light text-center">
        <div className="row mt-0">
          <div className="col-md-6 m-auto">
            <div className="card card-body bg-light border border-0 shadow m-5">
              <h1 className="text-center mb-3">Register</h1>

              <form>
                <div className="form-group"> 
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Create Password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password2">Confirm Password</label>
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="form-group"> 
                  <label htmlFor="country">Country</label>
                  <input
                    type="country"
                    id="country"
                    name="country"
                    className="form-control"
                    placeholder="Enter Country"
                  />
                </div>
                <div className="form-group"> 
                  <label htmlFor="language">Language</label>
                  <input
                    type="language"
                    id="language"
                    name="language"
                    className="form-control"
                    placeholder="Enter Language"
                  />
                </div>

                <button type="submit" className='purple-button'>Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;

