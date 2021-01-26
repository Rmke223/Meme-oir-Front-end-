import React, { useEffect } from 'react'
import Logo from '../img/MEME.gif'
import axios from 'axios'

function Templates({ userInfo, templates, setTemplates, template, setTemplate, setCurrentPage, bearer, setBearer, setUserInfo }) {
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(x =>
            x.json().then(response => setTemplates(response.data.memes))
        );
    }, []);
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
        <div>
            <div className="container-fluid bg-success">

                <div className="row bg-primary text-white">
                    <div className="col-lg-3 col-sm-12 text-center">
                        <img className="img py-2 my-2" src={Logo} alt="logo" style={{ height: 200, width: 200 }} />
                    </div>
                    <h1 className="logo py-4 text-center col-lg-9 col-sm-12" style={{ fontSize: "10vw" }}>MEME· oir</h1>
                </div>
                <div className="row text-center">
                    <div className="col-lg-12 col-sm-12 bg-success">
                        <img onClick={() => setCurrentPage('profile')} className="prof img-fluid my-2" src={userInfo.profile_img} style={{ height: 100 }} />
                        <p>{userInfo.name}</p>
                        <nav className="navbar bg-success ">
                            <button className="btn btn-outline-primary bg-white mx-auto" onClick={() => setCurrentPage("profile")} type="button"><i class="fas fa-user-circle text-success"></i> Memes</button>
                            <button className="btn btn-outline-primary bg-white mx-auto" onClick={() => setCurrentPage("templates")} type="button"><i className="fas fa-plus text-success"></i> Create MEME</button>
                            <button className="btn btn-outline-primary bg-white mx-auto" onClick={() => logOut()} type="button"><i class="far fa-user text-danger"></i> Log Out</button>
                        </nav>
                    </div>
                </div>

                <div className="col-12 bg-success mx-auto">
                    <h1 className="logo bg-primary text-center text-white mx-0 py-2">Choose Template</h1>
                    <div className="row">
                        <div className="card-columns text-center">
                            {templates.map(template => {
                                return (
                                    <div className="card bg-success">
                                        <img
                                            className="img-fluid"
                                            key={template.id}
                                            src={template.url}
                                            alt={template.name}
                                            onClick={() => {
                                                setTemplate(template);
                                                setCurrentPage('generator')
                                            }} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Templates
