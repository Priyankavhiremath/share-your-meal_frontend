import React from 'react'

const GuestForm = ({
    onConnect,
    onChangeForm,
    username,
    setUsername
}) => {
    
    return (
        <div>
            <h1>Enter your info</h1>
            <form
                className="text-light text-center"
                onSubmit={onConnect}
                onChange={onChangeForm}
            >
                <div className="row mt-0">
                <div className="col-md-6 m-auto">
                    <div className="card card-body bg-light border border-0 shadow m-5">
                    <h1 className="text-center mb-3">Guest info</h1>

                    <div>
                        <div className="form-group"> 
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter Name"
                            value={username}
                            label="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                            
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

                                <button
                                    type="submit"
                                    className='purple-button'
                                >Connect</button>
                    </div>
                    </div>
                </div>
                </div>
            </form>
        
            </div>
    )
}

export default GuestForm

