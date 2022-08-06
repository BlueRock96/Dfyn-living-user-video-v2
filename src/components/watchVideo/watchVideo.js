import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import styles from "./watchVideo.module.css";
import Header from '../header/header';
import { useParams } from "react-router-dom";
import dateFormat from "dateformat";
import AuthService from '../authServices/AuthService';
const Auth = new AuthService();

const WatchVideo = () => {
    const activeBtnCss =     {background: "#9B7D6A", color: "#FFFFFF", border: "1.4px solid rgba(0, 0, 0, 0.1)"}
    const inactiveBtnCss = {color: "#B19D97",  "backgroundColor": "transparent", border: "1.4px solid #B19D97" };
    const [featuredVideos, setFeaturedVideos] = useState([])
    const { id } = useParams();
    const [videoWatching, setVideoWatching] = useState()
    const playVideo = (videoItem) =>{
        fetchData(videoItem.id);
        window.scrollTo(0, 0);
    }

    async function fetchData(_id) {
        const response = await fetch(`/getvideo/${_id}`,{
            mode: 'cors', 
            method: "GET",
            headers: {"Content-Type":"application/json" , userId: (Auth.getUserInfo()).id},
          });
          const parseRes =   await response.json()
          if(response.status === 200){
            setVideoWatching(parseRes)
            setFeaturedVideos(parseRes.featured_videos)
          }else{
          }           
      }

      const likeVideo = async (id,videoWatching) => {
        const response = await fetch(`/like-video`,{
            mode: 'cors', 
            method: "POST",
            accept: "application/json",
            headers: {"Content-Type":"application/json" , userId: (Auth.getUserInfo()).id},
            body: JSON.stringify({userId: (Auth.getUserInfo()).id, videoId: id, liked: !videoWatching.liked })
          });
        //   const parseRes =   await response.json()
          if(response.status === 200){
            setVideoWatching({ ...videoWatching, liked: !videoWatching.liked})
          }        
      }

      const followChannel = async (videoWatching) =>{
        const response = await fetch(`/subscribe`,{
            mode: 'cors', 
            method: "POST",
            headers: {"Content-Type":"application/json" , userId: (Auth.getUserInfo()).id},
            body: JSON.stringify({  userId: (Auth.getUserInfo()).id, 
                                    channelId: videoWatching.channel._id, 
                                    subscribed: !videoWatching.channelSubscribed})
          });
        //   const parseRes =   await response.json()
          if(response.status === 200){
            setVideoWatching({ ...videoWatching, channelSubscribed: !videoWatching.channelSubscribed})
          }
    }


    useEffect(() =>{
          fetchData(id);
        },[id])
       
    return (
        <>
        {videoWatching &&
            <div className={styles.body}>
                    <Header />
                    <div className={styles.container}>
                        <div className={styles.watchVideoContainer}>
                        <div className={styles.videoPlayerContainer}>
                            {videoWatching &&
                            <ReactPlayer 
                                className={styles.reactPlayer}
                                url =  {videoWatching.url}
                                // pip =  {false}
                                playing =  {false}
                                playbackRate = {1}
                                controls =  {true}
                                light =  {false}
                                // muted =  false
                                // playbackRate =  1
                                // loop =  false
                                seeking =  {"true"}
                            />
                            }

                        <div>
                            <div className={styles.videoInfo1Container}>
                                <div className={styles.titleViewsContainer}>
                                    <span className={styles.videoTitle}>{videoWatching.title}</span>
                                    <span className={styles.viewCount}>{videoWatching.view} views  •  Premiered on &nbsp;
                                    {dateFormat(videoWatching.uploadDate, "mmmm dS, yyyy")}
                                    </span>
                                </div>
                                { Auth.loggedIn() && 
                                    <button className={styles.followBtn} style={  videoWatching.liked ? activeBtnCss : inactiveBtnCss} onClick={e=>likeVideo(id, videoWatching)}>{ videoWatching.liked? 'Liked' : 'Like'}</button>
                                }
                            </div>
                            <hr className={styles.hrVideoInfo}/>

                            <div className={styles.logoDescriptionContainer}>
                                <div className={styles.channelLogoWrapper}>
                                    <img src={videoWatching.channel.thumbnail}
                                        alt = "Channel Logo"/>
                                </div>
                                <div className={styles.descriptionContainer}>
                                    <div className={styles.descCont1}>
                                        <div className={styles.channelInfoContainer}>
                                            <span className={styles.channelName}>{videoWatching.channel.name}</span> 
                                            <span className={styles.subscriberCount}>{videoWatching.channel.subscribe} subscribers</span> 
                                        </div>
                                        <button className={styles.followBtn} 
                                                onClick = { e => followChannel(videoWatching)} 
                                                style={ videoWatching.channelSubscribed ? activeBtnCss : inactiveBtnCss}>
                                          {videoWatching.channelSubscribed ? "Following": "Follow"} </button>
                                    </div>
                                    <div className={styles.videoInfoContainer}>
                                        <span style={{whiteSpace: "pre-line"}}>
                                                {videoWatching.description}
                                        </span>
                                        <p className={styles.showMoreBtn}> Show More</p> 
                                    </div>
                               </div>
                            </div>

                        </div>
                        </div>

                        </div>
                        <div className={styles.featuredVideosContainer}>
                            <span className={styles.featuredVideoText}>Featured Videos</span>

                            <div className={styles.videoItemsContainer}>
                            {featuredVideos.map(videoItem=>
                                <div key = {videoItem.id} className={styles.videoItem} onClick={()=>playVideo(videoItem)}>
                                    <div className={styles.thumbnailWrapper}>
                                        <img src = {videoItem.thumbnail}  alt={videoItem.title} />
                                    </div>
                                    <div className={styles.videoItemContentWrapper}>
                                        <span className={styles.videoTitle}> {videoItem.title} </span>
                                        <div className={styles.videoDescContainer}>
                                            <span> {videoItem.channel} </span>
                                            <br/>
                                            <span>{videoItem.view} views •&nbsp;
                                                {dateFormat(videoWatching.uploadDate, "mmmm dS, yyyy")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
            </div>
        }
        </>
        )
    }

export default WatchVideo