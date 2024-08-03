import './App.css';
import Slideshow from './Background/Slideshow';
import Login from './Components/Login/Login';
import Header from './Components/Navbar/Header';
import SignIn from './Components/Sign In/SignIn';
function App() {
  return (
    <div className='App' > 
     <Slideshow/>
     <Header/>
     <Login/>
     <SignIn/>
     </div>
  );
}

export default App;
