import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Slideshow from './Background/Slideshow';
import Login from './Components/Login/Login';
import Header from './Components/Navbar/Header';
import SignIn from './Components/Sign In/SignIn';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Reset from './Components/Reset/Reset';
import Forgot from './Components/Forgot/Forgot';
import Service from './Components/Service/Service'
import Contact from './Components/Contact/Contact'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Slideshow />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Service />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='reset' element={<Reset />} />
        <Route path='forgot' element={<Forgot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
