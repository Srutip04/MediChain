// import { EthProvider } from "./contexts/EthContext";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SupplyChain from "./contracts/SupplyChain.json";
import LandingPage from "./components/Home/LandingPage";
import Owner from "./entities/Owner/Owner";
import Manufacturer from "./entities/Manufacturer/Manufacturer";
import { Routes, Route } from "react-router-dom";

function App() {
  const [account, setAccount] = useState(null);
  const [supplyChain, setSupplyChain] = useState(null);
  // const [identicon, setIdenticon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
      setWeb3(window.web3);
    };

    loadWeb3();
  }, []);

  useEffect(() => {
    const loadBlockChain = async () => {
      if (web3) {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChain.networks[networkId];
        if (networkData) {
          const supplyChainInstance = new web3.eth.Contract(
            SupplyChain.abi,
            networkData.address
          );
          setSupplyChain(supplyChainInstance);
          setLoading(false);
          console.log(supplyChainInstance);
        } else {
          window.alert(
            "Supply chain contract not deployed to detected network."
          );
        }
      }
    };

    loadBlockChain();
  }, [web3]);

  return (
    // <EthProvider>
    loading ? (
      <div>Loding</div>
    ) : (
      <div id="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/owner"
            element={
              <Owner account={account} supplyChain={supplyChain} web3={web3} />
            }
          />
          <Route
            path="/manufacturer"
            element={
              <Manufacturer
                account={account}
                supplyChain={supplyChain}
                web3={web3}
              />
            }
          />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
    )
    // </EthProvider>
  );
}

export default App;
