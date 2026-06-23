import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Pin the workspace root to this project. Without this, a stray
  // package-lock.json in a parent directory (e.g. the home folder) makes
  // Turbopack infer the wrong root. Must be an absolute path.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
