/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['sequelize'],
        serverActions: true,
    },
    images: {
        domains: ['images.unsplash.com']
    }
}

module.exports = nextConfig
