import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function UserDashboard() {
    const [videos, setVideos] = useState([{ VideoId: 0, Title: '', Url: '', Description: '', Views: 0, Likes: 0, Dislikes: 0, CategoryId: 0 }]);
    const [cookies, setCookie, removeCookie] = useCookies(['user-id']); 
    let navigate = useNavigate();

    function LoadVideos() {
        axios.get('http://127.0.0.1:3030/get-videos')
            .then(response => {
                setVideos(response.data);
            })
            .catch(error => {
                console.error('There was an error loading the videos!', error);
            });
    }

    useEffect(() => {
        LoadVideos();
    }, []);

    function handleSignoutClick() {
        removeCookie('user-id', { path: '/' }); 
        navigate('/user-login');
    }

    return (
        <div>
            <h3>
                {cookies['user-id']} User Dashboard - 
                <button onClick={handleSignoutClick} className="btn btn-danger">Signout</button>
            </h3>
            <div className="my-2">
                <select>
                    <option>Select Category</option>
                    <option>HTML</option>
                    <option>React Js</option>
                    <option>Java</option>
                </select>
            </div>

            <main className="d-flex flex-wrap">
                {
                    videos.map(video =>
                        <div key={video.VideoId} className="card m-2 p-2" style={{ width: "250px" }}> 
                            <div className="card-header" style={{ height: '200px' }}>
                                <iframe src={video.Url} width="100%" height="200" title={video.Title}></iframe>
                            </div>
                            <div className="card-body">
                                {video.Title}
                            </div>
                            <div className="card-footer">
                                <button className="bi bi-eye btn">{video.Views}</button>
                                <button className="bi bi-hand-thumbs-up btn">{video.Likes}</button>
                                <button className="bi bi-hand-thumbs-down btn">{video.Dislikes}</button>
                            </div>
                        </div>
                    )
                }
            </main>
        </div>
    );
}
