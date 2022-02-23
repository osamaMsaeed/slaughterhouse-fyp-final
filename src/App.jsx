import { useState, useContext, useEffect } from "react";
import "./App.css";
import { ProductsContext } from "./context/ProductsContext";
import InputForm from "./components/InputForm";

function App() {
  const { connectWallet, currentAccount, productIDforQR } =
    useContext(ProductsContext);

  const downloadQR = () => {
    saveAs(
      `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${productIDforQR}`,
      `QR code (${productIDforQR}) .png`
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {!currentAccount ? (
            <button className="connect" type="button" onClick={connectWallet}>
              Connect to Wallet
            </button>
          ) : (
            <InputForm />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
