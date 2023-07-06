import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Login from "./pages/Login";
import MyTimeTable from "./pages/MyTimeTable";
import Signup from "./pages/Signup";
import Invite from './pages/Invite';
import CreateTeam from './pages/CreateTeam';
import ManageTeam from './pages/ManageTeam';
import Setting from './pages/Setting';
import Main from './pages/Main';
import { Provider } from 'react-redux';
import { store } from './service/redux/store.js';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Main />} ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/createteam" element={<CreateTeam />}></Route>
          <Route path="/manageteam" element={<ManageTeam />}></Route>
          <Route path="/invite/:code" element={<Invite />}></Route>
          <Route path="/mytimetable" element={<MyTimeTable />}></Route>
          <Route path="/setting" element={<Setting />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  );
}

export default App;