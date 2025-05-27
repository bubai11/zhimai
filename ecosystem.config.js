module.exports = {
  apps: [
    {
      name: 'zhihuiguangjin-api',
      script: 'src/app.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'zhihuiguangjin-cron',
      script: 'scripts/cronJobs.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'root',
      host: process.env.SERVER_HOST,
      ref: 'origin/main',
      repo: 'git@github.com:your-username/zhihuiguangjin-server.git',
      path: '/var/www/zhihuiguangjin',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}; 