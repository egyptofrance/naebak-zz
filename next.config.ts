import { withContentCollections } from "@content-collections/next";
import createWithBundleAnalyzer from "@next/bundle-analyzer";
// import { withSentryConfig } from "@sentry/nextjs";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { PHASE_DEVELOPMENT_SERVER } from "next/dist/shared/lib/constants";

const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = createWithBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer:
    process.env.ANALYZE === "true" && process.env.OPEN_ANALYZER === "true",
});

export default async function config(
  phase: string,
  defaults: { defaultConfig: NextConfig },
) {
  const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "placehold.co",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          port: "3000",
          pathname: "/**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          port: "54321",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "*.supabase.co",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "*.supabase.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "*.gravatar.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "images.unsplash.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "github.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "oaidalleapiprodscus.blob.core.windows.net",
          port: "",
          pathname: "/**",
        },
      ],
    },

    reactStrictMode: true,
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
    experimental: {
      authInterrupts: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // If you want to use sentry, uncomment the following line
    // nextConfig.sentry = {
    //   hideSourceMaps: false,
    // };
    nextConfig.logging = {
      fetches: {
        fullUrl: true,
      },
    };
  }

  const modifiedConfig = await withContentCollections(
    withBundleAnalyzer(withNextIntl(nextConfig)),
  );

  // If you want to use sentry, uncomment the following line
  // return withSentryConfig(modifiedConfig);
  return modifiedConfig;
}
