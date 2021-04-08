import React from 'react'

const LoginForm = () => {
    return (
        
           <>
      <div className="text-light text-center">
        <div className="row mt-0">
          <div className="col-md-6 m-auto">
            <div className="card card-body bg-light border border-0 shadow m-5">
              <h1 className="text-center mb-3 ">Login</h1>

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
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                <button type="submit" className='purple-button'>Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
     
        </>
    )
}

export default LoginForm
