
import { useState } from "react";

const TOKENS = [
  {
    name: "NEAR",
    symbol: "NEAR",
    id: "wrap.near",
    decimals: 24,
  },
  {
    name: "USDC",
    symbol: "USDC",
    id: "usdc.near",
    decimals: 6,
  },
];

export default function RheaSwap() {
  const [tokenIn, setTokenIn] = useState(TOKENS[0]);
  const [tokenOut, setTokenOut] = useState(TOKENS[1]);
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Connect your NEAR wallet to start swapping."
  );

  function switchTokens() {
    setTokenIn(tokenOut);
    setTokenOut(tokenIn);
  }

  async function connectWallet() {
    setMessage(
      "Wallet connection needs to be configured with NEAR Wallet Selector."
    );
  }

  async function handleSwap() {
    if (!wallet) {
      setMessage("Please connect your NEAR wallet first.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setMessage("Enter a valid swap amount.");
      return;
    }

    setLoading(true);

    try {
      // Rhea SDK quote and transaction execution
      // must be configured with the connected wallet.
      setMessage(
        "Swap integration is not configured yet. No transaction was sent."
      );
    } catch (error) {
      setMessage(error.message || "Swap failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rhea-swap">
      <div className="rhea-header">
        <h2>Swap on NEAR</h2>
        <span className="rhea-badge">RHEA DEX</span>
      </div>

      <div className="rhea-token-box">
        <label>You pay</label>

        <input
          type="number"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={tokenIn.symbol}
          onChange={(e) =>
            setTokenIn(
              TOKENS.find((t) => t.symbol === e.target.value)
            )
          }
        >
          {TOKENS.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <button
        className="rhea-switch"
        onClick={switchTokens}
        aria-label="Switch tokens"
      >
        ⇅
      </button>

      <div className="rhea-token-box">
        <label>You receive</label>

        <div className="rhea-output">—</div>

        <select
          value={tokenOut.symbol}
          onChange={(e) =>
            setTokenOut(
              TOKENS.find((t) => t.symbol === e.target.value)
            )
          }
        >
          {TOKENS.map((token) => (
            <option key={token.symbol} value={token.symbol}>
              {token.symbol}
            </option>
          ))}
        </select>
      </div>

      <button
        className="rhea-connect"
        onClick={connectWallet}
      >
        {wallet || "Connect NEAR Wallet"}
      </button>

      <button
        className="rhea-submit"
        onClick={handleSwap}
        disabled={loading}
      >
        {loading ? "Processing..." : "Swap tokens"}
      </button>

      <p className="rhea-message">{message}</p>

      <p className="rhea-footer">
        Powered by Rhea Finance · NEAR Protocol
      </p>
    </div>
  );
    }
            
