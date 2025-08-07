import { useState } from 'react';

export default function ConnectRepository() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [repoUrl, setRepoUrl] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
    setStep(2);
  };

  const handleConnect = () => {
    // Simulate connection process
    alert(`Connecting to ${selectedProvider}...`);
    // After successful connection, redirect to dashboard
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1000);
  };

  const handlePrivateRepoConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);

    // Simulate API call to connect private repository
    setTimeout(() => {
      // Store connection details (in real app, this would be handled securely on backend)
      localStorage.setItem('connectedRepo', JSON.stringify({
        url: repoUrl,
        type: 'private',
        connectedAt: new Date().toISOString()
      }));

      alert('Private repository connected successfully!');
      window.location.href = '/dashboard';
    }, 2000);
  };

  const handleSkip = () => {
    window.location.href = '/dashboard';
  };

  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';

  const providers = [
    {
      id: 'github',
      name: 'GitHub',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      description: 'Connect your GitHub repositories',
      color: '#24292e'
    },
    {
      id: 'gitlab',
      name: 'GitLab',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.16l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.16l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
        </svg>
      ),
      description: 'Connect your GitLab repositories',
      color: '#fc6d26'
    },
    {
      id: 'bitbucket',
      name: 'Bitbucket',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 00.77-.646l3.27-20.03a.768.768 0 00-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z"/>
        </svg>
      ),
      description: 'Connect your Bitbucket repositories',
      color: '#0052cc'
    },
    {
      id: 'azure',
      name: 'Azure DevOps',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 10.047l6.15-2.544.682 8.284L0 19.867v-9.82zM7.634 7.27L17.45 0v7.048l-4.567 12.709L7.634 7.27zM24 5.187v13.626l-6.83-.051 4.567-12.709L24 5.187z"/>
        </svg>
      ),
      description: 'Connect your Azure DevOps repositories',
      color: '#0078d4'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f9fafb'
    }}>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid #e5e5e5',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
            alt="StackSeek Logo"
            style={{
              height: '40px',
              width: 'auto'
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            Welcome, {userEmail}
          </span>
          <button
            onClick={handleSkip}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Skip for now
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {step === 1 && (
            <>
              {/* Welcome Section */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
              }}>

                <h1 style={{
                  fontSize: '1.75rem',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  color: '#1a1a1a'
                }}>
                  Connect Your Repository
                </h1>
                <p style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  marginBottom: '1rem',
                  lineHeight: '1.5',
                  maxWidth: '500px',
                  margin: '0 auto 1rem'
                }}>
                  Let's get started by connecting your code repository. StackSeek will analyze your code for errors and provide AI-powered insights.
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  color: '#8b5cf6',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  fontSize: '13px',
                  fontWeight: '500'
                }}>
                  ⚡ Multi-Provider Support
                </div>
              </div>

              {/* Two Column Layout */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem'
              }}>

                {/* Git Provider Column */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#1a1a1a',
                    textAlign: 'center'
                  }}>
                    Choose Your Git Provider
                  </h2>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    {providers.map((provider) => (
                      <button
                        key={provider.id}
                        onClick={() => handleProviderSelect(provider.id)}
                        style={{
                          padding: '1rem',
                          border: '2px solid #e5e7eb',
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          width: '100%'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = provider.color;
                          e.currentTarget.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.1)`;
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = '#e5e7eb';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f9fafb',
                          borderRadius: '8px',
                          color: provider.color
                        }}>
                          {provider.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            fontSize: '0.95rem',
                            fontWeight: '600',
                            color: '#1a1a1a',
                            marginBottom: '0.25rem'
                          }}>
                            {provider.name}
                          </h3>
                          <p style={{
                            fontSize: '0.8rem',
                            color: '#6b7280',
                            margin: 0
                          }}>
                            {provider.description}
                          </p>
                        </div>
                        <div style={{
                          fontSize: '1.25rem',
                          color: '#9ca3af'
                        }}>
                          →
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Private Repository Column */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}>
                  <h2 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#1a1a1a',
                    textAlign: 'center'
                  }}>
                    Private Repository
                  </h2>

                  <button
                    onClick={() => handleProviderSelect('private')}
                    style={{
                      padding: '1.5rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem',
                      width: '100%',
                      minHeight: '200px',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = '#6366f1';
                      e.currentTarget.style.boxShadow = `0 4px 12px rgba(99, 102, 241, 0.2)`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(99, 102, 241, 0.1)',
                      borderRadius: '50%',
                      color: '#6366f1'
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 10v2h3v-2c0-0.55 0.45-1 1-1s1 0.45 1 1v2h3v-2c0-1.657-1.343-3-3-3s-3 1.343-3 3zM5 10c0-2.761 2.239-5 5-5s5 2.239 5 5v2h1c1.103 0 2 0.897 2 2v8c0 1.103-0.897 2-2 2H4c-1.103 0-2-0.897-2-2v-8c0-1.103 0.897-2 2-2h1v-2z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#1a1a1a',
                        marginBottom: '0.5rem'
                      }}>
                        Connect with URL & Token
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        margin: 0,
                        lineHeight: '1.4'
                      }}>
                        Use repository URL and personal access token for private repositories
                      </p>
                    </div>
                    <div style={{
                      fontSize: '1.5rem',
                      color: '#6366f1'
                    }}>
                      →
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}

          {step === 2 && selectedProvider && selectedProvider !== 'private' && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '3rem 2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ←
              </button>

              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: providers.find(p => p.id === selectedProvider)?.color
              }}>
                <div style={{ transform: 'scale(2)' }}>
                  {providers.find(p => p.id === selectedProvider)?.icon}
                </div>
              </div>

              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#1a1a1a'
              }}>
                Connect to {providers.find(p => p.id === selectedProvider)?.name}
              </h2>

              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                marginBottom: '2rem',
                lineHeight: '1.6'
              }}>
                You'll be redirected to {providers.find(p => p.id === selectedProvider)?.name} to authorize StackSeek to access your repositories.
              </p>

              <div style={{
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '2rem',
                textAlign: 'left'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  What we'll access:
                </h3>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  fontSize: '0.9rem',
                  color: '#6b7280'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>✅ Read access to your repositories</li>
                  <li style={{ marginBottom: '0.5rem' }}>✅ Access to commit history and issues</li>
                  <li style={{ marginBottom: '0.5rem' }}>✅ Read repository metadata</li>
                  <li style={{ marginBottom: '0.5rem' }}>🚫 No write access or code changes</li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  onClick={handleConnect}
                  style={{
                    padding: '12px 32px',
                    backgroundColor: providers.find(p => p.id === selectedProvider)?.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Connect to {providers.find(p => p.id === selectedProvider)?.name}
                </button>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    padding: '12px 32px',
                    backgroundColor: 'white',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === 2 && selectedProvider === 'private' && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}>
              <button
                onClick={() => setStep(1)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ←
              </button>

              <div style={{ paddingTop: '1rem' }}>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    color: '#6366f1'
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 10v2h3v-2c0-0.55 0.45-1 1-1s1 0.45 1 1v2h3v-2c0-1.657-1.343-3-3-3s-3 1.343-3 3zM5 10c0-2.761 2.239-5 5-5s5 2.239 5 5v2h1c1.103 0 2 0.897 2 2v8c0 1.103-0.897 2-2 2H4c-1.103 0-2-0.897-2-2v-8c0-1.103 0.897-2 2-2h1v-2z"/>
                    </svg>
                  </div>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                    color: '#1a1a1a'
                  }}>
                    Connect Private Repository
                  </h2>
                  <p style={{
                    fontSize: '1rem',
                    color: '#6b7280',
                    lineHeight: '1.5'
                  }}>
                    Enter your repository URL and personal access token to connect your private repository.
                  </p>
                </div>

                <form onSubmit={handlePrivateRepoConnect}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Repository URL
                    </label>
                    <input
                      type="url"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      required
                      placeholder="https://github.com/username/repository.git"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginTop: '0.5rem'
                    }}>
                      HTTPS URL to your Git repository (GitHub, GitLab, Bitbucket, etc.)
                    </p>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Personal Access Token
                    </label>
                    <input
                      type="password"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      required
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#6366f1'}
                      onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                    />
                    <p style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      marginTop: '0.5rem'
                    }}>
                      Token with repository access permissions. <a href="#" style={{ color: '#6366f1', textDecoration: 'underline' }}>How to create a token?</a>
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: '#f3f4f6',
                    borderRadius: '8px',
                    padding: '1rem',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: '#374151',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      🔒 Security Notice
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      lineHeight: '1.4',
                      margin: 0
                    }}>
                      Your access token is encrypted and stored securely. We only use it to read your repository for analysis purposes.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                      type="submit"
                      disabled={isConnecting || !repoUrl || !accessToken}
                      style={{
                        padding: '12px 32px',
                        backgroundColor: (isConnecting || !repoUrl || !accessToken) ? '#9ca3af' : '#6366f1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        cursor: (isConnecting || !repoUrl || !accessToken) ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => {
                        if (!isConnecting && repoUrl && accessToken) {
                          e.target.style.backgroundColor = '#4f46e5';
                        }
                      }}
                      onMouseOut={(e) => {
                        if (!isConnecting && repoUrl && accessToken) {
                          e.target.style.backgroundColor = '#6366f1';
                        }
                      }}
                    >
                      {isConnecting ? 'Connecting...' : 'Connect Repository'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={isConnecting}
                      style={{
                        padding: '12px 32px',
                        backgroundColor: 'white',
                        color: '#6b7280',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '500',
                        cursor: isConnecting ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Back
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
