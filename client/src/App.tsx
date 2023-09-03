import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Home, Register, Login, Conversation } from './pages/index';
import EventForm from "./components/createEvent/EventForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/chat" element={<Conversation/>}/>
          <Route path="/new" element={<EventForm/>}/>
        </Routes>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;
