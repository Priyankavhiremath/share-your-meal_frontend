import React from 'react'

const LoginForm = ({ onAuth, onSetCredentials, onConnect, onChangeForm }) => {
  return (
    <>
      <div className="text-light text-center">
        <div className="row mt-0">
          <div className="col-md-6 m-auto">
            <div className="card card-body bg-light border border-0 shadow m-5">
              <h1 className="text-center mb-3 ">Login</h1>

              <form form className="text-light text-center" onSubmit={onConnect} onChange={onChangeForm}> 
                <div className="form-group"> 
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter email"
                    required
                    autoFocus
                    onChange={(e) => onSetCredentials(e)}
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
                    required
                    onChange={(e) => onSetCredentials(e)}
                  />
                </div>
                <button
                  onClick={() => onAuth()}
                  type="submit"
                  className='purple-button'
                >Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
