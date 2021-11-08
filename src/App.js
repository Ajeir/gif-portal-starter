import { useEffect, useState } from "react";
import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";

// Constants
const TWITTER_HANDLE = "AjeirC";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
//const TWITTER_HANDLE2 = "_buildspace";
// (Save for later connection ) > const TWITTER_LINK2 = `https://twitter.com/${TWITTER_HANDLE2}`;

//Test Gifs
const TEST_GIFS = [
  "https://media4.giphy.com/media/d0DdMCREQChi3jGymW/giphy.gif?cid=790b7611589dba79477b24e381616deac8572ce327bdbd64&rid=giphy.gif&ct=g",
  "https://media3.giphy.com/media/oBQZIgNobc7ewVWvCd/giphy.gif?cid=790b76118e8d082043b5fdf6641a4eeef567cac5763f0eb0&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/hgMS2c6Cd2XR8X7yrA/giphy.gif?cid=790b7611e439a4566ca2a3a934fe0ad94e0f9aaf0c6f2fb7&rid=giphy.gif&ct=g",
  "https://media4.giphy.com/media/UK6iCwlyhtCoygMot5/giphy.gif?cid=790b7611cb177ed6848f533411bc7805cb330956aac070aa&rid=giphy.gif&ct=g"

]

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
      console.log("Connected with Public Key:", response.publicKey.toString());
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
      Connect to wallet 👻
    </button>
  );

  const renderConnectedContainer = () => (
  <div className="connected-container">
    <div className="gif-grid">
      {TEST_GIFS.map(gif => (
        <div className="gif-item" key={gif}>
          <img src={gif} alt={gif} />
        </div>
      ))}
    </div>
  </div>
);
  /*
   * When the wallet function launches,
   * Checking to see if its connected
   */

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      {/* Added for some style stuff */}
      <div className="container">
        <div className="header-container">
          <p className="header">🚀💎 Crypto rabbit hole</p>
          <p className="sub-text">Lets take a look at crypto culture ✨</p>
          {!walletAddress && renderNotConnectedContainer()}
          {/* Render my wallet button*/}
          {walletAddress && renderConnectedContainer()}
          
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
