import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import POSPage from "./pages/POSPage";

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/pos" element={<POSPage />} />
        </Routes>
      </div>
  )
}

export default App;
