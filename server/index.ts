import "dotenv/config";
import express from "express";
import cors from "cors";
import { getRepositories } from "./routes/repositories";
import { analyzeError } from "./routes/analyze-error";

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

  // API endpoints
  app.get("/api/repositories", getRepositories);
  app.post("/api/analyze-error", analyzeError);

  // OAuth endpoints for Git providers
  // app.get("/api/auth/oauth/github", handleGitHubOAuth);
  // app.get("/api/auth/oauth/gitlab", handleGitLabOAuth);
  // app.get("/api/auth/oauth/bitbucket", handleBitbucketOAuth);
  // app.get("/api/auth/oauth/azure-devops", handleAzureDevOpsOAuth);

  return app;
}
