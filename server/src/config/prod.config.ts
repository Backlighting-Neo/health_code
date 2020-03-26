export default {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 5002,
    username: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'health_code',
    synchronize: false,
  }
}