
import './App.css';
import React, { useState, useEffect } from 'react'

import HomePage from './pages/homePage/homePage';
import Login from './components/login/login';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import WatchVideo from './components/watchVideo/watchVideo';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [videosList, setVideoList] = useState([])
  const [videosListCopy, setVideosListCopy] = useState([])

  useEffect( () => {
    async function fetchData() {
        const response = await fetch(`http://localhost:7001/getvideos`,{
            mode: 'cors', 
            method: "GET",
            // headers: {"Content-Type":"application/x-www-form-urlencoded"},
          });
          const parseRes =   await response.json()
          // console.log(response);
          if(response.status === 200){
            console.log(parseRes.data);
            setVideoList(parseRes.data)
            setVideosListCopy(parseRes.data)
          }else{
          }           
      }
      fetchData();
  }, []);



  return (
 

          <BrowserRouter>
              <Routes>
                  <Route  exact path= '/' element = {<HomePage videosList = {videosList} setVideoList= {setVideoList} videosListCopy={videosListCopy} setVideosListCopy={setVideosListCopy} />}/>
                  <Route  exact path= '/login' element = {<Login/>}/>
                  <Route exact path="/watch/:id" element= {<WatchVideo videoItems = {videosList}/>} />
                  <Route path="*" element={<HomePage/>} />

                  {/* <Route  path="/dashboard" component={DashboardVideo} /> */}
                  {/* <Route render={() => <Redirect to={{pathname: "/login"}} />} /> */}
              </Routes>
          </BrowserRouter>


  );
}

export default App;
