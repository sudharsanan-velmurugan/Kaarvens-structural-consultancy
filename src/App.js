import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Slideshow from './Background/Slideshow';
import Login from './Components/Login/Login';
import Header from './Components/Navbar/Header';
import SignIn from './Components/Sign In/SignIn';
import Home from './Components/Home/Home';
import About from './Components/About/About';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Slideshow />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Login />} />
        <Route path='/contact' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
