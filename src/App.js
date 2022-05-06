import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Navbar from "./Navbar/Navbar";
import Coindetail from "./Pages/Coindetail";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="coins/:id" element={<Coindetail />} />
      </Routes>
    </div>
  );
}

export default App;
