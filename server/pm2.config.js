module.exports = {
  apps: [{
    name: 'health_code',
    interpreter: './node_modules/.bin/ts-node',
    script: './src/index.ts',
    cwd: './',
    env: {
      APP_ENV: 'prod'
    },
    kill_timeout: 10000,
    wait_ready: true,
    watch: false,
  }]
};
