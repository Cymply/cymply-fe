import type { NextConfig } from "next";
import { codeInspectorPlugin } from "code-inspector-plugin";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
  webpack: (config, { dev, isServer }) => {
    config.plugins.push(codeInspectorPlugin({ bundler: "webpack" }));
    if (dev && !isServer) {
    }
    console.log("next.config.js/webpack.plugins", config.plugins);

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: "@svgr/webpack" }],
    });
    return config;
  },
};

export default nextConfig;
