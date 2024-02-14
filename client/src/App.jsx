import { EthProvider } from "./contexts/EthContext";
import LandingPage from "./components/Home/LandingPage";
import { Routes,Route } from "react-router-dom";
function App() {
  return (
    <EthProvider>
      <div id="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<LandingPage/>}/>
        </Routes>         
      </div>
    </EthProvider>
  );
}

export default App;
