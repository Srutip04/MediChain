import { EthProvider } from "./contexts/EthContext";
import LandingPage from "./components/Home/LandingPage";

function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
         <LandingPage/>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
