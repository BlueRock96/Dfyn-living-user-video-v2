import React from 'react'
import styles from "./videoGrid.module.css";
import {  useNavigate    } from "react-router-dom";
const VideoGrid = ({videoInfo}) => {
    let navigate = useNavigate();
    
    const playVideo = (videoId) =>{
        console.log(videoId);
        navigate(`/watch/${videoId}`);
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
                            <img src = {videoInfo.channelThumbnail}
                                alt = "Channel Logo" />
                        </div>
                        <div className={styles.titleFollowContainer}>
                                <span> {videoInfo.title}</span>
                                <button className={styles.followBtn}>Follow</button>
                        </div>
                    </div>
                </div>



            </>
        )
    }

export default VideoGrid