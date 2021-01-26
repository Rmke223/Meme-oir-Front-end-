import React from 'react'
import axios from 'axios';

function register({setCurrentPage, setUserEmail, userEmail,  setUserPassword, userPassword, setUsername, username, setUserBio, userBio, profilePic}) {
    
function handleSubmit(event){
    event.preventDefault();
    const url = 'https://cors-anywhere.herokuapp.com/http://meme-oir.herokuapp.com/register'
    const method = 'post'
    const headers = {
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*'
    }

    const body ={name:username, email:userEmail, password:userPassword, profile_img:profilePic, bio:userBio}
    const data ={name:username, email:userEmail, password:userPassword, profile_img:profilePic, bio:userBio}
    axios({
        url,
        method,
        headers,
        body,
        data
    })
    .then(res => console.log(res))
    .catch(err => console.log('error: ', err))
    setCurrentPage('login')
}   
    
    return (
        <div>
            <div className="container border bg-success py-4">
                <div className="row">
                    <div className="col text-primary text-center">
                        <h1 className="logo" style={{ fontSize:"10vw" }}>MEME· oir</h1>
                        <form onSubmit={e=>handleSubmit(e)}>
                        <div className="row">
                            <div className="col-6">
                            <label htmlFor="email" className="hint py-4"><b>E m a i l</b></label><br />
                            <input
                                type="email"
                                className="form-control"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                onChange= {e=>setUserEmail(e.target.value)} 
                            />
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            <br />
                            <label htmlFor="password" className="hint py-4"><b>P a s s w o r d</b></label><br />
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                onChange= {e=>setUserPassword(e.target.value)}
                            /> <br/>
                            </div>
                            <div className="col-6">
                            <label htmlFor="username" className="hint py-4"><b>N a m e</b></label><br />
                            <input
                                type="text"
                                className="form-control"
                                onChange= {e=>setUsername(e.target.value)}
                            />
                            <br />
                            <br /><label htmlFor="bio" className="hint py-4"><b>B i o g r a p h y</b></label><br />
                            <input
                                type="text"
                                rows="3"
                                className="form-control"
                                onChange= {e=>setUserBio(e.target.value)}
                            />
                            </div>
                            </div>
                            <br />
                        
                            <button className="button my-4 btn btn-primary text-white" type="submit">Register account</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default register
