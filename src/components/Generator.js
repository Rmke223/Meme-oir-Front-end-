import React, { useEffect } from 'react'
import Login from './login';
import Logo from '../img/MEME.gif'

function Generator({ template, userInfo, setCaptions, captions, meme, setMeme, setCurrentPage }) {
    const updateCaption = (e, index) => {
        const text = e.target.value || '';
        setCaptions(
            captions.map((c, i) => {
                if (index === i) {
                    return text;
                } else {
                    return c;
                }
            })
        )
    }
    useEffect(() => {
        setCaptions(Array(template.box_count).fill(''));
    }, [template])

    const generateMeme = () => {
        const formData = new FormData();
        formData.append('username', 'rmke223');
        formData.append('password', 'marley123');
        formData.append('template_id', template.id);
        captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

        fetch('https://api.imgflip.com/caption_image', {
            method: 'Post',
            body: formData
        })
        .then(res => {
            res.json().then(res => {
                setMeme(prevmeme => prevmeme = res.data.url)
                setCurrentPage(prevpage => prevpage = 'meme')
            })
            .catch(err => console.log('error: ', err))
        });
    }

    return (
        <div>
            <div className="container-fluid bg-success">
                <div className="row bg-primary text-white">
                    <div className="col-lg-3 col-sm-12 text-center">
                        <img className="img py-2 my-2" src={Logo} alt="logo" style={{ height: 200, width: 200 }} />
                    </div>
                    <h1 className="logo py-4 text-center col-lg-9 col-sm-12" style={{ fontSize:"10vw"}}>MEME· oir</h1>
                </div>
                <div className="row text-center pb-4">
                    <div className="col-lg-12 col-sm-12 bg-success">
                        <img onClick={() => setCurrentPage('profile')} className="prof img-fluid my-2" src={userInfo.profile_img} style={{ height: 100 }} />
                        <p>{userInfo.name}</p>
                        <nav className="navbar bg-success ">
                        <button className="btn btn-outline-primary bg-white mx-auto" onClick={() => setCurrentPage("profile")} type="button"><i class="fas fa-user-circle text-success"></i> Memes</button>
                        <button className="btn btn-outline-primary bg-white mx-auto" onClick={() => setCurrentPage("templates")} type="button"><i className="fas fa-plus text-success"></i> Create MEME</button>
                        </nav>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            {
                                captions.map((c, index) => (
                                    <input
                                        className="col-12 my-4"
                                        key={index}
                                        type="text"
                                        onChange={e => updateCaption(e, index)}
                                        placeholder={`input # ${index + 1}`}
                                    />
                                ))
                            }
                            <button className="col-12 btn btn-outline-primary bg-white text-primary" onClick={generateMeme}><i className="fas fa-camera-retro text-info"></i> Generate Meme!</button>
                        </div>
                        <div className="col-lg-9 col-sm-12">
                            <img className="img-fluid py-4" src={template.url} alt="template" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generator
