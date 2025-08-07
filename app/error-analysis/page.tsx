"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
} from "lucide-react";
import { toast } from "sonner";

// Mock repositories for dropdown
const mockRepositories = [
  { id: "1", name: "react-dashboard" },
  { id: "2", name: "api-backend" },
  { id: "3", name: "mobile-app" },
];

// Mock analysis results
const mockAnalysisResult = {
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

export default function ErrorAnalysisPage() {
  const [errorForm, setErrorForm] = useState({
    repository: "",
    errorMessage: "",
    stackTrace: "",
    context: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<
    typeof mockAnalysisResult | null
  >(null);

  // Mock user data - in real app this would come from auth context
  const user = { email: "user@example.com" };

  const logout = () => {
    // Mock logout - in real app would clear auth state
    console.log("Logged out");
  };

  const handleSubmitError = async () => {
    if (!errorForm.repository || !errorForm.errorMessage) {
      toast.error("Please fill in repository and error message");
      return;
    }

    setIsAnalyzing(true);

    // Instant mock AI analysis

    setAnalysisResult(mockAnalysisResult);
    setIsAnalyzing(false);
    toast.success("Error analysis completed!");
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
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Bug className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              StackSeek
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>
                {user?.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Error Analysis
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Submit your errors for AI-powered analysis and get intelligent
            solutions
          </p>
        </div>

        {!analysisResult ? (
          // Error Submission Form
          <div className="max-w-2xl">
            <Card className="border bg-card/50 backdrop-blur">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold">
                  Submit Error for Analysis
                </CardTitle>
                <CardDescription className="leading-relaxed">
                  Provide details about the error you're experiencing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="repository">Repository</Label>
                  <Select
                    value={errorForm.repository}
                    onValueChange={(value) =>
                      setErrorForm((prev) => ({ ...prev, repository: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a repository" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockRepositories.map((repo) => (
                        <SelectItem key={repo.id} value={repo.id}>
                          {repo.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="error-message">Error Message</Label>
                  <Input
                    id="error-message"
                    placeholder="TypeError: Cannot read property 'name' of null"
                    value={errorForm.errorMessage}
                    onChange={(e) =>
                      setErrorForm((prev) => ({
                        ...prev,
                        errorMessage: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stack-trace">Stack Trace (Optional)</Label>
                  <Textarea
                    id="stack-trace"
                    placeholder="Paste your stack trace here..."
                    rows={6}
                    value={errorForm.stackTrace}
                    onChange={(e) =>
                      setErrorForm((prev) => ({
                        ...prev,
                        stackTrace: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="context">Additional Context (Optional)</Label>
                  <Textarea
                    id="context"
                    placeholder="Describe what you were trying to do when the error occurred..."
                    rows={3}
                    value={errorForm.context}
                    onChange={(e) =>
                      setErrorForm((prev) => ({
                        ...prev,
                        context: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button
                  onClick={handleSubmitError}
                  disabled={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Error...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Analyze Error
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
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

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Analysis */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-warning" />
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

                <Card className="border bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-warning" />
                      Suggested Solutions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisResult.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
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
