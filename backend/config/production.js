module.exports = {
  env: 'production',

  database: {
    /**
     * Connection URL for Mongoose
     * See https://mongoosejs.com/docs/index.html
     */
    connection: 'mongodb://sysadmin:OJCLzl3eSsuirN1g@cluster0-shard-00-00.fbcy3.mongodb.net:27017,cluster0-shard-00-01.fbcy3.mongodb.net:27017,cluster0-shard-00-02.fbcy3.mongodb.net:27017/production?ssl=true&replicaSet=atlas-8u25h0-shard-0&authSource=admin&retryWrites=true&w=majority',
    /**
     * In case you want to use ACID transactions, change this flag to true.
     * See: https://mongoosejs.com/docs/transactions.html
     */
    transactions: true,
  },

  /**
   * Secret used to Sign the JWT (Authentication) tokens.
   */
  authJwtSecret: 'shh this is a secret',

  /**
   * Directory where uploaded files are saved.
   * Default to the storage volume: /storage.
   * See /docker-compose.yml
   */
  uploadDir: '/storage',

  /**
   * Configuration to allow email sending used on:
   * backend/src/services/shared/email/emailSender.js
   *
   * More info: https://nodemailer.com
   */
  email: {
    from: '<insert your email here>',
    host: null,
    auth: {
      user: null,
      pass: null,
    },
  },

  /**
   * Client URL used when sending emails.
   */
  clientUrl: '<insert client url here>',

  
  /**
   * Enables GraphiQL
   * See: https://github.com/graphql/graphiql
   */
  graphiql: false,

};
