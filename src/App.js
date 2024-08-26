import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Slideshow from './Background/Slideshow';
import Login from './Components/Login/Login';
import Header from './Components/Navbar/Header';
import SignIn from './Components/Sign In/SignIn';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Reset from './Components/Reset/Reset';
import Forgot from './Components/Forgot/Forgot';
import Contact from './Components/Contact/Contact';
import { Provider } from 'react-redux';
import store from './Store/UserStore';
import Users from './Components/Users/Users';
import Profile from './Components/Profile/Profile';
import Projects from './Components/Service/Projects';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}

function AppContent() {
  const location = useLocation();
  const pathsToHideHeader = ['/']
  const pathsToHideSlideshow = ['/projects','/contact','/about','/users','/profile']
  return (
    <>
          
      {/* Conditionally render Header only on non-home pages */}
      {!pathsToHideHeader.includes(location.pathname) && <Header />}
      {!pathsToHideSlideshow.includes(location.pathname) && <Slideshow/>}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/Projects' element={<Projects/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/reset' element={<Reset />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/users' element={<Users />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
