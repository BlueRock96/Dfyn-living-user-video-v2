
import './App.css';
import React, { useState, useEffect } from 'react'
import HomePage from './pages/homePage/homePage';
import Login from './components/login/login';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import WatchVideo from './components/watchVideo/watchVideo';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AuthService from './components/authServices/AuthService';
const Auth = new AuthService();

function App() {

  
  const [panelVisible, setPanelVisible] = useState(true);
  const togglePanel = () =>{
      setPanelVisible(!panelVisible);
  }




  const [videosList, setVideoList] = useState([])
  const [videosListCopy, setVideosListCopy] = useState([])
  // const [subscribedChannels, setSubscribedChannels] = useState([])

  const [fetch_, setFetch_] = useState(false);

   const fetchData = async () => {
    const response = await fetch(`/getvideos`,{
        mode: 'cors', 
        method: "GET",
        // headers: {"Content-Type":"application/x-www-form-urlencoded"},
      });
      const parseRes =   await response.json()
      if(response.status === 200){
        setVideoList(parseRes.data)
        setVideosListCopy(parseRes.data)
        if (Auth.loggedIn())  
            getSubscribedChannels();
        setFetch_(true)
      }else{
      }           
  }

  useEffect( () => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[fetch_]);


  const  getSubscribedChannels = async () => {
      const response = await fetch(`/subscribed-channel`,{
        mode: 'cors', 
        method: "POST",
        headers: {"Content-Type":"application/json", userId: (Auth.getUserInfo()).id },
        body: JSON.stringify({userId: (Auth.getUserInfo()).id})
      });
      const parseRes =   await response.json()
      if(response.status === 200){
        const array = [];
        await parseRes.data.forEach(data => array.push(data.channelId))
        await videosList.forEach( val => array.includes(val.channel._id) ? val.channel.subscribed = true:val.channel.subscribed = false  );
        setVideoList(videosList)
      }else{

      }  
    }

  return (
 

          <BrowserRouter>
              <Routes>
                  <Route  exact path= '/' element = {
                        <HomePage videosList = {videosList} setVideoList= {setVideoList} 
                        videosListCopy={videosListCopy} setVideosListCopy={setVideosListCopy} 
                        fetchData = {fetchData} 
                        panelVisible = {panelVisible} togglePanel = {togglePanel}/>}/>
                  <Route  exact path= '/login' element = {<Login/>}/>
                  <Route exact path="/watch/:id" element= {
                            <WatchVideo 
                             panelVisible = {panelVisible}
                            togglePanel = {togglePanel}/>} />
                  <Route path="*" element={<HomePage />} />

                  {/* <Route  path="/dashboard" component={DashboardVideo} /> */}
                  {/* <Route render={() => <Redirect to={{pathname: "/login"}} />} /> */}
              </Routes>
          </BrowserRouter>


  );
}

export default App;
