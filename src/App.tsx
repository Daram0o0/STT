import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Invite from './pages/Invite';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Link to="/"></Link>
      <Link to="/invite"></Link>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/invite/:code" element={<Invite />}></Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;