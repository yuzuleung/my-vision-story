import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/my-vision-story" : "";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: process.cwd(),
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
