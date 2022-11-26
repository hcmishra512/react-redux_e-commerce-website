import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CardDetails from "./components/CardDetails";
import Cards from "./components/Cards";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/cart/:id" element={<CardDetails />} />
        <Route path="/" element={<Cards />} />
      </Routes>
    </div>
  );
}

export default App;
