/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://MYSERVERURL.supabase.co'],
  },
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true
    }
  },
  /*async rewrites() {
    return [
      {
        source: '/:slug*',
        destination: '/:slug*\\\\\\/:slug',
      },
    ]
  },
  async rewrites() {
    const fs = require('fs');
    const path = require('path');
    const pagesDir = path.join(process.cwd(), 'src/pages');

    const rewrites = fs.readdirSync(pagesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => {
        const pageName = dirent.name;
        const pagePath = `/${pageName}/(.*)`;

        return {
          source: pagePath,
          destination: `/pages/${pageName}/$1`,
        };
      });

    return rewrites;
  },
  */
}

module.exports = nextConfig
