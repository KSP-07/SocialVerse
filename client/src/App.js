
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import React, { useContext } from "react";
import {  BrowserRouter as Router,  Routes,  Route,Navigate} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import TodoList from "./pages/todo/components/TodoList";
// import index from "./pages/Ecommerce/Shop";
import Index from "./pages/Ecomerce/Index";
function App() {
  // return <Home/>
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        {/* in place os switch now Routes is used */}
        <Route exact path="/" element={user?<Home/> : <Register/>}/>
        <Route  path="/login" element={user?  <Navigate to="/" />  :<Login/>}/>
        <Route  path="/register" element={user?<Navigate to="/" /> :<Register/>}/>
        {/* added this new line */}
        <Route  path="/messenger" element={!user?<Navigate to="/" /> :<Messenger/>}/>
        {/* :) */}
        <Route  path="/profile/:username" element={<Profile/>}/>
        <Route path="/todo" element={user ? <TodoList /> : <Navigate to="/" />} />
        <Route path="/ecommerce" element={user ? <Index /> : <Navigate to="/" />} />
      </Routes>
    </Router> 
  )

}

export default App;
