import { useEffect, useState } from "react";
import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";

// Constants
const TWITTER_HANDLE = "AjeirC";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_HANDLE2 = "_buildspace";
const TWITTER_LINK2 = `https://twitter.com/${TWITTER_HANDLE2}`;

const App = () => {
  
    //state 
    const [walletAddress, setWalletAddress] = useState("null");
  
  
  
  /*
   * Function checks if the wallet is
   * connected or not
   */
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Cool, we've found your solana wallet!");
          /*
           * Function allows to directly connect
           * with user's wallet
           */
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            "Connected using Public key:",
            response.publicKey.toString()
            
          );
          
          setWalletAddress(response.publicKey.toString());

        }
      } else {
        alert(
          " We can't seem to find your solana wallet, Please download the Phantom wallet👻"
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // just some stuff to connect wallet
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  /*
   * render the UI when user hasn't connected
   * their wallet to the dapp.
   */
  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to wallet👻!
    </button>
  );

  /*
   * When the wallet function launches,
   * Checking to see if its connected
   */
  useEffect(() => {
    window.addEventListener("load", async (event) => {
      await checkIfWalletIsConnected();
    });
  }, []);

  return (
    <div className="App">
         {/* Added for some style stuff */}
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {/* Render my wallet button*/}
          {renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
