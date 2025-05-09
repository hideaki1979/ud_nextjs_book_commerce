import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "source.unsplash.com",
      "images.microcms-assets.io",
      "lh3.googleusercontent.com",
      "platform-lookaside.fbsbx.com"
    ]
  }
};

export default nextConfig;
