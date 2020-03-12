//@ts-check
const TypeORM = require('typeorm')

/** @type {TypeORM.ConnectionOptions} */
const config = {
  cli: {
    entitiesDir: './src/database/entities',
    migrationsDir: './src/database/migrations',
    subscribersDir: './src/database/subscribers',
  },
  entities: ['./dist/database/entities/**/*.js'],
  migrations: ['./dist/database/migrations/**/*.js'],
  subscribers: ['./dist/database/subscribers/**/*.js'],
  type: 'postgres',
  url: process.env.DATABASE_URL,
}

module.exports = config
