/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    compress: true,

    // Image optimization
    images: {
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        minimumCacheTTL: 60, // Cache images for at least 60 seconds
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
    },

    // Enable SWC minification for faster builds and smaller bundles
    swcMinify: true,

    // Disable source maps in production for smaller bundle size
    productionBrowserSourceMaps: false,

    // Optimize imports to reduce bundle size
    modularizeImports: {
        'framer-motion': {
            transform: 'framer-motion/dist/es/{{member}}'
        }
    },

    // Compiler optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn']
        } : false
    },

    // Enable experimental features for better performance
    experimental: {
        // Optimize fonts and package imports
        optimizePackageImports: ['framer-motion', 'date-fns'],
    },

    // Production optimizations
    poweredByHeader: false, // Remove X-Powered-By header
    reactStrictMode: true, // Enable React strict mode for better error detection

    // Enable static optimization where possible
    output: 'standalone', // Optimize for deployment
}

module.exports = nextConfig
