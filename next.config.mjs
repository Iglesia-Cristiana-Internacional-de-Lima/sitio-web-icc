/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  allowedDevOrigins: ['192.168.56.1'],
  // ponytail: CSP + powered-by removal
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://res.cloudinary.com https://images.unsplash.com data:; font-src 'self'; frame-src https://www.instagram.com https://www.tiktok.com; connect-src 'self'" },
      ],
    },
  ],
};

export default nextConfig;
