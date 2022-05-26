module.exports = {
  apps: [
    {
      name: "lasy-api",
      append_env_to_name: true,
      script: "./dist/server.js",
      exec_mode: "cluster",
      instances : "max",
      autorestart: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 7000,
      },
      env_development: {
        NODE_ENV: "development",
        PORT: 7000,
      },
    },
  ],

  deploy: {
    production: {
      user: "root", // user để ssh
      host: "207.148.125.98", // IP của server này (theo sơ đồ)
      ref: "origin/development", // branch để pull source
      repo: "git@gitlab.com:devzone22/outsource/lasyshop/lasyshop-backend.git", // repo của project
      path: "/root/app/lasy-api", // sẽ deploy vào thư mục này
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production", // cmd để deploy
    },
    development: {
      user: "root",
      host: "35.236.159.135",
      ref: "origin/development",
      repo: "git@gitlab.com:devzone22/outsource/lasyshop/lasyshop-backend.git",
      path: "/root/app/lasy-api",
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env development",
    },
  },
};
//pm2 deploy ecosystem.config.js production 