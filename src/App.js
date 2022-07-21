
import './App.css';
import HomePage from './pages/homePage/homePage';
import Login from './components/login/login';
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import WatchVideo from './components/watchVideo/watchVideo';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
 

          <BrowserRouter>
              <Routes>
                  <Route  exact path= '/' element = {<HomePage/>}/>
                  <Route  exact path= '/login' element = {<Login/>}/>
                  <Route exact path="/watch/:id" element= {<WatchVideo/>} />
                  <Route path="*" element={<HomePage/>} />

                  {/* <Route  path="/dashboard" component={DashboardVideo} /> */}
                  {/* <Route render={() => <Redirect to={{pathname: "/login"}} />} /> */}
              </Routes>
          </BrowserRouter>


  );
}

export default App;
