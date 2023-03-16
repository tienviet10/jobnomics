import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from '@mui/icons-material';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/dnd" element={<DragNDrop />} />
          <Route path="/todo" element={<TodoPage />} /> */}
        </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
