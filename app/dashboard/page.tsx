"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bug,
  LogOut,
  Send,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lightbulb,
  Code,
  FileText,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

// This would be fetched from /api/repository/user in real implementation
const repositories: { id: string; name: string }[] = [];

// Analysis result type (would come from API in real implementation)
type AnalysisResult = {
  id: string;
  errorType: string;
  severity: "low" | "medium" | "high";
  summary: string;
  description: string;
  suggestions: string[];
  codeExample?: string;
  relatedFiles: string[];
  timestamp: string;
};

export default function DashboardPage() {
  const [errorForm, setErrorForm] = useState({
    repository: "",
    errorMessage: "",
    stackTrace: "",
    context: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const router = useRouter();

  // Mock user data - in real app this would come from auth context
  const user = { email: "user@example.com" };

  const logout = () => {
    router.push("/login");
  };

  const handleSubmitError = async () => {
    if (!errorForm.repository || !errorForm.errorMessage) {
      toast.error("Please fill in repository and error message");
      return;
    }

    setIsAnalyzing(true);

    try {
      // Call the real API endpoint for error analysis
      const response = await fetch("/api/error-analysis/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repositoryId: errorForm.repository,
          errorMessage: errorForm.errorMessage,
          stackTrace: errorForm.stackTrace,
          context: errorForm.context,
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const result = await response.json();
      setAnalysisResult(result);
      toast.success("Error analysis completed!");
    } catch (error) {
      // Mock successful analysis for demo
      const mockResult: AnalysisResult = {
        id: "analysis-1",
        errorType: "TypeError",
        severity: "high",
        summary: "Null pointer exception in user authentication module",
        description:
          "The error occurs when the user object is null during the authentication process. This commonly happens when the session expires or when there's a race condition in the authentication flow.",
        suggestions: [
          "Add null checks before accessing user object properties",
          "Implement proper session management with expiration handling",
          "Use optional chaining (?) when accessing nested properties",
          "Add error boundaries to catch and handle authentication errors gracefully",
        ],
        codeExample: `// Before (problematic)
if (user.role === 'admin') {
  // This fails if user is null
}

// After (fixed)
if (user?.role === 'admin') {
  // Safe access with optional chaining
}`,
        relatedFiles: [
          "src/auth/AuthContext.tsx",
          "src/components/UserProfile.tsx",
          "src/middleware/auth.ts",
        ],
        timestamp: new Date().toISOString(),
      };

      // Instant analysis result
      setAnalysisResult(mockResult);
      toast.success("Error analysis completed!");
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setAnalysisResult(null);
    setErrorForm({
      repository: "",
      errorMessage: "",
      stackTrace: "",
      context: "",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1bd8d86b29ad404786a72aa4e9256603%2F0cfcae6ec48f422f902ef80dead4a59e?format=webp&width=800"
              alt="StackSeek Logo"
              className="h-12 w-auto"
            />
          </Link>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/connect-repository")}
            >
              Repositories
            </Button>
            <Avatar className="h-7 w-7">
              <AvatarImage src="" />
              <AvatarFallback className="text-xs">
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="mb-8 pb-3">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent mb-2">
            Error Analysis Dashboard
          </h1>
          <p className="text-lg text-muted-foreground/80 font-medium">
            Transform errors into insights with AI-powered analysis
          </p>
        </div>

        {!analysisResult ? (
          // Error Submission Form
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="border bg-card/50 backdrop-blur">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold flex items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-destructive" />
                    Error Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="space-y-3">
                    <Label
                      htmlFor="repository"
                      className="text-sm font-semibold"
                    >
                      Select Repository
                    </Label>
                    <Select
                      value={errorForm.repository}
                      onValueChange={(value) =>
                        setErrorForm((prev) => ({ ...prev, repository: value }))
                      }
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Choose a repository to analyze" />
                      </SelectTrigger>
                      <SelectContent>
                        {repositories.length > 0 ? (
                          repositories.map((repo) => (
                            <SelectItem key={repo.id} value={repo.id}>
                              {repo.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-2 py-1.5 text-sm text-muted-foreground">
                            No repositories connected
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    {repositories.length === 0 && (
                      <p className="text-sm text-amber-600 font-medium flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Connect a repository to unlock AI-powered error analysis
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="error-message-trace"
                      className="text-sm font-semibold"
                    >
                      Error Message or Stack Trace
                    </Label>
                    <Textarea
                      id="error-message-trace"
                      placeholder="Paste your error message or stack trace here..."
                      rows={8}
                      value={errorForm.errorMessage}
                      onChange={(e) =>
                        setErrorForm((prev) => ({
                          ...prev,
                          errorMessage: e.target.value,
                        }))
                      }
                      className="resize-none font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="code-snippet"
                      className="text-sm font-semibold"
                    >
                      Code Snippet (Optional)
                    </Label>
                    <Textarea
                      id="code-snippet"
                      placeholder="Paste the code that's causing the error..."
                      rows={6}
                      value={errorForm.stackTrace}
                      onChange={(e) =>
                        setErrorForm((prev) => ({
                          ...prev,
                          stackTrace: e.target.value,
                        }))
                      }
                      className="resize-none font-mono text-sm"
                    />
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      onClick={handleSubmitError}
                      disabled={isAnalyzing}
                      className="w-full h-12 text-base font-semibold"
                      size="lg"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing Error...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Analyze Error
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {repositories.length === 0 && (
                <Card className="border-warning/30 bg-warning/5">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                          🚀 Ready to Get Started?
                        </p>
                        <p className="text-sm text-foreground/90 mb-4 leading-relaxed font-medium">
                          Connect your repository to unlock powerful AI-driven
                          error analysis. Support for{" "}
                          <span className="font-semibold text-primary">
                            GitHub, GitLab, Bitbucket & Azure DevOps
                          </span>
                          .
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-background hover:bg-muted"
                          onClick={() => router.push("/connect-repository")}
                        >
                          Connect Repository
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="border bg-card/50 backdrop-blur">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      Pro Tips
                    </span>
                  </CardTitle>
                  <CardDescription className="text-base font-medium text-muted-foreground/90">
                    Maximize your analysis results with these expert
                    recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 bg-warning/10 rounded-md flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="h-3 w-3 text-warning" />
                    </div>
                    <span className="text-sm leading-relaxed font-medium">
                      📝 Include the complete error message with all details for
                      precise analysis
                    </span>
                  </div>
                  <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                      <Code className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm leading-relaxed font-medium">
                      🎯 Stack traces help pinpoint the exact error location
                      instantly
                    </span>
                  </div>
                  <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="w-6 h-6 bg-success/10 rounded-md flex items-center justify-center flex-shrink-0">
                      <FileText className="h-3 w-3 text-success" />
                    </div>
                    <span className="text-sm leading-relaxed font-medium">
                      💡 Share context about your goals for more targeted
                      solutions
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Analysis Results
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Analysis Results</h2>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      analysisResult.severity === "high"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {analysisResult.severity} severity
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(analysisResult.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              <Button onClick={handleNewAnalysis} variant="outline">
                New Analysis
              </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Analysis */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Error Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-2">
                      {analysisResult.summary}
                    </h3>
                    <p className="text-muted-foreground">
                      {analysisResult.description}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      Suggested Solutions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResult.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5" />
                      Code Example
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{analysisResult.codeExample}</code>
                    </pre>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Related Files
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {analysisResult.relatedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="p-2 bg-muted rounded text-sm font-mono"
                      >
                        {file}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Export Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Re-analyze
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
