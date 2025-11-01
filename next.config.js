import nextIntl from "next-intl/plugin";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// import withBundleAnalyzer from "@next/bundle-analyzer";

// const bundleAnalyzer = withBundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

const __dirname = dirname(fileURLToPath(import.meta.url));

// Function to resolve the glob pattern to an array of file paths
const resolveSassPaths = () => {
  const sassPaths = [
    path.join(__dirname, "assets"),
    path.join(__dirname, "components/**/*.scss"),
  ];
  return sassPaths;
};

const nextConfig = {
  productionBrowserSourceMaps: true,
  output: "standalone",
  transpilePackages: ["three"],
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  sassOptions: {
    includePaths: resolveSassPaths(),
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    minimumCacheTTL: 300,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  reactCompiler: true,
  cacheComponents: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

const withNextIntl = nextIntl("./src/i18n.ts");
export default withNextIntl(nextConfig);
