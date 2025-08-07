"use client";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Bug,
  Code2,
  GitBranch,
  Shield,
  Zap,
  ChevronRight,
  Github,
  Settings,
  Key,
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1bd8d86b29ad404786a72aa4e9256603%2F0cfcae6ec48f422f902ef80dead4a59e?format=webp&width=800"
              alt="StackSeek Logo"
              className="h-16 w-auto"
            />
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-8">
          <Zap className="h-3 w-3" />
          Now with Multi-Provider Integration
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          Error Analysis
          <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Made Simple
          </span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          Analyze, track, and resolve errors across your repositories with
          AI-powered insights. Connect GitHub, GitLab, Bitbucket, and Azure
          DevOps for intelligent error analysis.
        </p>
        <div className="flex items-center justify-center gap-3 mb-16">
          <Link to="/register">
            <Button size="lg" className="h-11 px-8 font-medium">
              Start Analyzing Errors
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-8 font-medium"
            >
              Sign In
            </Button>
          </Link>
        </div>

        {/* Demo Dashboard */}
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden border shadow-2xl bg-card/50 backdrop-blur">
            <div className="aspect-video bg-gradient-to-br from-primary/5 to-purple-500/5 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Interactive Dashboard
                </h3>
                <p className="text-muted-foreground text-sm">
                  Real-time error analysis and insights
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20 bg-muted/30">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for error analysis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and integrations to streamline your error
            debugging workflow
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border bg-background/50 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">
                Multi-Provider Integration
              </CardTitle>
              <CardDescription className="leading-relaxed">
                Connect repositories from GitHub, GitLab, Bitbucket, and Azure
                DevOps with comprehensive authentication.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border bg-background/50 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">AI-Powered Analysis</CardTitle>
              <CardDescription className="leading-relaxed">
                Advanced error pattern recognition with intelligent suggestions
                for quick resolution and debugging.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border bg-background/50 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Enterprise Security</CardTitle>
              <CardDescription className="leading-relaxed">
                Bank-grade security with encrypted credential storage and secure
                authentication protocols.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border bg-background/50 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Real-time Dashboard</CardTitle>
              <CardDescription className="leading-relaxed">
                Monitor error trends, track resolution progress, and visualize
                repository health metrics.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border bg-background/50 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Key className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Flexible Authentication</CardTitle>
              <CardDescription className="leading-relaxed">
                Support for tokens, SSH keys, deploy keys, and OAuth for
                seamless repository access.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border bg-background/50 backdrop-blur hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
              <CardDescription className="leading-relaxed">
                Built on modern architecture with .NET backend for maximum
                performance and reliability.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary via-primary to-purple-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Ready to streamline your error analysis?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who are already saving hours every week
            with intelligent error insights
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="h-11 px-8 font-medium"
              >
                Get Started for Free
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="h-11 px-8 font-medium bg-white/10 border-white/20 hover:bg-white/20 text-white"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1bd8d86b29ad404786a72aa4e9256603%2F0cfcae6ec48f422f902ef80dead4a59e?format=webp&width=800"
              alt="StackSeek Logo"
              className="h-16 w-auto"
            />
          </div>
          <p className="text-center text-muted-foreground">
            © 2024 StackSeek. Built with modern technologies for modern
            developers.
          </p>
        </div>
      </footer>
    </div>
  );
}
