const { defineConfig } = require("cypress");
const mysql = require('mysql')

function queryTestDb(query, config) {

  const connection = mysql.createConnection(config.env.db)

  connection.connect()

  return new Promise((resolve, reject) => {

    connection.query(query, (error, result) => {

      if (error) reject(error)
      else {
        connection.end()
        return resolve(result)
      }
    })
  })
}
module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  hideXHR: true,
  "chromeWebSecurity": false ,
  e2e: {
    watchForFileChanges: false,


    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      // implement node event listeners here
    },
  },

  env:{
    db: {

      host: "127.0.0.1",
      port:3306,
      user: "sqluser",
      password: "password",
      database: "school"

    }
  }
});
