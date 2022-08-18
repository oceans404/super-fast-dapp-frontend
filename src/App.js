import { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { ethers } from "ethers";
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "./App.css";
import contract from "./contracts/NumberBox.json";

// Steph's NumberBox contract on Polygon Mumbai -- update to yours!
const contractAddress = "0x07411A6297d15f25858081adCbF640665E8D0Fef";
const scannerAddress = `https://mumbai.polygonscan.com/address/${contractAddress}`;
const abi = contract.abi;

function App() {
  const { chains, provider } = configureChains(
    [
      chain.polygonMumbai,
      chain.polygon,
      chain.mainnet,
      chain.optimism,
      chain.arbitrum,
    ],
    [
      alchemyProvider({ alchemyId: process.env.REACT_APP_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const [numberBox, setNumberBox] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    fetchNumber();
  }, []);

  async function fetchNumber() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const data = await contract.read();
        console.log("data: ", data.toNumber());
        setNumberBox(data.toString());
      } catch (err) {
        console.log("Error: ", err);
      }
      setIsUpdating(false);
    }
  }

  async function setNumber(newNum) {
    if (!numberBox) return;
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const transaction = await contract.update(parseInt(newNum));
      setIsUpdating(true);
      await transaction.wait();
      fetchNumber();
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("numberBox:", numberBox);
    setNumber(numberBox);
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div>
          <Box component="nav">
            <AppBar component="nav">
              <Container
                maxWidth="lg"
                sx={{
                  padding: "15px 0",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
                <p style={{ margin: "10px 0 0", fontSize: "30px" }}>
                  NumberBox
                </p>
                <ConnectButton />
              </Container>
            </AppBar>
          </Box>
          <Box component="main" sx={{ marginTop: "100px" }}>
            <Container maxWidth="lg">
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", padding: "20px 0" }}
              >
                <div>
                  <TextField
                    id="name"
                    type="number"
                    value={numberBox}
                    onChange={(e) => setNumberBox(e.target.value)}
                    label="Number"
                    variant="standard"
                    disabled={isUpdating}
                  />
                </div>
                <Button variant="outlined" type="submit" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Submit"}
                </Button>
              </form>
              <a target="_blank" rel="noreferrer" href={scannerAddress}>
                View smart contract on polyscan
              </a>
            </Container>
          </Box>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
