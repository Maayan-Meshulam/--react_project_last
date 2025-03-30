import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { lazy, useEffect, useState } from 'react'
import { TokenInterface } from './interfaces/tokenInterface'
import { Mode, webModeContext } from './context/DarkLightMode'
import { encodingToken, getTokenFromStorage } from './services/tokenServices';
import userIsConnectContext from './context/UserContext';
import { searchContext } from './context/SearchContext';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './components/mainLayout/ErrorPage';


const About = lazy(()=>import('./components/mainLayout/About'));
const Navbar = lazy(()=>import('./components/mainLayout/Navbar'));
const Home = lazy(()=>import('./components/Home'));
const Footer = lazy(()=>import('./components/mainLayout/Footer'));
const Login = lazy(()=>import('./components/user/Login'));
const Register = lazy(()=>import('./components/user/register/Register'));
const MyCards = lazy(()=>import('./components/card/MyCards'));
const DisplayOneCard = lazy(()=>import('./components/card/DisplayOneCard'));
const FavCards = lazy(()=>import('./components/card/FavCards'));
const CreateCard = lazy(()=>import('./components/card/create_cards/CreateCard'));
const UpdateCard = lazy(()=>import('./components/card/updat_card/UpdateCard'));
const UpdateUserDetails = lazy(()=>import('./components/user/UpdateUserDetails'));
const UserInfo = lazy(()=>import('./components/user/UserInfo'));
const Sandbox = lazy(()=>import('./components/admin/Sandbox'));


function App() { 

  //search
  const [exppToSearch, setSearchExpp] = useState<string>("");
  

  //dark-light
  const [mode, setWebMode] = useState<Mode>("light");
  const setMode = ()=>{
    mode == "light" ? setWebMode("dark") : setWebMode("light")
  }

  //user base info
  const [userBaseInfo, setUserBaseInfo] = useState<TokenInterface | undefined>();

  useEffect(()=>{
    const token = getTokenFromStorage();
    (token && setUserBaseInfo(encodingToken(token)))
  }, [])


  gsap.registerPlugin(ScrollToPlugin) ;

  return (
    
    <div className={`${mode}Mode`}>
      <ToastContainer/>
      <webModeContext.Provider value={{mode, setMode}}>
      <userIsConnectContext.Provider value={{userBaseInfo, setUserBaseInfo}}>
      <searchContext.Provider value={{exppToSearch, setSearchExpp}}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Navbar/> <Home/> <Footer/></>}/>
          <Route path='/login' element={<><Navbar/> <Login/> <Footer/></>}/>
          <Route path='/register' element={<><Navbar/> <Register/> <Footer/></>}/>
          <Route path='/about' element={<><Navbar/> <About/> <Footer/></>}/>
          <Route path='/create-card' element={<><Navbar/> <CreateCard/> <Footer/></>}/>
          <Route path='/update-card' element={<><Navbar/> <UpdateCard/> <Footer/></>}/>
          <Route path='/delete-card' element={<><Navbar/> <UpdateCard/> <Footer/></>}/>
          <Route path='/update-card/:id' element={<><Navbar/> <UpdateCard/> <Footer/></>}/>
          <Route path='my-cards' element={<><Navbar/> <MyCards/> <Footer/></>}/>
          <Route path='fav-cards' element={<><Navbar/> <FavCards/> <Footer/></>}/>
          <Route path='/card-info/:id' element={<><Navbar/> <DisplayOneCard/> <Footer/></>}/>
          <Route path='/update-user/:id' element={<><Navbar/> <UpdateUserDetails/> <Footer/></>}/>
          <Route path='/delete-user/:id' element={<><Navbar/> <UpdateUserDetails/> <Footer/></>}/>
          <Route path='/user-info/:id' element={<><Navbar/> <UserInfo/> <Footer/></>}/>
          <Route path='/sandbox' element={<><Navbar/> <Sandbox/> <Footer/></>}/>
          <Route path='*' element={<><Navbar/> <ErrorPage/> <Footer/></>}/>
        </Routes>
      </BrowserRouter>  
      </searchContext.Provider>
      </userIsConnectContext.Provider>   
      </webModeContext.Provider>
    </div>
  )
}

export default App
