import { useState, useEffect } from "react"
import {
  AlertTriangle,
  GitBranch,
  BarChart3,
  Settings,
  History,
  Copy,
  Save,
  X,
  Terminal,
  Folder,
  Star,
  Users,
  Calendar,
  Code
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserProfile } from "@/components/user-profile"

export default function Dashboard() {
  const [selectedRepo, setSelectedRepo] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [codeSnippet, setCodeSnippet] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)


  // Load repositories from backend API
  const [repositories, setRepositories] = useState([])
  const [isLoadingRepositories, setIsLoadingRepositories] = useState(true)

  // Fetch repositories on component mount
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setIsLoadingRepositories(true)
        const response = await fetch('/api/repositories', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setRepositories(data.repositories || [])
        } else {
          console.error('Failed to fetch repositories:', response.status)
          setRepositories([])
        }
      } catch (error) {
        console.error('Error fetching repositories:', error)
        setRepositories([])
      } finally {
        setIsLoadingRepositories(false)
      }
    }

    fetchRepositories()
  }, [])

  const handleAnalyzeError = async () => {
    if (!selectedRepo) {
      alert("Please select a repository first")
      return
    }
    if (!errorMessage.trim()) {
      alert("Please enter an error message or stack trace")
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock analysis results
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
      }

      setAnalysisResults(mockResults)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNavigation = async (url: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    window.location.href = url
  }

  const menuItems = [
    {
      icon: AlertTriangle,
      label: "Error Analysis",
      href: "/dashboard",
      isActive: true,
    },
    {
      icon: Folder,
      label: "Repositories",
      href: "/connect-repository",
      onClick: () => handleNavigation("/connect-repository"),
    },
    {
      icon: History,
      label: "Error History",
      href: "#",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "#",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "#",
    },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center gap-3">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
                alt="StackSeek Logo"
                className="h-8 w-auto transition-all group-data-[collapsible=icon]:hidden"
              />
              <span className="text-lg font-semibold transition-all group-data-[collapsible=icon]:hidden">
                StackSeek
              </span>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="transition-all duration-200 hover:scale-105"
                  >
                    <a 
                      href={item.href}
                      onClick={item.onClick}
                      className="flex items-center gap-3"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

        </Sidebar>

        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger className="transition-all duration-200 hover:scale-110" />
            <Separator orientation="vertical" className="h-6" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Error Analysis Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Transform errors into insights with AI-powered analysis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <UserProfile />
              <ThemeToggle />
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <div className={`grid gap-6 ${analysisResults ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
              {/* Left Panel - Error Analysis */}
              <div className="space-y-6">
                <Card className="transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                      </div>
                      <div>
                        <CardTitle>Error Analysis</CardTitle>
                        <CardDescription>
                          Analyze your error messages and stack traces
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Repository Selector */}
                    <div className="space-y-2">
                      <Label htmlFor="repository">Select Repository</Label>
                      {repositories.length > 0 ? (
                        <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                          <SelectTrigger className="transition-all duration-200 hover:border-primary/50">
                            <SelectValue placeholder="Choose a repository..." />
                          </SelectTrigger>
                          <SelectContent>
                            {repositories.map((repo) => (
                              <SelectItem key={repo.id} value={repo.id}>
                                <div className="flex items-center gap-3 py-1">
                                  <div className="flex-1">
                                    <div className="font-medium">{repo.name}</div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        {repo.owner}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <GitBranch className="h-3 w-3" />
                                        {repo.branch}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Code className="h-3 w-3" />
                                        {repo.language}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Star className="h-3 w-3" />
                                        {repo.stars}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {repo.updated}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Card className="border-warning bg-warning/5">
                          <CardContent className="flex items-center gap-2 p-4">
                            <AlertTriangle className="h-4 w-4 text-warning" />
                            <span className="text-sm text-warning-foreground">
                              Connect a repository to unlock AI-powered error analysis
                            </span>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Error Message */}
                    <div className="space-y-2">
                      <Label htmlFor="error-message">Error Message or Stack Trace</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <Terminal className="h-3 w-3" />
                          <span>error.log</span>
                        </div>
                        <Textarea
                          id="error-message"
                          value={errorMessage}
                          onChange={(e) => setErrorMessage(e.target.value)}
                          placeholder="Paste your error message or stack trace here..."
                          className="min-h-32 pt-8 font-mono text-sm bg-black dark:bg-gray-950 text-red-400 border-2 border-gray-600 transition-all duration-200 hover:border-primary/50 focus:border-primary resize-none"
                        />
                      </div>
                    </div>

                    {/* Code Snippet */}
                    <div className="space-y-2">
                      <Label htmlFor="code-snippet">Code Snippet (Optional)</Label>
                      <div className="relative">
                        <div className="absolute left-3 top-3 flex items-center gap-2 text-xs text-muted-foreground">
                          <Terminal className="h-3 w-3" />
                          <span>main.js</span>
                        </div>
                        <Textarea
                          id="code-snippet"
                          value={codeSnippet}
                          onChange={(e) => setCodeSnippet(e.target.value)}
                          placeholder="Paste the code that's causing the error..."
                          className="min-h-32 pt-8 font-mono text-sm bg-gray-900 dark:bg-black text-gray-100 border-2 border-gray-600 transition-all duration-200 hover:border-primary/50 focus:border-primary resize-none"
                        />
                      </div>
                    </div>

                    {/* Analyze Button */}
                    <Button
                      onClick={handleAnalyzeError}
                      disabled={isLoading}
                      className="w-full transition-all duration-200 hover:scale-105"
                      size="lg"
                    >
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Terminal className="mr-2 h-4 w-4" />
                          Analyze Error
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {!analysisResults && (
                  <div className="space-y-4">
                    {/* Pro Tips Card */}
                    <Card className="transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10">
                            💡
                          </div>
                          Pro Tips
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">✓</Badge>
                          <p className="text-sm text-muted-foreground">
                            Include the complete error message with all details for precise analysis
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">🎯</Badge>
                          <p className="text-sm text-muted-foreground">
                            Stack traces help pinpoint the exact error location instantly
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <Badge variant="secondary" className="mt-0.5">💬</Badge>
                          <p className="text-sm text-muted-foreground">
                            Share context about your goals for more targeted solutions
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Get Started Card */}
                    <Card className="border-primary/20 bg-primary/5 transition-all duration-300 hover:shadow-lg">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10">
                            🚀
                          </div>
                          Ready to Get Started?
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Connect your repository to unlock advanced AI-driven error analysis. 
                          Support for JavaScript, Python, Java, Go, and DevOps.
                        </p>
                        <Button
                          onClick={() => handleNavigation("/connect-repository")}
                          className="w-full transition-all duration-200 hover:scale-105"
                        >
                          <Folder className="mr-2 h-4 w-4" />
                          Connect Repository
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              {/* Analysis Results */}
              {analysisResults && (
                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                  <Card className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                            🤖
                          </div>
                          <div>
                            <CardTitle>AI Analysis Results</CardTitle>
                            <CardDescription>
                              Powered by advanced AI analysis
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          ⚡ {analysisResults.metrics.total_llm_tokens.toLocaleString()} tokens
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Root Cause Analysis */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-destructive/10">
                            🔍
                          </div>
                          <h3 className="font-semibold">Root Cause Analysis</h3>
                        </div>
                        <Card className="border-l-4 border-l-destructive bg-destructive/5">
                          <CardContent className="p-4">
                            <p className="text-sm leading-relaxed">
                              {analysisResults.analysis.root_cause_analysis}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Error Location */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-warning/10">
                            <Terminal className="h-3 w-3" />
                          </div>
                          <h3 className="font-semibold">Error Location</h3>
                        </div>
                        <div className="relative">
                          <div className="absolute left-3 top-3 text-xs text-green-400">$</div>
                          <Card className="bg-black border-2 border-gray-600 pt-8">
                            <CardContent className="p-4">
                              <p className="font-mono text-sm text-green-400 leading-relaxed">
                                <span className="text-gray-400">location:</span>{" "}
                                <span className="text-orange-400">{analysisResults.analysis.error_location}</span>
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      {/* Execution Path */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500/10">
                            <Terminal className="h-3 w-3" />
                          </div>
                          <h3 className="font-semibold">Execution Path</h3>
                        </div>
                        <div className="relative">
                          <div className="absolute left-3 top-3 text-xs text-gray-400">$</div>
                          <Card className="bg-black border-2 border-gray-600 pt-8">
                            <CardContent className="p-4">
                              <p className="font-mono text-sm text-gray-200 leading-relaxed">
                                <span className="text-gray-400">trace:</span>{" "}
                                <span className="text-blue-400">{analysisResults.analysis.execution_path}</span>
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      {/* Replication Steps */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-500/10">
                            🔄
                          </div>
                          <h3 className="font-semibold">Replication Steps</h3>
                        </div>
                        <Card>
                          <CardContent className="p-4">
                            <ol className="list-decimal list-inside space-y-2">
                              {analysisResults.analysis.replication_steps.map((step, index) => (
                                <li key={index} className="text-sm leading-relaxed">
                                  {step}
                                </li>
                              ))}
                            </ol>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Suggested Fix */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded bg-success/10">
                            ✅
                          </div>
                          <h3 className="font-semibold">Suggested Fix</h3>
                        </div>
                        <Card className="border-l-4 border-l-success bg-success/5">
                          <CardContent className="p-4">
                            <p className="text-sm leading-relaxed text-success-foreground">
                              {analysisResults.analysis.suggested_fix}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Analysis Metrics */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-base">
                            📊 Analysis Metrics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold text-blue-600">
                                {analysisResults.metrics.llm_input_tokens.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">Input Tokens</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-green-600">
                                {analysisResults.metrics.llm_output_tokens.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">Output Tokens</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-purple-600">
                                {analysisResults.metrics.total_llm_tokens.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">Total Tokens</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t">
                        <Button className="flex-1 transition-all duration-200 hover:scale-105">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Analysis
                        </Button>
                        <Button variant="outline" className="flex-1 transition-all duration-200 hover:scale-105">
                          <Save className="mr-2 h-4 w-4" />
                          Save Report
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setAnalysisResults(null)}
                          className="transition-all duration-200 hover:scale-110"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </main>
        </SidebarInset>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
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
                <h3 className="font-semibold">Analyzing...</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we process your request
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </SidebarProvider>
  )
}
