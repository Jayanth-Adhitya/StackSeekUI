import { useState } from "react";
import Login from "@/pages/LoginNew";
import Register from "@/pages/RegisterNew";
import Dashboard from "@/pages/DashboardNew";
import ConnectRepository from "@/pages/ConnectRepositoryNew";
import ForgotPassword from "@/pages/ForgotPasswordNew";
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation Test Panel */}
      {showTestNav && (
        <Card className="fixed top-4 right-4 z-50 min-w-48 animate-in slide-in-from-top-2 duration-200">
          <CardContent className="p-4 space-y-2">
            <h4 className="text-sm font-medium mb-3">🧪 Test Navigation</h4>
            <div className="space-y-2">
              <Button onClick={() => onNavigate("login")} size="sm" className="w-full justify-start" variant="outline">
                Login Page
              </Button>
              <Button onClick={() => onNavigate("register")} size="sm" className="w-full justify-start" variant="outline">
                Register Page
              </Button>
              <Button onClick={() => onNavigate("forgot-password")} size="sm" className="w-full justify-start" variant="outline">
                Forgot Password
              </Button>
              <Button onClick={() => onNavigate("connect-repository")} size="sm" className="w-full justify-start" variant="outline">
                Connect Repository
              </Button>
              <Button onClick={() => onNavigate("dashboard")} size="sm" className="w-full justify-start" variant="outline">
                Dashboard
              </Button>
              <Button onClick={() => onNavigate("home")} size="sm" className="w-full justify-start" variant="outline">
                Home/Landing
              </Button>
              <Button onClick={() => setShowTestNav(false)} size="sm" className="w-full mt-2" variant="secondary">
                ✕ Close
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-colors duration-300">
        <div className="container flex h-16 items-center justify-between px-8">
          <div className="flex items-center gap-3">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
              alt="StackSeek Logo"
              className="h-10 w-auto transition-transform duration-200 hover:scale-105"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowTestNav(!showTestNav)}
              variant="outline"
              size="sm"
              className="transition-all duration-200 hover:scale-105"
              title="Test Navigation - Click to access all pages"
            >
              🧪 Nav
            </Button>
            <Button
              onClick={handleSignIn}
              variant="ghost"
              className="transition-all duration-200 hover:scale-105"
            >
              Sign In
            </Button>
            <Button
              onClick={handleGetStarted}
              className="transition-all duration-200 hover:scale-105"
            >
              Get Started
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-8 py-20 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Badge variant="secondary" className="mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
            <span className="mr-2">⚡</span>
            Now with Multi-Provider Integration
          </Badge>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-300">
            Error Analysis
            <br />
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-lg text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500">
            Analyze, track, and resolve errors across your repositories with
            AI-powered insights. Connect GitHub, GitLab, Bitbucket, and Azure
            DevOps for intelligent error analysis.
          </p>

          <div className="mb-16 flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-1 duration-1000 delay-700">
            <Button
              onClick={handleStartAnalyzing}
              size="lg"
              className="transition-all duration-200 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Start Analyzing Errors
              <span className="ml-2">→</span>
            </Button>
            <Button
              onClick={handleSignIn}
              variant="outline"
              size="lg"
              className="transition-all duration-200 hover:scale-105 hover:-translate-y-1"
            >
              Sign In
            </Button>
          </div>

          {/* Demo Dashboard */}
          <div className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1000">
            <Card className="overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-105">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-purple-500/5 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-4xl transition-transform duration-300 hover:scale-110">
                      📊
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">
                      Interactive Dashboard
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time error analysis and insights
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-muted/50 py-20 transition-colors duration-300">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
              Everything you need for error analysis
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-1 duration-700 delay-200">
              Comprehensive tools and integrations to streamline your error
              debugging workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Card
                key={index}
                className="transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-2 duration-700"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4 text-2xl transition-transform duration-300 hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
              Choose Your Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-1 duration-700 delay-200">
              Start for free and scale as your team grows. All plans include our core error analysis features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="relative transition-all duration-300 hover:shadow-lg hover:scale-105 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Starter</h3>
                  <p className="text-muted-foreground mb-4">Perfect for individual developers</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Up to 3 repositories</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">50 error analyses/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Basic AI insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
                <Button
                  onClick={handleGetStarted}
                  className="w-full transition-all duration-200 hover:scale-105"
                  variant="outline"
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="relative transition-all duration-300 hover:shadow-lg hover:scale-105 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-400 border-primary">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-muted-foreground mb-4">For growing development teams</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Up to 15 repositories</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">500 error analyses/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Advanced AI insights</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Team collaboration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Custom integrations</span>
                  </li>
                </ul>
                <Button
                  onClick={handleGetStarted}
                  className="w-full transition-all duration-200 hover:scale-105"
                >
                  Start Professional
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative transition-all duration-300 hover:shadow-lg hover:scale-105 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-muted-foreground mb-4">For large organizations</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Unlimited repositories</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Unlimited analyses</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Enterprise AI features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-success/20 flex items-center justify-center">
                      <span className="text-success text-xs">✓</span>
                    </div>
                    <span className="text-sm">SSO & compliance</span>
                  </li>
                </ul>
                <Button
                  onClick={handleGetStarted}
                  className="w-full transition-all duration-200 hover:scale-105"
                  variant="outline"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-purple-600 text-primary-foreground py-20">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-700">
            Ready to streamline your error analysis?
          </h2>
          <p className="text-lg sm:text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-1 duration-700 delay-200">
            Join thousands of developers who are already saving hours every week
            with intelligent error insights
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-1 duration-700 delay-400">
            <Button
              onClick={handleGetStarted}
              size="lg"
              variant="secondary"
              className="transition-all duration-200 hover:scale-105 hover:-translate-y-1 shadow-lg"
            >
              Get Started for Free
              <span className="ml-2">→</span>
            </Button>
            <Button
              onClick={handleSignIn}
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground transition-all duration-200 hover:scale-105 hover:-translate-y-1 hover:bg-primary-foreground/20"
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-16 transition-colors duration-300">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
                  alt="StackSeek Logo"
                  className="h-8 w-auto transition-transform duration-200 hover:scale-105"
                />
                <span className="text-xl font-semibold">StackSeek</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Transform errors into insights with AI-powered analysis.
                Streamline your debugging workflow and ship with confidence.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Features
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Pricing
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Integrations
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    API Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Status Page
                  </Button>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    About Us
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Careers
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Blog
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Press Kit
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Button>
                </li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Help Center
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Community
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Security
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2024 StackSeek. Built with modern technologies for modern developers.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                  Privacy
                </Button>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                  Terms
                </Button>
                <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground">
                  Cookies
                </Button>
              </div>
            </div>
          </div>
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
