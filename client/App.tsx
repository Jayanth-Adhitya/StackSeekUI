import { useState } from "react";
import { Link } from "wouter";
import Login from "@/pages/LoginNew";
import Register from "@/pages/RegisterNew";
import Dashboard from "@/pages/DashboardNew";
import ConnectRepository from "@/pages/ConnectRepositoryNew";
import ForgotPassword from "@/pages/ForgotPasswordNew";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Zap,
  Shield,
  Code2,
  GitBranch,
  LineChart,
  CheckCircle,
  Check,
  ArrowRight,
  Globe,
  Users,
  Gauge,
  Phone,
  MessageCircle,
  Menu,
  X
} from "lucide-react";

function LandingPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false); // Close mobile menu if open
    }
  };

  const handleSignIn = () => {
    onNavigate("login");
  };

  const handleGetStarted = () => {
    onNavigate("register");
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI models analyze your errors and provide intelligent solutions in seconds"
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Multi-Language Support",
      description: "Support for 10+ programming languages including JavaScript, Python, Java, and more"
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Git Integration",
      description: "Connect your repositories from GitHub, GitLab, Bitbucket, and other providers"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description: "Your code and data are encrypted and never stored permanently"
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Error Analytics",
      description: "Track error patterns and get insights to prevent future issues"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Share solutions and collaborate with your team members"
    }
  ];

  const stats = [
    { value: "50K+", label: "Errors Analyzed" },
    { value: "10K+", label: "Active Developers" },
    { value: "99.9%", label: "Uptime" },
    { value: "< 3s", label: "Analysis Time" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-teal-50/30 dark:from-gray-900 dark:via-purple-900/30 dark:to-teal-900/30 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 animate-fade-in">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F3c01044c209e4e76920345f418b746ad%2F933081037c954896b92c871f21dda819?format=webp&width=800"
                alt="StackSeek Logo"
                className="h-10 w-auto transition-transform duration-200 hover:scale-105"
              />
              <h1 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400">StackSeek</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#features" onClick={(e) => handleScrollToSection(e, 'features')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Features</a>
              <a href="#how-it-works" onClick={(e) => handleScrollToSection(e, 'how-it-works')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">How It Works</a>
              <a href="#pricing" onClick={(e) => handleScrollToSection(e, 'pricing')} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">Pricing</a>
              <Button variant="ghost" onClick={handleSignIn} className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Sign In
              </Button>
              <Button onClick={handleGetStarted} className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 shadow-lg professional-button font-medium px-6">
                Get Started Free
              </Button>
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/50 animate-fade-in">
              <div className="space-y-2">
                <a href="#features" onClick={(e) => handleScrollToSection(e, 'features')} className="block px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
                <a href="#how-it-works" onClick={(e) => handleScrollToSection(e, 'how-it-works')} className="block px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">How It Works</a>
                <a href="#pricing" onClick={(e) => handleScrollToSection(e, 'pricing')} className="block px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">Pricing</a>
                <div className="pt-2 space-y-2">
                  <Button variant="ghost" onClick={handleSignIn} className="w-full font-medium hover:text-blue-600 transition-colors">
                    Sign In
                  </Button>
                  <Button onClick={handleGetStarted} className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 shadow-lg professional-button font-medium">
                    Get Started Free
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 sm:pt-24 pb-24 sm:pb-36 px-4 animate-fade-in">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 shadow-sm text-xs sm:text-sm">
            <Gauge className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-semibold tracking-wide">Trusted by 10,000+ developers worldwide</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight px-2">
            Debug Smarter,<br />
            <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent">
              Ship Faster
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            DeepNexus uses cutting-edge AI to analyze your errors, provide instant solutions, 
            and help you write better code. Stop wasting hours on debugging.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 px-4">
            <Button size="lg" onClick={handleGetStarted} className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 shadow-xl professional-button px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-medium">
              Start Free Trial
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg font-medium border-2 hover:bg-gray-50">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto px-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Everything You Need to Debug Efficiently
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4">
              DeepNexus provides comprehensive error analysis tools powered by advanced AI
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="hover:shadow-2xl transition-all duration-300 border-gray-100 hover:scale-105 bg-white/80 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-blue-600 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
              How DeepNexus Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed px-4">
              Get from error to solution in three simple steps
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-6 shadow-xl transform hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Paste Your Error</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4">
                Copy and paste your error message or stack trace into DeepNexus
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-6 shadow-xl transform hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">AI Analysis</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4">
                Our AI analyzes your error and generates comprehensive solutions
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold mx-auto mb-4 sm:mb-6 shadow-xl transform hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Apply Solutions</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4">
                Get step-by-step fixes and code suggestions to resolve your issue
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed px-4">
              Start free, upgrade when you need more
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="relative hover:shadow-2xl transition-all duration-300 border-gray-100 bg-white/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Free</h3>
                <div className="mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold">$0</span>
                  <span className="text-gray-600 text-base sm:text-lg">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>50 error analyses/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Basic AI suggestions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Public repositories</span>
                  </li>
                </ul>
                <Button variant="outline" onClick={handleGetStarted} className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-blue-200 shadow-2xl hover:shadow-3xl transition-all duration-300 bg-white sm:scale-105 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-700 to-blue-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                Most Popular
              </div>
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Pro</h3>
                <div className="mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold">$19</span>
                  <span className="text-gray-600 text-base sm:text-lg">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Unlimited error analyses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Advanced AI with GPT-4</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Private repositories</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button onClick={handleGetStarted} className="w-full bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative hover:shadow-2xl transition-all duration-300 border-gray-100 bg-white/80 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3">Enterprise</h3>
                <div className="mb-4 sm:mb-6">
                  <span className="text-3xl sm:text-4xl font-bold">Custom</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Everything in Pro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>On-premise deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Custom AI models</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>SLA & dedicated support</span>
                  </li>
                </ul>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <a 
                    href="https://wa.me/919629193423?text=Hi%2C%20I'm%20interested%20in%20DeepNexus%20Enterprise%20plan" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full h-10">
                      <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>WhatsApp</span>
                    </Button>
                  </a>
                  <a 
                    href="tel:+919629193423"
                  >
                    <Button variant="outline" className="w-full h-10">
                      <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Call Now</span>
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-20 px-4 bg-gradient-to-r from-blue-700 to-blue-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="animate-fade-in transform hover:scale-110 transition-transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">{stat.value}</div>
                <div className="text-white/80 text-sm sm:text-base lg:text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-32 px-4 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
            Ready to Debug Smarter?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 sm:mb-10 leading-relaxed px-4">
            Join thousands of developers who are already saving hours on debugging
          </p>
          <Button size="lg" onClick={handleGetStarted} className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600 shadow-xl professional-button px-8 sm:px-12 py-5 sm:py-7 text-base sm:text-lg font-medium">
            Start Your Free Trial
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <p className="text-sm sm:text-base text-gray-600 mt-4 sm:mt-6 font-medium px-4">
            No credit card required • Free forever for personal use
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <div className="col-span-1 sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-700 to-blue-500 rounded-xl shadow-lg">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">DeepNexus</h3>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                AI-powered error analysis for modern developers. Debug smarter, ship faster.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Product</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><a href="#features" onClick={(e) => handleScrollToSection(e, 'features')} className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" onClick={(e) => handleScrollToSection(e, 'pricing')} className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Company</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 sm:mb-6 text-base sm:text-lg">Legal</h4>
              <ul className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-sm sm:text-base">
            <p>&copy; 2025 DeepNexus. All rights reserved.</p>
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
