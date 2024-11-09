import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Slideshow from "./Background/Slideshow";
import Login from "./Components/Login/Login";
import Header from "./Components/Navbar/Header";
import SignIn from "./Components/Sign In/SignIn";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import { Provider } from "react-redux";
import store from "./Store/UserStore";
import Users from "./Components/Users/Users";
import Profile from "./Components/Profile/Profile";
import Projects from "./Components/Projects/Projects";
import Logout from "./Components/Logout/Logout";
import CreateProject from "./Components/Projects/Create Project/CreateProject";
import EditProject from "./Components/Projects/Edit Project/EditProject";
import EditProfile from "./Components/Profile/EditProfile";
import Tasks from "./Components/Tasks/Tasks/Tasks";
import CreateTasks from "./Components/Tasks/CreateTask/CreateTask";
import EditTask from "./Components/Tasks/EditTask/EditTask";
import Finance from "./Components/Finance/Finance";
import CreateFinance from "./Components/Finance/CreateFinance";
import EditFinance from "./Components/Finance/EditFinance";
import ProtectedRoute from "./ProtectedRoute";

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
  const pathsToHideHeader = ["/", "/login", "/signin", "/reset", "/forget"];
  const pathsToDisplaySlideshow = [
    "/",
    "/login",
    "/signin",
    "/profile",
    "/editprofile",
  ];
  return (
    <>
      {!pathsToHideHeader.includes(location.pathname) && <Header />}
      {pathsToDisplaySlideshow.includes(location.pathname) && <Slideshow />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/projects" element={<Projects />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/editproject/:id" element={<EditProject />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/createtask" element={<CreateTasks />} />
          <Route path="/edittask/:id" element={<EditTask />} />
          <Route path="/users" element={<Users />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/createfinance" element={<CreateFinance />} />
          <Route path="/editfinance/:id" element={<EditFinance />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
