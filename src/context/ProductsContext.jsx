import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { v1 as uuidv1 } from "uuid";

import { contractABI, contractAddress } from "../utils/constants";

export const ProductsContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const productsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return productsContract;
};

export const ProductsProvider = ({ children }) => {
  const [currentAccount, setcurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productIDforQR, setProductIDforQR] = useState("");

  const getAllProducts = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const productsContract = getEthereumContract();
      const availableProducts = await productsContract.getAllProducts();

      console.log(availableProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductById = async (id) => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const productsContract = getEthereumContract();
      const prod = await productsContract.getProductById(id);

      const structuredProduct = {
        id: prod.id,
        category: prod.category,
        halal: prod.halal,
        slaughterhouseName: prod.slaughterhouseName,
        slaughterhouseLocation: prod.slaughterhouseLocation,
        timestamp: new Date(prod.timestamp.toNumber() * 1000).toLocaleString(),
        useWithinDays: parseInt(prod.useWithinDays),
        batchNo: parseInt(prod.batchNo._hex),
      };

      //console.log(structuredProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setcurrentAccount(accounts[0]);
        //getAllProducts();
        getProductById(
          "0x7a7251531a1de49419d53eb59e09824685df73586bf40f325fa3fcc3008481b8"
        );
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setcurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async (data) => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const {
        category,
        halal,
        slaughterhouseName,
        slaughterhouseLocation,
        batchNo,
        useWithinDays,
      } = data;

      const productId = uuidv1();

      const productsContract = getEthereumContract();

      const productHash = await productsContract.addToBlockchain(
        productId,
        category,
        halal,
        slaughterhouseName,
        slaughterhouseLocation,
        useWithinDays,
        batchNo
      );

      setIsLoading(true);
      console.log(`Loading - ${productHash.hash}`);

      await productHash.wait();

      setIsLoading(false);
      console.log(`Success - ${productHash.hash}`);
      console.log(`product id: ${productId}`);
      setProductIDforQR(productId);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        productIDforQR,
        isLoading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
