import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Invite from './pages/Invite';
import CreateTeam from './pages/CreateTeam';
import ManageTeam from './pages/ManageTeam';
import Main from './pages/Main';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Link to="/"></Link>
      <Link to="/invite"></Link>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/createteam" element={<CreateTeam />}></Route>
        <Route path="/manageteam" element={<ManageTeam />}></Route>
        <Route path="/invite/:code" element={<Invite />}></Route>
        <Route path="/main" element={<Main />}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;