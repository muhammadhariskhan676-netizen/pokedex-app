import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The Pokemon API serves images from pokemondb.net's artwork folder.
    // next/image needs to know which remote hosts are allowed so it can
    // optimize and resize images from them.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.pokemondb.net",
        pathname: "/artwork/**",
      },
    ],
  },
  // Tells Turbopack that this folder is the project root. This silences
  // the "detected multiple lockfiles" warning when there is a package-lock.json
  // higher up in the directory tree (e.g. at C:\Users\bk\package-lock.json).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
