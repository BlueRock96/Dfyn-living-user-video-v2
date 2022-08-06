import React, { useState, useEffect } from 'react'
import VideoGrid from '../../components/videoGrid/videoGrid'
import styles from "./homePage.module.css";
import Header from '../../components/header/header';
import CategorySelect from '../../components/categorySelect/categorySelect';
import {HashLoader} from "react-spinners";

 

const HomePage = ({fetchData, videosList, setVideoList, videosListCopy,  setVideoListCopy }) => {
    let [loading, setLoading] = useState(true);
    const toggleLoaderOverlay = () =>{
        setLoading(false)
    }
    const [categoryList,setCategoryList ] = useState([])
    const [activeId, setActiveId] = useState();
    const filterVideos = (category) => {
        setActiveId(category.id)
        const filteredVideosList = videosListCopy.filter(d => d.categoryId === category.id);
        setVideoList(filteredVideosList);
        if( category.id === 0){
            setVideoList(videosListCopy);
        }
    }

        useEffect( () => {
        async function fetchCategory() {
            const response = await fetch(`/getCategory`,{
                mode: 'cors', 
                method: "GET",
              });
              const parseRes =   await response.json()
              if(response.status === 200){
                setCategoryList(parseRes.data)
            }        
          }
          fetchCategory();
          
         setTimeout(toggleLoaderOverlay, 1500);

      
      }, []);




   
            
    return (
            <div className='app'>


                <div className={styles.container}>
                    <div className= {styles.headerContainer}>
                        <Header
                            videosList = {videosList}
                            setVideoList = {setVideoList}
                            videosListCopy = {videosListCopy} 
                        />
                        <CategorySelect
                            categoryList = {categoryList}
                            filterVideos = {filterVideos}
                            activeId = {activeId}
                            />
                    </div>
                    <div className={styles.A1}>

                        {loading ?                     
                        <div className={styles.loaderWrapper}>
                            <HashLoader color={"red"} speedMultiplier = {1} loading={loading}  size={50} />
                        </div>
                        :
                            <> 
                                    {videosList.map((videoInfo) =>
                                        <VideoGrid 
                                            key= {videoInfo.id}
                                            videoInfo={videoInfo}
                                            fetchData = {fetchData}
                                            />
                                        )}
                            </>
                        }
                    </div>
                </div>
            </div>
        )
    }

export default HomePage