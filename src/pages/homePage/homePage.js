import React, { useState } from 'react'
import VideoGrid from '../../components/videoGrid/videoGrid'
import styles from "./homePage.module.css";
import Header from '../../components/header/header';
import CategorySelect from '../../components/categorySelect/categorySelect';
const HomePage = () => {


    const [videosList] = useState([
        {   id: 11, 
            title: 'Jaadugar | Official Trailer', 
            thumbnail: 'https://i.ytimg.com/vi/M5HUt0I3fbE/maxresdefault.jpg', 
            channelThumbnail: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI'
        },
        {
            id: 12, 
            title: 'Sulthan Video Song (Hindi) | KGF', 
            thumbnail: 'https://images.indianexpress.com/2022/04/kgf-2-1200.jpeg', 
            channelThumbnail: 'https://hombalefilms.com/wp-content/uploads/2021/07/Hombale-Films-Logo-new.png'
        },
        {   id: 13, 
            title: 'TENET Official Soundtrack | POSTERITY', 
            thumbnail: 'https://i2.wp.com/www.btglifestyle.com/wp-content/uploads/2020/09/Tenet-review-by-Stephen-Nagel-BTG-Lifestyle.jpg?zoom=2&resize=800%2C445', 
            channelThumbnail: 'https://scontent.fccu1-2.fna.fbcdn.net/v/t1.6435-9/101160594_10160312719207575_7756682770180472832_n.png?_nc_cat=103&ccb=1-7&_nc_sid=7aed08&_nc_ohc=H7rV1rsWRaAAX9HwaqJ&_nc_ht=scontent.fccu1-2.fna&oh=00_AT_JU_OW6K6XgMho_aSD4JcswC4Uy8KFear7Df3vvT7t_w&oe=62E2E670'
        },
        {
            id: 14, 
            title: 'Giva Ad - Anushka Sharma', 
            thumbnail: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/ea92815b-02f4-48e4-90fc-379a67f4082f.__CR0,0,4042,2500_PT0_SX970_V1___.jpg', 
            channelThumbnail: 'https://cdn.shopify.com/s/files/1/0061/8378/0442/files/pride-logo_180x.png?v=1654497962'
        } ])

    const [videosList2] = useState([
        {   id: 15, 
            title: 'Galaxy S22 Review', 
            thumbnail: 'https://www.androidauthority.com/wp-content/uploads/2022/02/Samsung-Galaxy-S22-family-in-blue-angled-camera-closeups-1280w-720h.jpg.webp', 
            channelThumbnail: 'https://play-lh.googleusercontent.com/jyaAkxAzm_6KfuBvLlgbFeLLcNcGBqJkWjwcubmqH2NWj4yzxAPyiZBUVGmJWNmsx5k=w480-h960'
        },
        {   id: 16, 
            title: 'Avatar: The Way of Water | Official Teaser Trailer', 
            thumbnail: 'https://cdn.mos.cms.futurecdn.net/FvLi2evhiuCYNdZ7HALQu3-1024-80.jpeg.webp', 
            channelThumbnail: 'https://img.freepik.com/free-vector/colorful-movie-logo_18099-26.jpg?w=740'
        },
        {   id: 11, 
            title: 'Jaadugar | Official Trailer', 
            thumbnail: 'https://i.ytimg.com/vi/M5HUt0I3fbE/maxresdefault.jpg', 
            channelThumbnail: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI'
        },
        {   id: 17, 
            title: 'CGI Timelapse - New York City 2016 - 1811', 
            thumbnail: 'https://www.videostudiopro.com/static/vsp/images/pages/seo/tips/make/time-lapse-video.jpg', 
            channelThumbnail: 'https://previews.123rf.com/images/jayaart/jayaart2002/jayaart200200040/141370077-globe-travel-logo-design-travel-and-tour-vector-logo-design-concept-.jpg'},
    ])
    return (
            <>
                <div className={styles.container}>

                <div className= {styles.headerContainer}>
                    <Header/>
                    <CategorySelect/>
                </div>

                    

                    <div className={styles.videosContainerAll}>
                        <div className= {styles.videosContainer}>
                        {videosList.map((videoInfo) =>
                            <VideoGrid videoInfo={videoInfo} />
                            )}
                        </div>

                        <div className= {styles.videosContainer}>
                        {videosList2.map((videoInfo) =>
                            <VideoGrid videoInfo={videoInfo} />
                            )}
                        </div>
                        <div className= {styles.videosContainer}>
                        {videosList.map((videoInfo) =>
                            <VideoGrid videoInfo={videoInfo} />
                            )}
                        </div>

                    </div>

                </div>
            </>
        )
    }

export default HomePage