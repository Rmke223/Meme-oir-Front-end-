import React, { useState } from 'react'
import Logo from '../img/MEME.gif'
import axios from 'axios'

function Profile({ userInfo, setCurrentPage, bearer, setUserInfo, setBearer }) {
    const [modalURL, setModalURL] = useState("")
    function refreshMemes(event) {
        axios({
            url: "https://cors-anywhere.herokuapp.com/http://meme-oir.herokuapp.com/api/user",
            method: "get",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${bearer}`
            }
        })
            .then(response => setUserInfo(previnfo => previnfo = response.data))
            .catch(err => console.log('error: ', err))
    }
    function deleteMeme(event) {
        axios({
            url: `https://cors-anywhere.herokuapp.com/http://meme-oir.herokuapp.com/delete/${event}`,
            method: "delete",
        })
            .then((e) => refreshMemes(e))
            .catch(err => console.log('error: ', err))
    }
    function logOut() {
        axios({
            url: "https://cors-anywhere.herokuapp.com/http://meme-oir.herokuapp.com/logout",
            method: "get",
            headers: { Accept: "application/json", Authorization: `Bearer ${bearer}` }
        })
            .then(console.log("YEEET"), setCurrentPage('login'), setBearer(''), setUserInfo(''))
            .catch(err => console.log('error: ', err))
    }
    return (
        <div className="text-center">
            <div className="row bg-primary text-white">
                <div className="col-lg-3 col-sm-12 text-center">
                    <img className="img py-2 my-2" src={Logo} alt="logo" style={{ height: 200, width: 200 }} />
                </div>
                <h1 className="logo py-4 text-center col-lg-9 col-sm-12" style={{ fontSize: "10vw" }}>MEME· oir</h1>
            </div>
            <div className="row text-center py-2">
                <div className="col-lg-12 col-sm-12 bg-success">
                    <img onClick={() => setCurrentPage('profile')} className="prof img-fluid my-2" src={userInfo.profile_img} style={{ height: 100 }} />
                    <p className="ree">{userInfo.name}</p>
                    <nav className="navbar bg-success ">
                        <button className="btn btn-outline-primary bg-white mx-auto" onClick={() => setCurrentPage("profile")} type="button"><i class="fas fa-user-circle text-primary"></i> Memes</button>
                        <button className="btn btn-outline-primary bg-white mx-auto" onClick={() => setCurrentPage("templates")} type="button"><i className="fas fa-plus text-success"></i> Create MEME</button>
                        <button className="btn btn-outline-primary bg-white mx-auto" onClick={() => logOut()} type="button"><i class="far fa-user text-danger"></i> Log Out</button>
                    </nav>
                </div>
            </div>
            <h1 className="logo bg-primary text-center text-white mx-0 py-2">{userInfo.name}'s Personal MEME· oir</h1>
            <button className="btn btn-outline-success text-white my-4" onClick={()=>refreshMemes()}><i className="fas fa-sync-alt text-info"></i> Refresh</button>

            <div className="card-columns text-center">
                {userInfo.meme.slice(0).reverse().map(meme => {
                    return (
                        <div className="card bg-success p-2">
                            <img
                                className="img-fluid pb-2"
                                key={meme.id}
                                src={meme.meme_url}
                                alt={meme.id}
                            />
                            <br />
                            <button
                                type="button"
                                onClick={(e) => setModalURL(prevurl => prevurl = e.target.id)}
                                data-toggle="modal"
                                data-target="#exampleModalCenter"
                                className="btn btn-outline-primary bg-white mx-4"
                                id={meme.meme_url}><i
                                    className="fas fa-share-alt text-info"
                                ></i> Share
                                </button>
                            <button
                                className="btn btn-outline-primary bg-white mx-4"
                                id={meme.id}
                                onClick={(e) => deleteMeme(e.target.id)}><i
                                    className="far fa-trash-alt text-danger"></i> Delete</button>
                        </div>
                    )
                })}
            </div>



            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content text-center">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Share This Meme</h5>
                            <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center bg-success">
                            <a className="" href="http://Facebook.com" target="_blank"><i className="fab fa-facebook-f text-primary"></i> Facebook</a><br />
                            <a className="" href="http://Twitter.com" target="_blank"><i className="fab fa-twitter text-info"></i> Twitter</a><br />
                            <a className="" href="http://instagram.com" target="_blank"><i className="fab fa-instagram text-danger"></i> Instagram</a><br />
                            <img src={modalURL} className="img-fluid mt-2" alt="yote" />
                            <p className="mt-4">Copy Link:</p>
                            <input type="text" value={modalURL} style={{ width: "75%" }} className="text-center" />
                        </div>
                        <div className="modal-footer bg-primary">
                            <button type="button" className="btn btn-outline-success bg-white text-primary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
