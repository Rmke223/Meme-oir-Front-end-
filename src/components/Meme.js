import React from 'react';
import axios from 'axios';
import Logo from '../img/MEME.gif'

function Meme({ meme, userInfo, setCurrentPage, bearer, setUserInfo }) {
    const userId = userInfo.id
    function archiveMeme(event) {
        event.preventDefault();
        const url = 'https://cors-anywhere.herokuapp.com/http://meme-oir.herokuapp.com/store'
        const method = 'post'


        const body = { users_id: userId, meme_url: meme }
        const data = { users_id: userId, meme_url: meme }
        axios({
            url,
            method,
            body,
            data
        })
            .then(refreshMemes(), setCurrentPage('profile'))
            .catch(err => console.log('error: ', err))
    }
    function refreshMemes(event){
        axios({
            url: "https://cors-anywhere.herokuapp.com/http://meme-oir.herokuapp.com/api/user",
            method: "get",
            headers: {Accept: "application/json",
            Authorization: `Bearer ${bearer}`}
        })
            .then(response => setUserInfo(previnfo => previnfo = response.data))
            .catch(err => console.log('error: ', err))
    }

    return (
        <div>
            <div className="row bg-primary text-white">
                <div className="col-lg-3 col-sm-12 text-center">
                    <img className="img py-2 my-2" src={Logo} alt="logo" style={{ height: 200, width: 200 }} />
                </div>
                <h1 className="logo py-4 text-center col-lg-9 col-sm-12" style={{ fontSize: 100 }}>MEME· oir</h1>
            </div>
            <div className="row text-center my-2">
                <div className="col-lg-12 col-sm-12 bg-success">
                    <img onClick={() => setCurrentPage('profile')} className="prof img-fluid my-2" src={userInfo.profile_img} style={{ height: 100 }} />
                    <p>{userInfo.name}</p>
                    <nav className="navbar bg-success ">
                        <button className="btn btn-outline-primary bg-white mx-auto" onClick={() => setCurrentPage("profile")} type="button"><i class="fas fa-user-circle text-success"></i> Memes</button>
                        <button className="btn btn-outline-primary bg-white mx-auto" onClick={() => setCurrentPage("templates")} type="button"><i className="fas fa-plus text-success"></i> Create MEME</button>
                    </nav>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-4 text-center py-4 my-4">
                    <button className="btn btn-outline-success bg-white col-sm-12 col-md-4 col-lg-6 text-primary my-4" onClick={(e) => archiveMeme(e)}><i className="far fa-save text-info"></i> Save</button><br />
                    <button className="btn btn-outline-success bg-white col-sm-12 col-md-4 col-lg-6 text-primary my-4" onClick={() => setCurrentPage('generator')}><i className="fas fa-edit text-danger"></i> Edit</button>
                </div>
                <div className="col-8">
                    <img className="img-fluid" src={meme} alt="yurt" />
                </div>
            </div>



        </div>
    )
}

export default Meme
