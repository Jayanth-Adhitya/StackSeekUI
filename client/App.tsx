import { useState } from "react";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/DashboardNew";
import ConnectRepository from "@/pages/ConnectRepository";
import ForgotPassword from "@/pages/ForgotPassword";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const handleSignIn = () => {
    onNavigate("login");
  };

  const handleGetStarted = () => {
    onNavigate("register");
  };

  const handleStartAnalyzing = () => {
    onNavigate("register");
  };

  // Navigation test helper
  const [showTestNav, setShowTestNav] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#ffffff",
        color: "#1a1a1a",
      }}
    >
      {/* Navigation Test Panel */}
      {showTestNav && (
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "white",
            borderRadius: "8px",
            padding: "1rem",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            minWidth: "200px"
          }}
        >
          <h4 style={{ margin: "0 0 0.5rem 0", fontSize: "14px" }}>🧪 Test Navigation</h4>
          <button onClick={() => onNavigate("login")} style={{ padding: "0.5rem", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
            Login Page
          </button>
          <button onClick={() => onNavigate("register")} style={{ padding: "0.5rem", backgroundColor: "#10b981", color: "white", border: "none", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
            Register Page
          </button>
          <button onClick={() => onNavigate("forgot-password")} style={{ padding: "0.5rem", backgroundColor: "#f59e0b", color: "white", border: "none", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
            Forgot Password
          </button>
          <button onClick={() => onNavigate("connect-repository")} style={{ padding: "0.5rem", backgroundColor: "#8b5cf6", color: "white", border: "none", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
            Connect Repository
          </button>
          <button onClick={() => onNavigate("dashboard")} style={{ padding: "0.5rem", backgroundColor: "#ef4444", color: "white", border: "none", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
            Dashboard
          </button>
          <button onClick={() => onNavigate("home")} style={{ padding: "0.5rem", backgroundColor: "#6b7280", color: "white", border: "none", borderRadius: "4px", fontSize: "12px", cursor: "pointer" }}>
            Home/Landing
          </button>
          <button onClick={() => setShowTestNav(false)} style={{ padding: "0.5rem", backgroundColor: "#374151", color: "white", border: "none", borderRadius: "4px", fontSize: "12px", cursor: "pointer", marginTop: "0.5rem" }}>
            ✕ Close
          </button>
        </div>
      )}

      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #e5e5e5",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
            alt="StackSeek Logo"
            style={{
              height: "48px",
              width: "auto",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setShowTestNav(!showTestNav)}
            style={{
              padding: "6px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "500",
              color: "#6b7280",
              backgroundColor: "transparent",
              border: "1px solid #e5e7eb",
              cursor: "pointer",
              transition: "background-color 0.2s",
              marginRight: "8px"
            }}
            title="Test Navigation - Click to access all pages"
          >
            🧪 Nav
          </button>
          <button
            onClick={handleSignIn}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#1a1a1a",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Sign In
          </button>
          <button
            onClick={handleGetStarted}
            style={{
              padding: "8px 16px",
              backgroundColor: "#8b5cf6",
              color: "white",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "500",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#7c3aed")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#8b5cf6")}
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        style={{
          padding: "5rem 2rem",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            color: "#8b5cf6",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "500",
            marginBottom: "2rem",
          }}
        >
          <span>⚡</span>
          Now with Multi-Provider Integration
        </div>

        <h1
          style={{
            fontSize: "clamp(3rem, 6vw, 4rem)",
            fontWeight: "bold",
            marginBottom: "1.5rem",
            lineHeight: "1.1",
            letterSpacing: "-0.025em",
          }}
        >
          Error Analysis
          <br />
          <span
            style={{
              background: "linear-gradient(to right, #8b5cf6, #7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Made Simple
          </span>
        </h1>

        <p
          style={{
            fontSize: "20px",
            color: "#6b7280",
            marginBottom: "2.5rem",
            maxWidth: "768px",
            margin: "0 auto 2.5rem",
            lineHeight: "1.6",
          }}
        >
          Analyze, track, and resolve errors across your repositories with
          AI-powered insights. Connect GitHub, GitLab, Bitbucket, and Azure
          DevOps for intelligent error analysis.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "4rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleStartAnalyzing}
            style={{
              padding: "12px 32px",
              backgroundColor: "#8b5cf6",
              color: "white",
              borderRadius: "6px",
              fontWeight: "500",
              fontSize: "18px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#7c3aed";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#8b5cf6";
              e.target.style.transform = "translateY(0px)";
            }}
          >
            Start Analyzing Errors
            <span>→</span>
          </button>
          <button
            onClick={handleSignIn}
            style={{
              padding: "12px 32px",
              border: "1px solid #d1d5db",
              color: "#1a1a1a",
              borderRadius: "6px",
              fontWeight: "500",
              fontSize: "18px",
              backgroundColor: "white",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#f9fafb";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "white";
              e.target.style.transform = "translateY(0px)";
            }}
          >
            Sign In
          </button>
        </div>

        {/* Demo Dashboard */}
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#ffffff",
            }}
          >
            <div
              style={{
                aspectRatio: "16/9",
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(124, 58, 237, 0.05))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1.5rem",
                    fontSize: "32px",
                  }}
                >
                  📊
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  Interactive Dashboard
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                  }}
                >
                  Real-time error analysis and insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        style={{
          backgroundColor: "#f9fafb",
          padding: "5rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 2.5rem)",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              Everything you need for error analysis
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "#6b7280",
                maxWidth: "512px",
                margin: "0 auto",
              }}
            >
              Comprehensive tools and integrations to streamline your error
              debugging workflow
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                icon: "🔗",
                title: "Multi-Provider Integration",
                desc: "Connect repositories from GitHub, GitLab, Bitbucket, and Azure DevOps with comprehensive authentication.",
              },
              {
                icon: "🤖",
                title: "AI-Powered Analysis",
                desc: "Advanced error pattern recognition with intelligent suggestions for quick resolution and debugging.",
              },
              {
                icon: "🛡️",
                title: "Enterprise Security",
                desc: "Bank-grade security with encrypted credential storage and secure authentication protocols.",
              },
              {
                icon: "📊",
                title: "Real-time Dashboard",
                desc: "Monitor error trends, track resolution progress, and visualize repository health metrics.",
              },
              {
                icon: "🔑",
                title: "Flexible Authentication",
                desc: "Support for tokens, SSH keys, deploy keys, and OAuth for seamless repository access.",
              },
              {
                icon: "⚡",
                title: "Lightning Fast",
                desc: "Built on modern architecture with .NET backend for maximum performance and reliability.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #e5e5e5",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "rgba(139, 92, 246, 0.1)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    fontSize: "24px",
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "8px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    lineHeight: "1.6",
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: "linear-gradient(to right, #8b5cf6, #7c3aed)",
          color: "white",
          padding: "5rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 2.5rem)",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              letterSpacing: "-0.025em",
            }}
          >
            Ready to streamline your error analysis?
          </h2>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "2.5rem",
              opacity: 0.9,
              maxWidth: "512px",
              margin: "0 auto 2.5rem",
              lineHeight: "1.6",
            }}
          >
            Join thousands of developers who are already saving hours every week
            with intelligent error insights
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleGetStarted}
              style={{
                padding: "12px 32px",
                backgroundColor: "white",
                color: "#8b5cf6",
                borderRadius: "6px",
                fontWeight: "500",
                fontSize: "18px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#f3f4f6";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.transform = "translateY(0px)";
              }}
            >
              Get Started for Free
              <span>→</span>
            </button>
            <button
              onClick={handleSignIn}
              style={{
                padding: "12px 32px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                borderRadius: "6px",
                fontWeight: "500",
                fontSize: "18px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "translateY(0px)";
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #e5e5e5",
          backgroundColor: "#f9fafb",
          padding: "3rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "1.5rem",
            }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
              alt="StackSeek Logo"
              style={{
                height: "48px",
                width: "auto",
              }}
            />
          </div>
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            © 2024 StackSeek. Built with modern technologies for modern
            developers.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Simple URL-based routing
    const path = window.location.pathname;
    console.log("Current path:", path);
    if (path === "/login") return "login";
    if (path === "/register") return "register";
    if (path === "/dashboard") return "dashboard";
    if (path === "/connect-repository") return "connect-repository";
    if (path === "/forgot-password") return "forgot-password";
    return "home";
  });

  console.log("Current page state:", currentPage);

  const handleNavigate = (page: string) => {
    console.log("Navigating to page:", page);
    setCurrentPage(page);
    window.history.pushState({}, "", page === "home" ? "/" : `/${page}`);
    console.log("Navigation complete, current page:", page);
  };

  // Handle browser back/forward
  window.onpopstate = () => {
    const path = window.location.pathname;
    if (path === "/login") setCurrentPage("login");
    else if (path === "/register") setCurrentPage("register");
    else if (path === "/dashboard") setCurrentPage("dashboard");
    else if (path === "/connect-repository")
      setCurrentPage("connect-repository");
    else if (path === "/forgot-password") setCurrentPage("forgot-password");
    else setCurrentPage("home");
  };

  if (currentPage === "login") {
    return <Login />;
  }

  if (currentPage === "register") {
    return <Register />;
  }

  if (currentPage === "dashboard") {
    return <Dashboard />;
  }

  if (currentPage === "connect-repository") {
    return <ConnectRepository />;
  }

  if (currentPage === "forgot-password") {
    return <ForgotPassword />;
  }

  return <LandingPage onNavigate={handleNavigate} />;
}

export default App;
