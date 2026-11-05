
import { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartCandlestick,
  Wallet,
  History,
  Search,
  Bell,
  ChevronDown,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  Eye,
  EyeOff,
  Menu,
  X,
  TrendingUp,
  Sparkles,
  CircleHelp,
  Settings,
  ShieldCheck,
  Zap
} from "lucide-react";

const navigation = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Swap", icon: ArrowLeftRight },
  { name: "Futures", icon: ChartCandlestick },
  { name: "Wallet", icon: Wallet },
  { name: "Activity", icon: History }
];

const assets = [
  {
    name: "Solana",
    symbol: "SOL",
    color: "#8b5cf6",
    price: "₦248,420.00",
    change: "+4.82%",
    balance: "0.8421",
    value: "₦209,196.28"
  },
  {
    name: "Bitcoin",
    symbol: "BTC",
    color: "#f59e0b",
    price: "₦158,420,000",
    change: "+2.14%",
    balance: "0.00042",
    value: "₦66,536.40"
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    color: "#64748b",
    price: "₦5,820,500",
    change: "-0.86%",
    balance: "0.021",
    value: "₦122,230.50"
  }
];

function Logo() {
  return (
    <div className="brand">
      <div className="brand-mark">K</div>
      <span>kimaex</span>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("Overview");
  const [hideBalance, setHideBalance] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("Beginner");

  function notify(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2600);
  }

  const money = hideBalance
    ? "••••••••"
    : "₦ 1,284,590.42";

  return (
    <div className="app-shell">

      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <Logo />
          <button
            className="icon-btn mobile-close"
            onClick={() => setMobileNav(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav>
          {navigation.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={`nav-item ${active === name ? "active" : ""}`}
              onClick={() => {
                setActive(name);
                setMobileNav(false);
              }}
            >
              <Icon size={18} />
              <span>{name}</span>

              {name === "Futures" && (
                <span className="nav-tag">PRO</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() => notify("Help center coming soon")}
          >
            <CircleHelp size={18} />
            <span>Help center</span>
          </button>

          <button
            className="nav-item"
            onClick={() => notify("Settings coming soon")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <div className="profile-card">
            <div className="avatar">JI</div>
            <div className="profile-text">
              <b>Jibrin Ibrahim</b>
              <small>Personal account</small>
            </div>
            <ChevronDown size={16} />
          </div>
        </div>
      </aside>

      {mobileNav && (
        <div
          className="overlay"
          onClick={() => setMobileNav(false)}
        />
      )}

      <main className="main">

        <header className="topbar">
          <button
            className="icon-btn menu-btn"
            onClick={() => setMobileNav(true)}
          >
            <Menu size={20} />
          </button>

          <div className="crumb">
            <span>Workspace</span>
            <span className="crumb-slash">/</span>
            <b>{active}</b>
          </div>

          <div className="topbar-right">
            <div className="search-box">
              <Search size={16} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assets..."
              />
            </div>

            <button
              className="icon-btn notification"
              onClick={() => notify("You're all caught up")}
            >
              <Bell size={18} />
            </button>

            <button
              className="network-pill"
              onClick={() => notify("Solana network selected")}
            >
              <span className="network-dot" />
              Solana
              <ChevronDown size={14} />
            </button>
          </div>
        </header>

        <div className="content">

          <div className="welcome-row">
            <div>
              <div className="eyebrow">
                KIMAEX DIGITAL ASSETS
              </div>

              <h1>
                {active === "Overview"
                  ? "Good morning, Jibrin"
                  : active}
              </h1>

              <p className="subtitle">
                {active === "Overview"
                  ? "Here's what's happening with your portfolio today."
                  : `Explore your ${active.toLowerCase()} on Kimaex.`}
              </p>
            </div>

            <button
              className="mode-toggle"
              onClick={() =>
                setMode(mode === "Beginner" ? "Pro" : "Beginner")
              }
            >
              <Sparkles size={15} />
              {mode} mode
              <ChevronDown size={14} />
            </button>
          </div>

          {active === "Overview" && (
            <>
              <section className="balance-card">

                <div className="balance-head">
                  <span>
                    Total portfolio value

                    <button
                      className="eye-btn"
                      onClick={() => setHideBalance(!hideBalance)}
                    >
                      {hideBalance
                        ? <Eye size={16} />
                        : <EyeOff size={16} />}
                    </button>
                  </span>

                  <span className="live-label">
                    <i /> DEMO PREVIEW
                  </span>
                </div>

                <div className="balance-value">
                  {money}
                  <span className="balance-currency">NGN</span>
                </div>

                <div className="balance-change">
                  <span>
                    <TrendingUp size={15} />
                    +₦42,805.16 (3.45%)
                  </span>
                  <span className="muted">Past 24 hours</span>
                </div>

                <div className="balance-actions">
                  <button
                    className="primary-btn"
                    onClick={() => setActive("Wallet")}
                  >
                    <Plus size={17} />
                    Add funds
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() => setActive("Wallet")}
                  >
                    <ArrowUpRight size={16} />
                    Withdraw
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() => setActive("Swap")}
                  >
                    <ArrowLeftRight size={16} />
                    Swap
                  </button>
                </div>

                <div className="balance-glow" />
              </section>

              <div className="section-heading">
                <div>
                  <h2>Assets</h2>
                  <p>Your crypto holdings at a glance</p>
                </div>

                <button
                  className="text-btn"
                  onClick={() => setActive("Wallet")}
                >
                  View all <ArrowUpRight size={14} />
                </button>
              </div>

              <section className="asset-table">
                <div className="table-head">
                  <span>Asset</span>
                  <span>Price</span>
                  <span>24h change</span>
                  <span>Balance</span>
                  <span />
                </div>

                {assets
                  .filter((asset) =>
                    `${asset.name} ${asset.symbol}`
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  )
                  .map((asset) => (
                    <div className="asset-row" key={asset.symbol}>

                      <div className="asset-name">
                        <div
                          className="coin"
                          style={{ background: asset.color }}
                        >
                          {asset.symbol.slice(0, 1)}
                        </div>

                        <div>
                          <b>{asset.name}</b>
                          <small>{asset.symbol}</small>
                        </div>
                      </div>

                      <span className="price">{asset.price}</span>

                      <span
                        className={
                          asset.change.startsWith("+")
                            ? "positive"
                            : "negative"
                        }
                      >
                        {asset.change}
                      </span>

                      <div className="asset-balance">
                        <b>
                          {hideBalance ? "••••" : asset.balance}
                          {" "}{asset.symbol}
                        </b>
                        <small>
                          {hideBalance ? "••••••" : asset.value}
                        </small>
                      </div>

                      <button
                        className="row-action"
                        onClick={() => setActive("Swap")}
                      >
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  ))}
              </section>

              <div className="bottom-grid">

                <section className="panel market-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Market overview</h2>
                      <p>Top assets by market activity</p>
                    </div>
                  </div>

                  <div className="market-list">
                    {assets.map((asset, index) => (
                      <div className="market-item" key={asset.symbol}>
                        <span className="market-rank">
                          0{index + 1}
                        </span>

                        <div
                          className="coin small-coin"
                          style={{ background: asset.color }}
                        >
                          {asset.symbol.slice(0, 1)}
                        </div>

                        <b>{asset.symbol}/NGN</b>

                        <span
                          className={
                            asset.change.startsWith("+")
                              ? "positive"
                              : "negative"
                          }
                        >
                          {asset.change}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="panel quick-panel">
                  <div className="panel-heading">
                    <div>
                      <h2>Quick actions</h2>
                      <p>Make your next move</p>
                    </div>

                    <Zap size={17} className="purple-icon" />
                  </div>

                  <button
                    className="quick-action"
                    onClick={() => setActive("Swap")}
                  >
                    <div className="quick-icon purple">
                      <ArrowLeftRight size={17} />
                    </div>

                    <div>
                      <b>Swap tokens</b>
                      <small>Trade across supported networks</small>
                    </div>

                    <ArrowUpRight size={15} />
                  </button>

                  <button
                    className="quick-action"
                    onClick={() => setActive("Futures")}
                  >
                    <div className="quick-icon blue">
                      <ChartCandlestick size={17} />
                    </div>

                    <div>
                      <b>Explore futures</b>
                      <small>Access advanced markets</small>
                    </div>

                    <ArrowUpRight size={15} />
                  </button>
                </section>

              </div>
            </>
          )}

          {active !== "Overview" && (
            <section className="feature-page">
              <div className="feature-icon">
                {active === "Swap" && <ArrowLeftRight size={26} />}
                {active === "Futures" && <ChartCandlestick size={26} />}
                {active === "Wallet" && <Wallet size={26} />}
                {active === "Activity" && <History size={26} />}
              </div>

              <h2>{active} on Kimaex</h2>

              <p>
                This is a frontend preview. Connect approved providers
                and secure backend services to enable real transactions.
              </p>

              {active === "Futures" && (
                <div className="mode-switch">
                  <button
                    className={mode === "Beginner" ? "selected" : ""}
                    onClick={() => setMode("Beginner")}
                  >
                    Beginner
                  </button>

                  <button
                    className={mode === "Pro" ? "selected" : ""}
                    onClick={() => setMode("Pro")}
                  >
                    Pro trader
                  </button>
                </div>
              )}

              <button
                className="primary-btn"
                onClick={() => notify(`${active} is currently a demo`)}
              >
                Continue <ArrowUpRight size={16} />
              </button>

              <button
                className="secondary-btn back-btn"
                onClick={() => setActive("Overview")}
              >
                Back to overview
              </button>
            </section>
          )}

          <footer>
            <span>© 2026 Kimaex Technologies</span>

            <span>
              <ShieldCheck size={13} />
              Secure by design · Demo environment
            </span>
          </footer>

        </div>
      </main>

      {toast && (
        <div className="toast">
          <span className="toast-check">✓</span>
          {toast}
        </div>
      )}

    </div>
  );
          }
                
