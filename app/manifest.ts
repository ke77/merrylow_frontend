import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
     return {
     name: 'MERRYLOW',
     short_name: 'MERRYLOW',
     description: 'A campus-based food delivery platform',
     start_url: '/',
     display: 'standalone',
     background_color: '#ffffff',
     theme_color: '#000000',
     icons: [
          {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          },
          {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          },
     ],
     }
}