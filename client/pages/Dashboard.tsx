import { useState } from "react";

export default function Dashboard() {
  const [selectedRepo, setSelectedRepo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [showRepoSelector, setShowRepoSelector] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  const userEmail = localStorage.getItem("userEmail") || "user@example.com";

  // Mock repositories for demo
  const repositories = [
    {
      id: "stackseek-frontend",
      name: "StackSeek Frontend",
      owner: "YourOrg",
      branch: "main",
      language: "TypeScript",
      stars: 12,
      updated: "2 hours ago",
    },
    {
      id: "api-backend",
      name: "API Backend",
      owner: "YourOrg",
      branch: "develop",
      language: "Python",
      stars: 8,
      updated: "1 day ago",
    },
    {
      id: "mobile-app",
      name: "Mobile App",
      owner: "YourOrg",
      branch: "main",
      language: "React Native",
      stars: 5,
      updated: "3 days ago",
    },
    {
      id: "data-pipeline",
      name: "Data Pipeline",
      owner: "YourOrg",
      branch: "main",
      language: "Go",
      stars: 3,
      updated: "1 week ago",
    },
  ];

  const handleAnalyzeError = async () => {
    if (!selectedRepo) {
      alert("Please select a repository first");
      return;
    }
    if (!errorMessage.trim()) {
      alert("Please enter an error message or stack trace");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock analysis results based on the provided JSON structure
      const mockResults = {
        analysis: {
          root_cause_analysis: "The application attempts to open a PDF file using `fitz.open()` with a path to a file that does not exist on the file system. This directly triggers a `FileNotFoundError` because the code lacks a `try-except` block to gracefully handle scenarios where the input file is missing.",
          error_location: "/path/to/your/script.py, line 5 (within `extract_text_from_pdf` function)",
          execution_path: "The main script (indicated by `<module>`) makes a direct call to `extract_text_from_pdf('nonexistent_file.pdf')`. Inside `extract_text_from_pdf`, the `fitz.open()` function is invoked with this non-existent file path, which then propagates the `FileNotFoundError`.",
          replication_steps: [
            "Ensure that no file named `nonexistent_file.pdf` exists in the directory where the application's main script is executed.",
            "Modify the application's main script (e.g., `app.py`) to include a direct call to `extract_text_from_pdf(\"nonexistent_file.pdf\")` at a point in the code that gets executed (e.g., at the global scope, before `app.run()`). The provided stack trace suggests this call was on line 10.",
            "Run the modified Python script."
          ],
          suggested_fix: "Implement `try-except FileNotFoundError` blocks around file opening operations (e.g., `fitz.open()`, `DocxDocument()`, `document.LoadFromFile()`) in functions like `extract_text_from_pdf`, `extract_text_from_docx`, and `convert_doc_to_docx`. These blocks should catch the error and either return `None` or raise a more specific, handled exception to allow the calling functions (like `parse_resume_from_file`) to manage the missing file gracefully."
        },
        metrics: {
          llm_input_tokens: 3386,
          llm_output_tokens: 417,
          total_llm_tokens: 3803
        }
      };

      setAnalysisResults(mockResults);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigation = async (url: string) => {
    setIsLoading(true);
    // Simulate page loading
    await new Promise((resolve) => setTimeout(resolve, 800));
    window.location.href = url;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#f9fafb",
        display: "flex",
      }}
    >
      {/* Vertical Sidebar Navigation */}
      <div
        style={{
          width: sidebarMinimized ? "70px" : "280px",
          backgroundColor: "white",
          borderRight: "1px solid #e5e7eb",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease-in-out",
          position: "fixed",
          height: "100vh",
          zIndex: 100,
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!sidebarMinimized && (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
                alt="StackSeek Logo"
                style={{
                  height: "28px",
                  width: "auto",
                }}
              />
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                StackSeek
              </span>
            </div>
          )}

          <button
            onClick={() => setSidebarMinimized(!sidebarMinimized)}
            style={{
              padding: "8px",
              backgroundColor: "transparent",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#6b7280",
            }}
          >
            {sidebarMinimized ? "→" : "←"}
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: "1rem 0" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <a
              href="/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0.75rem 1.5rem",
                margin: "0 0.75rem",
                borderRadius: "6px",
                textDecoration: "none",
                backgroundColor: "#f3f4f6",
                color: "#8b5cf6",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <span style={{ fontSize: "18px" }}>⚠️</span>
              {!sidebarMinimized && "Error Analysis"}
            </a>

            <button
              onClick={() => handleNavigation("/connect-repository")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0.75rem 1.5rem",
                margin: "0 0.75rem",
                borderRadius: "6px",
                border: "none",
                background: "none",
                color: "#6b7280",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{ fontSize: "18px" }}>📁</span>
              {!sidebarMinimized && "Repositories"}
            </button>

            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0.75rem 1.5rem",
                margin: "0 0.75rem",
                borderRadius: "6px",
                textDecoration: "none",
                color: "#6b7280",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <span style={{ fontSize: "18px" }}>📊</span>
              {!sidebarMinimized && "Error History"}
            </a>

            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0.75rem 1.5rem",
                margin: "0 0.75rem",
                borderRadius: "6px",
                textDecoration: "none",
                color: "#6b7280",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <span style={{ fontSize: "18px" }}>📈</span>
              {!sidebarMinimized && "Analytics"}
            </a>

            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0.75rem 1.5rem",
                margin: "0 0.75rem",
                borderRadius: "6px",
                textDecoration: "none",
                color: "#6b7280",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <span style={{ fontSize: "18px" }}>⚙️</span>
              {!sidebarMinimized && "Settings"}
            </a>
          </div>
        </nav>

        {/* User Profile & Logout */}
        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          {!sidebarMinimized ? (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#8b5cf6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {userEmail}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: "pointer",
              }}
              title="Logout"
            >
              🚪
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginLeft: sidebarMinimized ? "70px" : "280px",
          transition: "margin-left 0.3s ease-in-out",
          minHeight: "100vh",
        }}
      >
        {/* Top Header */}
        <header
          style={{
            backgroundColor: "white",
            borderBottom: "1px solid #e5e7eb",
            padding: "1.5rem 2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: "1.75rem",
                  fontWeight: "700",
                  color: "#1f2937",
                  margin: 0,
                  marginBottom: "0.25rem",
                }}
              >
                Error Analysis Dashboard
              </h1>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                Transform errors into insights with AI-powered analysis
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div style={{ padding: "2rem" }}>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              alignItems: "flex-start",
              flexWrap: analysisResults ? "wrap" : "nowrap"
            }}
          >
            {/* Left Panel - Error Analysis */}
            <div
              style={{
                flex: analysisResults ? "0 0 400px" : 1,
                minWidth: "400px",
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "2rem",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Warning Icon and Title */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#fef3c7",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ⚠️
                </div>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    margin: 0,
                  }}
                >
                  Error Analysis
                </h2>
              </div>

              {/* Modern Repository Selector */}
              <div style={{ marginBottom: "2rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Select Repository
                </label>

                {repositories.length > 0 ? (
                  <div>
                    <button
                      onClick={() => setShowRepoSelector(!showRepoSelector)}
                      style={{
                        width: "100%",
                        padding: "1rem",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      <span
                        style={{ color: selectedRepo ? "#374151" : "#9ca3af" }}
                      >
                        {selectedRepo
                          ? repositories.find((r) => r.id === selectedRepo)
                              ?.name
                          : "Choose a repository..."}
                      </span>
                      <span
                        style={{
                          transform: showRepoSelector
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s",
                        }}
                      >
                        ▼
                      </span>
                    </button>

                    {showRepoSelector && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          backgroundColor: "white",
                          border: "1px solid #d1d5db",
                          borderTop: "none",
                          borderRadius: "0 0 8px 8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          zIndex: 50,
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                      >
                        {repositories.map((repo) => (
                          <button
                            key={repo.id}
                            onClick={() => {
                              setSelectedRepo(repo.id);
                              setShowRepoSelector(false);
                            }}
                            style={{
                              width: "100%",
                              padding: "1rem",
                              border: "none",
                              backgroundColor:
                                selectedRepo === repo.id ? "#f3f4f6" : "white",
                              textAlign: "left",
                              cursor: "pointer",
                              borderBottom: "1px solid #f3f4f6",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "0.5rem",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#374151",
                                }}
                              >
                                {repo.name}
                              </span>
                              <span
                                style={{ fontSize: "12px", color: "#6b7280" }}
                              >
                                ⭐ {repo.stars}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "1rem",
                                fontSize: "12px",
                                color: "#6b7280",
                              }}
                            >
                              <span>👤 {repo.owner}</span>
                              <span>🌿 {repo.branch}</span>
                              <span>💻 {repo.language}</span>
                              <span>📅 {repo.updated}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "1rem",
                      backgroundColor: "#fef3c7",
                      border: "1px solid #f59e0b",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "16px" }}>⚠️</span>
                    <span style={{ fontSize: "14px", color: "#92400e" }}>
                      Connect a repository to unlock AI-powered error analysis
                    </span>
                  </div>
                )}
              </div>

              {/* Error Message or Stack Trace */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Error Message or Stack Trace
                </label>
                <div
                  style={{
                    backgroundColor: "#1e1e1e",
                    border: "2px solid #374151",
                    borderRadius: "8px",
                    position: "relative",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  {/* Code Editor Header */}
                  <div
                    style={{
                      backgroundColor: "#2d2d2d",
                      borderBottom: "1px solid #404040",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: "6px 6px 0 0"
                    }}
                  >
                    <div style={{ display: "flex", gap: "6px" }}>
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#ef4444", borderRadius: "50%" }}></div>
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#f59e0b", borderRadius: "50%" }}></div>
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#10b981", borderRadius: "50%" }}></div>
                    </div>
                    <span style={{ color: "#9ca3af", fontSize: "12px", fontFamily: '"Fira Code", "JetBrains Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
                      error.log
                    </span>
                  </div>

                  <textarea
                    value={errorMessage}
                    onChange={(e) => setErrorMessage(e.target.value)}
                    placeholder="Paste your error message or stack trace here..."
                    style={{
                      width: "100%",
                      height: "140px",
                      padding: "16px",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#ef4444",
                      fontSize: "14px",
                      fontFamily: '"Fira Code", "JetBrains Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      resize: "vertical",
                      letterSpacing: "0.5px",
                      lineHeight: "1.6"
                    }}
                  />
                </div>
              </div>

              {/* Code Snippet (Optional) */}
              <div style={{ marginBottom: "2rem" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "0.75rem",
                  }}
                >
                  Code Snippet (Optional)
                </label>
                <div
                  style={{
                    backgroundColor: "#0d1117",
                    border: "2px solid #374151",
                    borderRadius: "8px",
                    position: "relative",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  {/* Code Editor Header */}
                  <div
                    style={{
                      backgroundColor: "#21262d",
                      borderBottom: "1px solid #30363d",
                      padding: "8px 12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: "6px 6px 0 0"
                    }}
                  >
                    <div style={{ display: "flex", gap: "6px" }}>
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#ef4444", borderRadius: "50%" }}></div>
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#f59e0b", borderRadius: "50%" }}></div>
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#10b981", borderRadius: "50%" }}></div>
                    </div>
                    <span style={{ color: "#8b949e", fontSize: "12px", fontFamily: '"Fira Code", "JetBrains Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
                      main.js
                    </span>
                  </div>

                  <textarea
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    placeholder="Paste the code that's causing the error..."
                    style={{
                      width: "100%",
                      height: "140px",
                      padding: "16px",
                      backgroundColor: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#c9d1d9",
                      fontSize: "14px",
                      fontFamily: '"Fira Code", "JetBrains Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      resize: "vertical",
                      letterSpacing: "0.5px",
                      lineHeight: "1.6"
                    }}
                  />
                </div>
              </div>

              {/* Analyze Error Button */}
              <button
                onClick={handleAnalyzeError}
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "0.75rem 1.5rem",
                  backgroundColor: isLoading ? "#9ca3af" : "#8b5cf6",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  transition: "background-color 0.2s"
                }}
              >
                {isLoading ? "🔄 Analyzing..." : "⚡ Analyze Error"}
              </button>
            </div>

            {/* Analysis Results Section */}
            {analysisResults && (
              <div
                style={{
                  flex: 1,
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "2rem",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                  marginLeft: "2rem",
                  maxHeight: "80vh",
                  overflowY: "auto"
                }}
              >
                {/* Results Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "2rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #e5e7eb"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#dcfce7",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      🤖
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: "#1f2937",
                          margin: 0,
                        }}
                      >
                        AI Analysis Results
                      </h2>
                      <p style={{ fontSize: "14px", color: "#6b7280", margin: "4px 0 0" }}>
                        Powered by advanced AI analysis
                      </p>
                    </div>
                  </div>

                  {/* Metrics Badge */}
                  <div
                    style={{
                      backgroundColor: "#f3f4f6",
                      borderRadius: "20px",
                      padding: "0.5rem 1rem",
                      fontSize: "12px",
                      color: "#6b7280",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                  >
                    <span>⚡</span>
                    {analysisResults.metrics.total_llm_tokens.toLocaleString()} tokens processed
                  </div>
                </div>

                {/* Root Cause Analysis */}
                <div style={{ marginBottom: "2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1rem"
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#fee2e2",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      🔍
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      Root Cause Analysis
                    </h3>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#fefefe",
                      border: "1px solid #e5e7eb",
                      borderLeft: "4px solid #ef4444",
                      borderRadius: "0 8px 8px 0",
                      padding: "1.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#374151",
                        margin: 0,
                      }}
                    >
                      {analysisResults.analysis.root_cause_analysis}
                    </p>
                  </div>
                </div>

                {/* Error Location */}
                <div style={{ marginBottom: "2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1rem"
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#374151",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: "#22c55e", fontSize: "12px" }}>$</span>
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      Error Location
                    </h3>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#000000",
                      border: "2px solid #374151",
                      borderRadius: "8px",
                      padding: "1.5rem",
                      fontFamily: '"Fira Code", "JetBrains Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      fontSize: "14px",
                      color: "#22c55e",
                      position: "relative",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "12px",
                        display: "flex",
                        gap: "6px"
                      }}
                    >
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#ef4444", borderRadius: "50%" }}></div>
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#f59e0b", borderRadius: "50%" }}></div>
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#10b981", borderRadius: "50%" }}></div>
                    </div>
                    <div style={{ marginTop: "24px", letterSpacing: "0.5px", lineHeight: "1.6" }}>
                      <span style={{ color: "#6b7280" }}>location:</span> <span style={{ color: "#f97316" }}>{analysisResults.analysis.error_location}</span>
                    </div>
                  </div>
                </div>

                {/* Execution Path */}
                <div style={{ marginBottom: "2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1rem"
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#374151",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: "#3b82f6", fontSize: "12px" }}>{">"}</span>
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      Execution Path
                    </h3>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#000000",
                      border: "2px solid #374151",
                      borderRadius: "8px",
                      padding: "1.5rem",
                      fontFamily: '"Fira Code", "JetBrains Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      fontSize: "14px",
                      color: "#e5e7eb",
                      position: "relative",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        left: "12px",
                        display: "flex",
                        gap: "6px"
                      }}
                    >
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#ef4444", borderRadius: "50%" }}></div>
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#f59e0b", borderRadius: "50%" }}></div>
                      <div style={{ width: "12px", height: "12px", backgroundColor: "#10b981", borderRadius: "50%" }}></div>
                    </div>
                    <div style={{ marginTop: "24px", letterSpacing: "0.5px", lineHeight: "1.6" }}>
                      <span style={{ color: "#6b7280" }}>trace:</span>{" "}
                      <span style={{ color: "#60a5fa" }}>{analysisResults.analysis.execution_path}</span>
                    </div>
                  </div>
                </div>

                {/* Replication Steps */}
                <div style={{ marginBottom: "2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1rem"
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#f3e8ff",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      🔄
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      Replication Steps
                    </h3>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#fafafa",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "1.5rem",
                    }}
                  >
                    <ol style={{ margin: 0, paddingLeft: "1.5rem" }}>
                      {analysisResults.analysis.replication_steps.map((step, index) => (
                        <li
                          key={index}
                          style={{
                            fontSize: "14px",
                            lineHeight: "1.6",
                            color: "#374151",
                            marginBottom: index < analysisResults.analysis.replication_steps.length - 1 ? "0.75rem" : 0,
                          }}
                        >
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Suggested Fix */}
                <div style={{ marginBottom: "2rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1rem"
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#dcfce7",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      ✅
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        color: "#1f2937",
                        margin: 0,
                      }}
                    >
                      Suggested Fix
                    </h3>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#f0fdf4",
                      border: "1px solid #10b981",
                      borderLeft: "4px solid #10b981",
                      borderRadius: "0 8px 8px 0",
                      padding: "1.5rem",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.6",
                        color: "#065f46",
                        margin: 0,
                      }}
                    >
                      {analysisResults.analysis.suggested_fix}
                    </p>
                  </div>
                </div>

                {/* Analysis Metrics */}
                <div
                  style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "1.5rem",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#374151",
                      margin: "0 0 1rem 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                  >
                    📊 Analysis Metrics
                  </h4>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: "#3b82f6",
                        }}
                      >
                        {analysisResults.metrics.llm_input_tokens.toLocaleString()}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        Input Tokens
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: "#10b981",
                        }}
                      >
                        {analysisResults.metrics.llm_output_tokens.toLocaleString()}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        Output Tokens
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color: "#8b5cf6",
                        }}
                      >
                        {analysisResults.metrics.total_llm_tokens.toLocaleString()}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        Total Tokens
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "2rem",
                    paddingTop: "1.5rem",
                    borderTop: "1px solid #e5e7eb"
                  }}
                >
                  <button
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: "#8b5cf6",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem"
                    }}
                  >
                    📋 Copy Analysis
                  </button>
                  <button
                    style={{
                      flex: 1,
                      padding: "0.75rem",
                      backgroundColor: "white",
                      color: "#374151",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem"
                    }}
                  >
                    💾 Save Report
                  </button>
                  <button
                    onClick={() => setAnalysisResults(null)}
                    style={{
                      padding: "0.75rem",
                      backgroundColor: "#f3f4f6",
                      color: "#6b7280",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* Right Panel - Helper Cards */}
            {!analysisResults && (
              <div
                style={{
                  width: "320px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
              {/* Ready to Get Started Card */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>🚀</span>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: 0,
                    }}
                  >
                    Ready to Get Started?
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "1rem",
                    lineHeight: "1.5",
                  }}
                >
                  Connect your repository to unlock advanced AI-driven error
                  analysis. Support for JavaScript, Python, Java, Go, and
                  DevOps.
                </p>

                <button
                  onClick={() => handleNavigation("/connect-repository")}
                  style={{
                    width: "100%",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#8b5cf6",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Connect Repository
                </button>
              </div>

              {/* Pro Tips Card */}
              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>💡</span>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      margin: 0,
                    }}
                  >
                    Pro Tips
                  </h3>
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginBottom: "1rem",
                    lineHeight: "1.4",
                  }}
                >
                  Maximize your analysis results with these expert
                  recommendations:
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#8b5cf6" }}>
                      ✓
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#4b5563",
                        lineHeight: "1.4",
                      }}
                    >
                      Include the complete error message with all details for
                      precise analysis
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#f59e0b" }}>
                      🎯
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#4b5563",
                        lineHeight: "1.4",
                      }}
                    >
                      Stack traces help pinpoint the exact error location
                      instantly
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#10b981" }}>
                      💬
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#4b5563",
                        lineHeight: "1.4",
                      }}
                    >
                      Share context about your goals for more targeted solutions
                    </span>
                  </div>
                </div>
              </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            {/* Static Logo */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
              alt="StackSeek Logo"
              style={{
                height: "48px",
                width: "auto",
              }}
            />

            {/* Circular Loading Spinner */}
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #f3f4f6",
                borderTop: "4px solid #8b5cf6",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />

            {/* Loading Text */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#374151",
                  margin: 0,
                }}
              >
                Loading...
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: 0,
                }}
              >
                Please wait while we process your request
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
