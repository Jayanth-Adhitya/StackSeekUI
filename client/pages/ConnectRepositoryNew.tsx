import { useState } from 'react'
import { ArrowLeft, Github, GitBranch, Key, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ConnectRepository() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [repoUrl, setRepoUrl] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  const providers = [
    {
      id: 'github',
      name: 'GitHub',
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      description: 'Connect your GitHub repositories',
      color: 'bg-gray-900 text-white',
      popular: true
    },
    {
      id: 'gitlab',
      name: 'GitLab',
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.918 1.263c-.135-.423-.73-.423-.867 0L1.387 9.452L.045 13.587a.424.424 0 0 0 .153.475L12 24l11.802-9.938a.424.424 0 0 0 .153-.475"/>
        </svg>
      ),
      description: 'Connect your GitLab repositories',
      color: 'bg-orange-500 text-white'
    },
    {
      id: 'bitbucket',
      name: 'Bitbucket',
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.499.515.868 1.022.873H19.95a.772.772 0 00.77-.646l3.27-20.03a.768.768 0 00-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z"/>
        </svg>
      ),
      description: 'Connect your Bitbucket repositories',
      color: 'bg-blue-600 text-white'
    },
    {
      id: 'azure',
      name: 'Azure DevOps',
      icon: () => (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
          <path d="M24 8.617L16.52.014 5.535 2.633v5.728L0 6.728l5.535 9.928v5.625L16.52 24 24 15.406v-6.79zM5.535 17.22V6.975L15.56 2.32v19.36L5.535 17.22z"/>
        </svg>
      ),
      description: 'Connect your Azure DevOps repositories',
      color: 'bg-blue-500 text-white'
    }
  ]

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider)
    setStep(2)
  }

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate connection process
    setTimeout(() => {
      // After successful connection, redirect to dashboard
      window.location.href = '/dashboard'
    }, 2000)
  }

  const handlePrivateRepoConnect = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsConnecting(true)

    // Simulate API call to connect private repository
    setTimeout(() => {
      // Store connection details (in real app, this would be handled securely on backend)
      localStorage.setItem('connectedRepo', JSON.stringify({
        provider: selectedProvider,
        url: repoUrl,
        hasToken: !!accessToken,
        connectedAt: new Date().toISOString()
      }))

      // Redirect to dashboard
      window.location.href = '/dashboard'
    }, 2000)
  }

  const handleSkip = () => {
    window.location.href = '/dashboard'
  }

  const handleBackToHome = () => {
    window.location.href = '/'
  }

  const handleBackToStep1 = () => {
    setStep(1)
    setSelectedProvider(null)
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleBackToHome}
              variant="ghost" 
              size="sm"
              className="transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
                alt="StackSeek Logo"
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold">StackSeek</span>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Connect Your Repository
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your Git provider to start analyzing errors in your codebase. 
              We support all major platforms with secure authentication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {providers.map((provider, index) => (
              <Card 
                key={provider.id}
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-2 duration-700"
                style={{ animationDelay: `${index * 100 + 200}ms` }}
                onClick={() => handleProviderSelect(provider.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${provider.color} transition-transform duration-300 hover:scale-110`}>
                      <provider.icon />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{provider.name}</h3>
                        {provider.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Most Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {provider.description}
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Secure OAuth integration</span>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Manual Upload Section */}
          <div className="max-w-2xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-1 duration-1000 delay-600">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Or upload manually</h3>
              <p className="text-sm text-muted-foreground">
                For custom Git servers or specific repository configurations
              </p>
            </div>

            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handlePrivateRepoConnect} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="manual-repo-url">Git Repository URL</Label>
                    <Input
                      id="manual-repo-url"
                      type="url"
                      placeholder="https://github.com/username/repository.git"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manual-access-token">
                      Personal Access Token
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Required for private repos
                      </Badge>
                    </Label>
                    <Input
                      id="manual-access-token"
                      type="password"
                      placeholder="Enter your personal access token"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                    />
                    <p className="text-xs text-muted-foreground">
                      Create a personal access token with 'repo' scope from your Git provider
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isConnecting || !repoUrl}
                    className="w-full transition-all duration-200 hover:scale-105"
                    variant="outline"
                  >
                    {isConnecting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Key className="mr-2 h-4 w-4" />
                        Connect Repository Manually
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8 animate-in fade-in slide-in-from-bottom-1 duration-1000 delay-700">
            <Alert className="max-w-2xl mx-auto mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Your repository credentials are encrypted and stored securely.
                We only access the minimum permissions needed for error analysis.
              </AlertDescription>
            </Alert>

            {/* Skip Button moved to bottom center */}
            <Button
              onClick={handleSkip}
              variant="ghost"
              className="transition-all duration-200 hover:scale-105"
            >
              Skip for now
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleBackToStep1}
            variant="ghost" 
            size="sm"
            className="transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Providers
          </Button>
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
              alt="StackSeek Logo"
              className="h-8 w-auto"
            />
            <span className="text-lg font-semibold">StackSeek</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSkip}
            variant="outline"
            size="sm"
            className="transition-all duration-200 hover:scale-105"
          >
            Skip for now
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-2xl">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">
            Connect to {providers.find(p => p.id === selectedProvider)?.name}
          </h1>
          <p className="text-muted-foreground">
            Choose how you'd like to connect your repository
          </p>
        </div>

        <Card className="animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200">
          <CardContent className="p-6">
            <Tabs defaultValue="oauth" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="oauth">OAuth (Recommended)</TabsTrigger>
                <TabsTrigger value="manual">Manual Setup</TabsTrigger>
              </TabsList>
              
              <TabsContent value="oauth" className="space-y-6 mt-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    {(() => {
                      const provider = providers.find(p => p.id === selectedProvider)
                      if (provider?.icon) {
                        const Icon = provider.icon
                        return <Icon className="h-8 w-8 text-primary" />
                      }
                      return null
                    })()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Quick & Secure Connection</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Authorize StackSeek to access your repositories with one click. 
                      We'll only request the minimum permissions needed.
                    </p>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Secure:</strong> We use industry-standard OAuth 2.0 authentication. 
                    Your credentials are never stored on our servers.
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="w-full transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  {isConnecting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Connect with {providers.find(p => p.id === selectedProvider)?.name}
                    </>
                  )}
                </Button>
              </TabsContent>
              
              <TabsContent value="manual" className="space-y-6 mt-6">
                <div className="text-center space-y-4">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
                    <Key className="h-8 w-8 text-warning" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Manual Repository Setup</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      For advanced users or private repositories that require specific access tokens.
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePrivateRepoConnect} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="repo-url">Repository URL</Label>
                    <Input
                      id="repo-url"
                      type="url"
                      placeholder="https://github.com/username/repository"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="access-token">
                      Access Token
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Optional
                      </Badge>
                    </Label>
                    <Input
                      id="access-token"
                      type="password"
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      className="transition-all duration-200 hover:border-primary/50 focus:border-primary"
                    />
                    <p className="text-xs text-muted-foreground">
                      Required for private repositories. Create a personal access token with 'repo' scope.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isConnecting}
                    className="w-full transition-all duration-200 hover:scale-105"
                    size="lg"
                  >
                    {isConnecting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        Connecting Repository...
                      </>
                    ) : (
                      'Connect Repository'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Loading Overlay */}
      {isConnecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="w-96">
            <CardContent className="flex flex-col items-center gap-4 p-8">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
                alt="StackSeek Logo"
                className="h-12 w-auto"
              />
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <div className="text-center">
                <h3 className="font-semibold">Connecting Repository...</h3>
                <p className="text-sm text-muted-foreground">
                  Setting up secure access to your codebase
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
