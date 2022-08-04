import React from 'react'
import styles from "./videoGrid.module.css";
import {  useNavigate    } from "react-router-dom";
import AuthService from '../authServices/AuthService';
const Auth = new AuthService();

//Unfollow Channel

const VideoGrid = ({videoInfo}) => {
    console.log("videgrid comp",  videoInfo);
    let navigate = useNavigate();
    
    const playVideo = (videoId) =>{
        console.log(videoId);
        navigate(`/watch/${videoId}`);
    }
    const followChannel = async (videoInfo) =>{
        console.log(videoInfo);
        const response = await fetch(`/subscribe`,{
            mode: 'cors', 
            method: "POST",
            headers: {"Content-Type":"application/json" , userId: (Auth.getUserInfo()).id},
            body: JSON.stringify({userId: (Auth.getUserInfo()).id, channelId: videoInfo.channel._id})
          });
          const parseRes =   await response.json()
          if(response.status === 200){
            console.log(parseRes);
          }else{
          }  

    }
        return (
            <>


                <div className= {`${styles.videoItemContainer} grid-item`}>
                    <div className={styles.videoThumbnailWrapper} 
                          onClick={()=>playVideo(videoInfo.id)}>
                        <img src = {videoInfo.thumbnail}
                            alt = {videoInfo.title}
                            className = {styles.videoThumbnail}/>
                    </div>
                    
                    <div className = {styles.videoInfoContainer}>
                        <div className={styles.channelLogoWrapper}>
                            <img src = {videoInfo.channel.thumbnail}
                                alt = "Channel Logo" />
                        </div>
                        <div className={styles.titleFollowContainer}>
                                <span> {videoInfo.title}</span>
                                { Auth.loggedIn() && 
                                <button className={styles.followBtn} 
                                        onClick = {e=>followChannel(videoInfo)}>
                                    {videoInfo.channel.subscribed ? "Following" : "Follow"} 
                                </button>
                                }
                        </div>
                    </div>
                </div>



            </>
        )
    }

export default VideoGrid