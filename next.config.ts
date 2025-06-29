import type { NextConfig } from "next";
import { codeInspectorPlugin } from "code-inspector-plugin";
const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(codeInspectorPlugin({ bundler: "webpack" }));
    if (dev && !isServer) {
    }

    console.log("next.config.js/webpack.plugins", config.plugins);
    return config;
  },
};

export default nextConfig;
