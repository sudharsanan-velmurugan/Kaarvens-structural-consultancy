import './App.css';
import Slideshow from './Background/Slideshow';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Header from './Components/Navbar/Header';
import SignIn from './Components/Sign In/SignIn';
function App() {
  return (
    <div > 
     <Header/>
     <Slideshow/>
     <Login/>
     <SignIn/>
    </div>
  );
}

export default App;
