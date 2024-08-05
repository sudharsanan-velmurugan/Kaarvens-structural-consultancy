import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Slideshow from './Background/Slideshow';
import Login from './Components/Login/Login';
import Header from './Components/Navbar/Header';
import SignIn from './Components/Sign In/SignIn';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'  element={ <Slideshow/>}/>
      <Route path='/header'  element={  <Header/>}/>
      <Route path='/login'  element={ <Login/>}/>
      <Route path='/signin'  element={ <SignIn/>}/>
    </Routes>   
    </BrowserRouter>     
  );
}

export default App;
