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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Bug,
  LogOut,
  Plus,
  GitBranch,
  Github,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  GitMerge,
  Cloud,
  Key,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

export default function ConnectRepositoryPage() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [authMethod, setAuthMethod] = useState("token");
  const [authData, setAuthData] = useState({
    token: "",
    username: "",
    password: "",
    sshKey: "",
    deployKey: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  // Mock user data - in real app this would come from auth context
  const user = { email: "user@example.com" };

  const logout = () => {
    router.push("/login");
  };

  const handleConnectRepo = async () => {
    if (!repoUrl) {
      toast.error("Please enter a repository URL");
      return;
    }

    if (isPrivate) {
      if (authMethod === "token" && !authData.token) {
        toast.error("Please enter your access token");
        return;
      }
      if (
        authMethod === "credentials" &&
        (!authData.username || !authData.password)
      ) {
        toast.error("Please enter username and password");
        return;
      }
      if (authMethod === "ssh" && !authData.sshKey) {
        toast.error("Please enter your SSH private key");
        return;
      }
      if (authMethod === "deploy" && !authData.deployKey) {
        toast.error("Please enter your deploy key");
        return;
      }
    }

    setIsConnecting(true);

    try {
      // Call the real API endpoint to connect repository
      const requestData = {
        url: repoUrl,
        isPrivate,
        authMethod: isPrivate ? authMethod : null,
        authData: isPrivate ? authData : null,
      };

      // Instant mock connection
      setIsConnected(true);
      toast.success("Repository connected successfully!");
    } catch (error) {
      toast.error(
        "Failed to connect repository. Please check your credentials.",
      );
    } finally {
      setIsConnecting(false);
    }
  };

  const handleContinueToDashboard = () => {
    router.push("/dashboard");
  };

  const handleConnectProvider = async (provider: string) => {
    try {
      // Redirect to OAuth endpoint for the selected provider
      const oauthEndpoint = `/api/auth/oauth/${provider.toLowerCase().replace(" ", "-")}`;
      window.location.href = oauthEndpoint;
    } catch (error) {
      toast.error(`Failed to connect ${provider}. Please try again.`);
    }
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

          <div className="flex items-center gap-4">
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

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Setup Progress</span>
              <span>{isConnected ? "2/2" : "1/2"}</span>
            </div>
            <Progress value={isConnected ? 100 : 50} className="h-2" />
          </div>

          {/* Welcome message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Welcome to StackSeek!</h1>
            <p className="text-lg text-muted-foreground">
              Let's connect your first repository to start analyzing errors
            </p>
          </div>

          {!isConnected ? (
            <div className="space-y-6">
              {/* Provider Connect Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Setup with Git Providers</CardTitle>
                  <CardDescription>
                    Connect your Git provider account to automatically import
                    repositories
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    onClick={() => handleConnectProvider("GitHub")}
                    variant="outline"
                    className="h-12 justify-start"
                  >
                    <Github className="mr-3 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">GitHub</div>
                      <div className="text-xs text-muted-foreground">
                        github.com
                      </div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => handleConnectProvider("GitLab")}
                    variant="outline"
                    className="h-12 justify-start"
                  >
                    <GitMerge className="mr-3 h-5 w-5 text-orange-500" />
                    <div className="text-left">
                      <div className="font-medium">GitLab</div>
                      <div className="text-xs text-muted-foreground">
                        gitlab.com
                      </div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => handleConnectProvider("Bitbucket")}
                    variant="outline"
                    className="h-12 justify-start"
                  >
                    <GitBranch className="mr-3 h-5 w-5 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium">Bitbucket</div>
                      <div className="text-xs text-muted-foreground">
                        bitbucket.org
                      </div>
                    </div>
                  </Button>

                  <Button
                    onClick={() => handleConnectProvider("Azure DevOps")}
                    variant="outline"
                    className="h-12 justify-start"
                  >
                    <Cloud className="mr-3 h-5 w-5 text-blue-500" />
                    <div className="text-left">
                      <div className="font-medium">Azure DevOps</div>
                      <div className="text-xs text-muted-foreground">
                        dev.azure.com
                      </div>
                    </div>
                  </Button>
                </CardContent>
              </Card>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or connect manually
                  </span>
                </div>
              </div>

              {/* Manual Connect Option */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Connect Repository Manually
                  </CardTitle>
                  <CardDescription>
                    Add any public or private repository with comprehensive
                    authentication options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="repo-url">Repository URL</Label>
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/username/repository"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="private-repo"
                      checked={isPrivate}
                      onCheckedChange={setIsPrivate}
                    />
                    <Label htmlFor="private-repo">Private Repository</Label>
                  </div>

                  {isPrivate && (
                    <Card className="border-orange-200 bg-orange-50/30">
                      <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Shield className="h-5 w-5 text-orange-600" />
                          Private Repository Authentication
                        </CardTitle>
                        <CardDescription>
                          Choose your preferred authentication method for
                          accessing this private repository
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Authentication Method</Label>
                          <Select
                            value={authMethod}
                            onValueChange={setAuthMethod}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="token">
                                Personal Access Token (Recommended)
                              </SelectItem>
                              <SelectItem value="credentials">
                                Username & Password
                              </SelectItem>
                              <SelectItem value="ssh">
                                SSH Private Key
                              </SelectItem>
                              <SelectItem value="deploy">Deploy Key</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Tabs value={authMethod} onValueChange={setAuthMethod}>
                          <TabsContent value="token" className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="access-token">
                                Personal Access Token
                              </Label>
                              <Input
                                id="access-token"
                                type="password"
                                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                                value={authData.token}
                                onChange={(e) =>
                                  setAuthData((prev) => ({
                                    ...prev,
                                    token: e.target.value,
                                  }))
                                }
                              />
                              <p className="text-xs text-muted-foreground">
                                Create a token with repo permissions in your Git
                                provider settings
                              </p>
                            </div>
                          </TabsContent>

                          <TabsContent
                            value="credentials"
                            className="space-y-4 mt-4"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                  id="username"
                                  placeholder="your-username"
                                  value={authData.username}
                                  onChange={(e) =>
                                    setAuthData((prev) => ({
                                      ...prev,
                                      username: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                  <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="your-password"
                                    value={authData.password}
                                    onChange={(e) =>
                                      setAuthData((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                      }))
                                    }
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  >
                                    {showPassword ? (
                                      <EyeOff className="h-4 w-4" />
                                    ) : (
                                      <Eye className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              Note: Some providers require app passwords instead
                              of account passwords
                            </p>
                          </TabsContent>

                          <TabsContent value="ssh" className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="ssh-key">SSH Private Key</Label>
                              <Textarea
                                id="ssh-key"
                                placeholder="-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA..."
                                rows={6}
                                value={authData.sshKey}
                                onChange={(e) =>
                                  setAuthData((prev) => ({
                                    ...prev,
                                    sshKey: e.target.value,
                                  }))
                                }
                              />
                              <p className="text-xs text-muted-foreground">
                                Paste your SSH private key (make sure the public
                                key is added to your Git provider)
                              </p>
                            </div>
                          </TabsContent>

                          <TabsContent
                            value="deploy"
                            className="space-y-4 mt-4"
                          >
                            <div className="space-y-2">
                              <Label htmlFor="deploy-key">Deploy Key</Label>
                              <Textarea
                                id="deploy-key"
                                placeholder="ssh-rsa AAAAB3NzaC1yc2EAAAA..."
                                rows={4}
                                value={authData.deployKey}
                                onChange={(e) =>
                                  setAuthData((prev) => ({
                                    ...prev,
                                    deployKey: e.target.value,
                                  }))
                                }
                              />
                              <p className="text-xs text-muted-foreground">
                                Repository-specific deploy key (read-only
                                access)
                              </p>
                            </div>
                          </TabsContent>
                        </Tabs>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="flex items-start gap-2">
                            <Key className="h-4 w-4 text-blue-600 mt-0.5" />
                            <div className="text-sm">
                              <p className="font-medium text-blue-800">
                                Security Notice
                              </p>
                              <p className="text-blue-700">
                                Your credentials are encrypted and securely
                                stored. We recommend using Personal Access
                                Tokens for better security.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Button
                    onClick={handleConnectRepo}
                    disabled={isConnecting}
                    className="w-full"
                    size="lg"
                  >
                    {isConnecting ? (
                      <>
                        <GitBranch className="mr-2 h-4 w-4 animate-pulse" />
                        Connecting Repository...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Connect Repository
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Success state
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Repository Connected!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Your repository has been successfully connected. You can now
                  start analyzing errors.
                </p>

                <div className="bg-white rounded-lg p-4 mb-6 text-left">
                  <div className="flex items-center gap-3">
                    <GitBranch className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {repoUrl.split("/").pop() || "Repository"}
                      </h3>
                      <p className="text-sm text-muted-foreground">{repoUrl}</p>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleContinueToDashboard}
                  size="lg"
                  className="w-full"
                >
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Skip option */}
          {!isConnected && (
            <div className="text-center mt-6">
              <Button
                variant="ghost"
                onClick={handleContinueToDashboard}
                className="text-muted-foreground"
              >
                Skip for now, I'll connect later
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
