
import { useEffect, useState } from "react";
import "./HyperliquidPanel.css";

const ENDPOINTS = {
  testnet: "https://api.hyperliquid-testnet.xyz",
  mainnet: "https://api.hyperliquid.xyz",
};

export default function HyperliquidPanel() {
  const [network, setNetwork] = useState("testnet");
  const [markets, setMarkets] = useState([]);
  const [selected, setSelected] = useState("BTC");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMarkets() {
    setLoading(true);
    setError("");

    try {
      const endpoint = ENDPOINTS[network];

      const [metaResponse, midsResponse] = await Promise.all([
        fetch(`${endpoint}/info`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "meta" }),
        }),
        fetch(`${endpoint}/info`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "allMids" }),
        }),
      ]);

      if (!metaResponse.ok || !midsResponse.ok) {
        throw new Error("Unable to retrieve market data");
      }

      const meta = await metaResponse.json();
      const mids = await midsResponse.json();

      const results = meta.universe
        .filter((asset) => mids[asset.name])
        .map((asset) => ({
          name: asset.name,
          price: mids[asset.name],
          maxLeverage: asset.maxLeverage,
        }));

      setMarkets(results);

      if (!results.some((item) => item.name === selected)) {
        setSelected(results[0]?.name || "");
      }
    } catch (err) {
      setError(err.message || "Market data unavailable");
      setMarkets([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMarkets();

    const timer = setInterval(loadMarkets, 15000);

    return () => clearInterval(timer);
  }, [network]);

  const activeMarket = markets.find(
    (item) => item.name === selected
  );

  return (
    <div className="hyper-panel">
      <div className="hyper-heading">
        <div>
          <span className="hyper-label">KIMAEX FUTURES</span>
          <h2>Perpetual Markets</h2>
          <p>Powered by Hyperliquid</p>
        </div>

        <span className="hyper-live">
          <i /> LIVE DATA
        </span>
      </div>

      <div className="hyper-network">
        <button
          className={network === "testnet" ? "chosen" : ""}
          onClick={() => setNetwork("testnet")}
        >
          Testnet
        </button>

        <button
          className={network === "mainnet" ? "chosen" : ""}
          onClick={() => setNetwork("mainnet")}
        >
          Mainnet
        </button>
      </div>

      {loading && <p>Loading markets...</p>}

      {error && (
        <div className="hyper-error">
          {error}
          <button onClick={loadMarkets}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="hyper-selected">
            <label>Selected market</label>

            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {markets.map((market) => (
                <option key={market.name} value={market.name}>
                  {market.name}-PERP
                </option>
              ))}
            </select>

            <h1>
              {activeMarket
                ? Number(activeMarket.price).toLocaleString(
                    "en-US",
                    { maximumFractionDigits: 8 }
                  )
                : "--"}
              <small> USDC</small>
            </h1>

            <p>Hyperliquid mid-market price</p>
          </div>

          <div className="hyper-market-list">
            <h3>Available perpetual markets</h3>

            {markets.slice(0, 15).map((market) => (
              <button
                key={market.name}
                className="hyper-market-row"
                onClick={() => setSelected(market.name)}
              >
                <b>{market.name}-PERP</b>

                <span>
                  {Number(market.price).toLocaleString(
                    "en-US",
                    { maximumFractionDigits: 6 }
                  )}
                </span>

                <small>
                  Up to {market.maxLeverage}x
                </small>
              </button>
            ))}
          </div>

          <div className="hyper-notice">
            Market data only. Trading requires wallet connection,
            user authorization, margin funding and signed orders.
          </div>
        </>
      )}
    </div>
  );
          }
      
