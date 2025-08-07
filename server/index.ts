import "dotenv/config";
import express from "express";
import cors from "cors";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check endpoint
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // TODO: Implement real API endpoints
  // app.get("/api/repository/user", handleGetUserRepositories);
  // app.post("/api/repository/connect", handleConnectRepository);
  // app.post("/api/error-analysis/submit", handleErrorAnalysis);
  // app.delete("/api/repository/delete-user-data", handleDeleteUserData);

  // OAuth endpoints for Git providers
  // app.get("/api/auth/oauth/github", handleGitHubOAuth);
  // app.get("/api/auth/oauth/gitlab", handleGitLabOAuth);
  // app.get("/api/auth/oauth/bitbucket", handleBitbucketOAuth);
  // app.get("/api/auth/oauth/azure-devops", handleAzureDevOpsOAuth);

  return app;
}
