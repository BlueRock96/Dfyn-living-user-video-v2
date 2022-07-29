import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import styles from "./watchVideo.module.css";
import Header from '../header/header';
import { useParams , useNavigate    } from "react-router-dom";
import _ from "lodash";
const WatchVideo = () => {
    const { id } = useParams();
    let navigate = useNavigate();
    const [videoItems ] = useState([
        {
            id: 11,
            title: 'Jaadugar | Official Trailer',
            channelName : 'Netflix India',
            description: ["Jeetu meets magic meets football meets love. Dil behlane nahi, dil jeetne aa rha hai Jaadugar." , <br/> , "Streaming from 15th July only on Netflix."],
            url :  "https://www.youtube.com/watch?v=i7yFiUio0u0",
            thumbnail: "https://i.ytimg.com/vi/M5HUt0I3fbE/maxresdefault.jpg",
            likes: 347,
            views: 98,
            uploadedOn: '24 Days ago',
            uploadDate: '21 June 2022',
            channelThumbnail: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI',
            channelSubsribers:  18.3
        },
        {
            id: 12,
            title: 'Sulthan Video Song (Hindi) | KGF',
            channelName : 'Hombale Films',
            description: ["Presenting the song full video song Sultan Ki from the movie KGF."],
            url :  "https://www.youtube.com/watch?v=Ek-2VWEvQkQ",
            thumbnail: "https://images.indianexpress.com/2022/04/kgf-2-1200.jpeg",
            likes: 347,
            views: 98,
            uploadedOn: '24 Days ago',
            uploadDate: '10 June 2021',
            channelThumbnail: 'https://hombalefilms.com/wp-content/uploads/2021/07/Hombale-Films-Logo-new.png',
            channelSubsribers:  21.2
        },
        {
            id: 13,
            title: 'TENET Official Soundtrack | POSTERITY - Ludwig Göransson | WaterTower',
            channelName : 'WaterTower Music',
            description: ["TENET #OfficialMovieSoundtrack - Full Album by Ludwig Göransson | Film starring: John David Washington, Robert Pattinson, Elizabeth Debicki, Himesh Patel and Michael Caine." , <br/> , "Avail now: https://lnk.to/TENETID"],
            url :  "https://www.youtube.com/watch?v=ZE5zXLOyEOQ",
            thumbnail: "https://i2.wp.com/www.btglifestyle.com/wp-content/uploads/2020/09/Tenet-review-by-Stephen-Nagel-BTG-Lifestyle.jpg?zoom=2&resize=800%2C445",
            likes: 347,
            views: 98,
            uploadedOn: '24 Days ago',
            uploadDate: '10 June 2021',
            channelThumbnail: 'https://scontent.fccu1-2.fna.fbcdn.net/v/t1.6435-9/101160594_10160312719207575_7756682770180472832_n.png?_nc_cat=103&ccb=1-7&_nc_sid=7aed08&_nc_ohc=H7rV1rsWRaAAX9HwaqJ&_nc_ht=scontent.fccu1-2.fna&oh=00_AT_JU_OW6K6XgMho_aSD4JcswC4Uy8KFear7Df3vvT7t_w&oe=62E2E670',
            channelSubsribers:  21.2
        },
        {
            id: 14,
            title: 'Giva Ad - Anushka Sharma',
            channelName : 'GIVA',
            description: ["GIVA is an online silver jewellery store featuring high-quality, affordable designs.", <br/>, "Giva offers perfect range of trendy fashion jewellery for your loved ones."],
            url :  "https://dfyntube.s3.ap-south-1.amazonaws.com/gdi.mp4",
            thumbnail: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/ea92815b-02f4-48e4-90fc-379a67f4082f.__CR0,0,4042,2500_PT0_SX970_V1___.jpg",
            likes: 27,
            views: 11,
            uploadedOn: '32 Days ago',
            uploadedDate: '8 October 2019',
            channelThumbnail: "https://cdn.shopify.com/s/files/1/0061/8378/0442/files/pride-logo_180x.png?v=1654497962",
            channelSubsribers:  1.2
        },
        {
            id: 15,
            title: 'Galaxy S22 Review',
            channelName : 'Android Authority',
            description: ["The Galaxy Ultra series has redefined the standards for smartphone photography. Does that continue with the Galaxy S22 Ultra?",<br/>,"In this video, we take a quick look at what Samsung claims is their best camera system on a smartphone yet"],
            url :  "https://www.youtube.com/watch?v=6CH6YCdEtlw",
            thumbnail: "https://www.androidauthority.com/wp-content/uploads/2022/02/Samsung-Galaxy-S22-family-in-blue-angled-camera-closeups-1280w-720h.jpg.webp",
            likes: 27,
            views: 11,
            uploadedOn: '9 Months ago',
            uploadedDate: '19 November 2021',
            channelThumbnail: "https://play-lh.googleusercontent.com/jyaAkxAzm_6KfuBvLlgbFeLLcNcGBqJkWjwcubmqH2NWj4yzxAPyiZBUVGmJWNmsx5k=w480-h960",
            channelSubsribers:  1.2
        },
        {
            id: 16,
            title: 'Avatar: The Way of Water | Official Teaser Trailer',
            channelName : 'Avatar',
            description: ["Set more than a decade after the events of the first film,",<br/>, "Avatar: The Way of Water” begins to tell the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive,  and the tragedies they endure."],
            url :  "https://www.youtube.com/watch?v=a8Gx8wiNbs8",
            thumbnail: "https://cdn.mos.cms.futurecdn.net/FvLi2evhiuCYNdZ7HALQu3-1024-80.jpeg.webp",
            likes: 270,
            views: 22,
            uploadedOn: '1 Month ago',
            uploadedDate: '9 May 2022',
            channelThumbnail: "https://img.freepik.com/free-vector/colorful-movie-logo_18099-26.jpg?w=740",
            channelSubsribers:  7.66
        },
        {
            id: 17,
            title: 'CGI Timelapse - New York City 2016 - 1811',
            channelName : 'Urban VFX',
            description: ["The shot rewinds New York City from the present-day to its early days, showing the port city in 1811.",<br/>, "Commissioned for TV series Metropolis for Nutopia."],
            url :  "https://www.youtube.com/watch?v=f6U7YFPrz6Y",
            thumbnail: "https://www.videostudiopro.com/static/vsp/images/pages/seo/tips/make/time-lapse-video.jpg",
            likes: 942,
            views: 412,
            uploadedOn: '5 Years ago',
            uploadedDate: '12 June 2016',
            channelThumbnail: "https://previews.123rf.com/images/jayaart/jayaart2002/jayaart200200040/141370077-globe-travel-logo-design-travel-and-tour-vector-logo-design-concept-.jpg",
            channelSubsribers:  7.66
        },

  ])
    //  const [videoItemsCopy, setVideoItemsCopy] = useState(videoItems);
    const [videoWatching, setVideoWatching] = useState(videoItems[1])
    const playVideo = (videoItem) =>{
        setVideoWatching(videoItem);
        window.scrollTo(0, 0);
        // const myArray = videoItemsCopy.filter(function( obj ) {
        //     return obj.id !== videoItem.id;
        // });
        // setVideoItems(myArray)

    }
    useEffect(() =>{
        window.scrollTo(0, 0);

        var watchVideoObj =  videoItems.find(o => parseInt(o.id) === parseInt(id))
        // console.log(watchVideoObj);
       if(!_.isUndefined(watchVideoObj))
            setVideoWatching(watchVideoObj)
        else
           navigate('/');
            //  eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
       
    return (
        <>
            <div className={styles.body}>

                    <Header />

                    <div className={styles.container}>
                        <div className={styles.watchVideoContainer}>
                        <div className={styles.videoPlayerContainer}>
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
                                seeking =  {true}
                            />

                        <div>
                            
                            <div className={styles.videoInfo1Container}>
                                <div className={styles.titleViewsContainer}>
                                    <span className={styles.videoTitle}>{videoWatching.title}</span>
                                    <span className={styles.viewCount}>{videoWatching.views}M views  •  Premiered on {videoWatching.uploadDate}</span>
                                </div>
                                <button className={styles.followBtn}>Follow</button>
                            </div>
                            <hr className={styles.hrVideoInfo}/>

                            <div className={styles.logoDescriptionContainer}>
                                <div className={styles.channelLogoWrapper}>
                                    <img src={videoWatching.channelThumbnail}
                                        alt = "Channel Logo"/>
                                </div>
                                <div className={styles.descriptionContainer}>
                                    <div className={styles.channelInfoContainer}>
                                        <span className={styles.channelName}>{videoWatching.channelName}</span> 
                                        <span className={styles.subscriberCount}>{videoWatching.channelSubsribers}M subscribers</span> 
                                    </div>
                                    <div className={styles.videoInfoContainer}>
                                        <span>
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

                            {videoItems.map(videoItem=>
                                <div className={styles.videoItem} onClick={()=>playVideo(videoItem)}>
                                    <div className={styles.thumbnailWrapper}>
                                        <img src = {videoItem.thumbnail}  alt={videoItem.title} />
                                    </div>
                                    <div className={styles.videoItemContentWrapper}>
                                        <span className={styles.videoTitle}> {videoItem.title} </span>
                                        <div className={styles.videoDescContainer}>
                                            <span> {videoItem.channelName} </span>
                                            <br/>
                                            <span>{videoItem.views}M views • {videoItem.uploadedOn} </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            </div>
                        </div>

                    </div>
            </div>
        </>
        )
    }

export default WatchVideo