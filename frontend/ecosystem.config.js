module.exports = {
  apps: [
    {
      name: 'lasy_web_nextjs',
      append_env_to_name: true,
      script: 'yarn',
      args: 'start',
      exec_mode: 'cluster',
      instances: 'max',
      autorestart: true,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: '207.148.125.98',
      ref: 'origin/develop',
      repo: 'git@gitlab.com:lasyshop/lasyshop-web-nextjs.git',
      path: '/root/app/lasyweb-nextjs',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    },
    development: {
      user: 'root',
      host: '35.236.159.135',
      ref: 'origin/develop',
      repo: 'git@gitlab.com:lasyshop/lasyshop-web-nextjs.git',
      path: '/root/app/lasyweb-nextjs',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env development'
    }
  }
};
