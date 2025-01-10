import "./App.css";
import { Route, Routes } from "react-router-dom";
import Books from "./screens/Books";
import { BookDetil } from "./screens/BookDetil";
import Header from "./components/Header";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [light, setLight] = useState(true);
  const toggleLight = () => setLight(!light);
  return (
    <div className={`${light ? "" : "dark"} dark:bg-zinc-900 `} >
      <ToastContainer position="top-right" autoClose={3000}/>
      <Header toggleLight={toggleLight} light={light} />
      <Routes>
        <Route path="/" element=<Books /> />
        <Route path="/:category" element=<Books /> />
        <Route path="/book/:id" element=<BookDetil /> />
      </Routes>
    </div>
  );
}

export default App;
