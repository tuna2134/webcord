/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: [
                "special-umbrella-4ww7qwrqrp43qjvq.github.dev",
                "localhost:3000",
            ],
        },
    },
};

export default nextConfig;
