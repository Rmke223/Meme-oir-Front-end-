import React, { useEffect } from 'react'
import MayMay from '../img/MEME.gif'
import axios from 'axios';

function Login({ bearer, setBearer, setCurrentPage, setUserEmail, userEmail, setUserPassword, userPassword, userInfo, setUserInfo, currentPage }) {
    function handleSubmit(event) {
        event.preventDefault();
        const headers = {
            Accept: "application/json",
            'Content-Type': 'application/json;charset=UTF-8',
        }

        axios({
            url: "https://cors-anywhere.herokuapp.com/http://meme-oir.herokuapp.com/v1/oauth/token",
            method: "post",
            data: {
                grant_type: "password",
                client_id: "2",
                client_secret: "kRZzELjTaLhjjumF6BIzOdXDgNP4bl2zeqxJRysZ",
                password: userPassword,
                username: userEmail,
                scope: ""
            },
            headers,
        })

            .then(res => setBearer(prevBearer => prevBearer = res.data.access_token))
            .catch(err => console.log('error: ', err))
    }

    useEffect(() => {
        console.log(bearer)
        {
            bearer.length > 1 &&
                axios({
                    url: "https://cors-anywhere.herokuapp.com/http://meme-oir.herokuapp.com/api/user",
                    method: "get",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${bearer}`
                    }
                })
                    .then(response => {
                        // if response is good
                        console.log(response)
                        if (response !== "") {
                            setUserInfo(previnfo => previnfo = response.data);

                        }

                    })
                    .catch(err => console.log('error: ', err))

        }
    }, [bearer])

    useEffect(() => {
        if (userInfo !== "") { userInfo && setCurrentPage(prevpage => prevpage = 'templates') }
    }, [userInfo])

    return (
        <div>
            <div className="container border bg-success py-4">
                <div className="row mx-auto">
                    <div className="col-lg-6 col-md-4 text-center py-4">
                        <img src={MayMay} className="img-fluid" alt="" />
                    </div>
                    <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
                        <div className="container border text-center text-primary">
                            <h1 className="logo py-4" style={{ fontSize: "6vw" }}>MEME· oir</h1>
                            <form onSubmit={e => handleSubmit(e)}>
                                <label htmlFor="email" className="hint py-4"><b>E m a i l</b></label><br />
                                <input
                                    type="email"
                                    className="form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={e => setUserEmail(e.target.value)}
                                />
                                <br />
                                <label htmlFor="password" className=" hint py-4"><b>P a s s w o r d</b></label><br />
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="password"
                                    onChange={e => setUserPassword(e.target.value)}
                                />
                                <br />
                                <button className="button my-4 btn btn-primary text-white">Submit</button><br />
                            </form>
                            <button className="button my-4 btn btn-primary text-white" onClick={() => setCurrentPage('register')}>Register Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
