global.env = process.env.environment || 'development';

module.exports = {
  'development': {
      port: 3000,
      dbUrl: 'mongodb://localhost:27017/test',
      redis: {
          port: 6379,
          host: 'localhost',
          timeout:60*60*24*2      //如果timeout选项不写就默认是2天  60*60*24*2，或者自己定义过期时间
      }
  },
  'test': {
      port: 3000,
      dbUrl: 'mongodb://localhost:27017/test',
      redis: {
          port: 6379,
          host: 'localhost',
          timeout:60*60*24*2      //如果timeout选项不写就默认是2天  60*60*24*2，或者自己定义过期时间
      }
  },
  'production': {
      port: 3000,
      dbUrl: 'mongodb://localhost:27017/test',
      redis: {
          port: 6379,
          host: 'localhost',
          timeout:60*60*24*2      //如果timeout选项不写就默认是2天  60*60*24*2，或者自己定义过期时间
      }
  }
};