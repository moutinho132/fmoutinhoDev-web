/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    // Config for sql.js WebAssembly
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    config.output.webassemblyModuleFilename = "static/wasm/[module].wasm";
    return config;
  },
};

module.exports = nextConfig;
