/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "headless.local",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
