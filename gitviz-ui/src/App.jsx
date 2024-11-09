import "./App.css";
import Home from "./pages/Home";
import GraphPreview from "./pages/GraphPreview";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { createContext, useState } from "react";

export const GraphContext = createContext(null);

function App() {

  const [graph, setGraph] = useState(null);

  return (
    <GraphContext.Provider value={{graph, setGraph}}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view" element={<GraphPreview />} />
      </Routes>
    </BrowserRouter>  
    </GraphContext.Provider>
    
  );
}

export default App;
