module.exports = {
  apps: [{
    name: 'reviews',
    script: './server.js',
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-220-141-241.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/targit.pem',
      ref: 'origin/master',
      repo: 'https://github.com/most-amaziin/reviews.git',
      path: '/home/ubuntu/reviews',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
